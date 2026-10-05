/**
 * DOM harness for the userscript.
 *
 * Serves the captured jav8.vip fixtures on one origin, injects the real
 * userscript with a GM_* shim, so the browser can exercise decoration,
 * filtering and magnet parsing against genuine site markup.
 *
 * One substitution is applied to the script text, and it is deliberate:
 *
 *   isTargetHost(location.hostname)  ->  isTargetHost("jav8.vip")
 *
 * The harness runs on localhost, so the host guard would otherwise return
 * early. The guard function itself is unit tested in pure.test.mjs (including
 * the "notjav8.vip" and "jav8.vip.evil.com" traps); this only bypasses the
 * lookup of the hostname, not the logic.
 *
 *   node test/harness.mjs [port]
 */
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const fixtures = join(here, "fixtures");
const scriptPath = join(here, "..", "jav8-downloader.user.js");

const ANCHOR = "isTargetHost(location.hostname)";

/**
 * Read the userscript per request rather than caching it, so an edit to the
 * script shows up on reload without restarting the harness. Getting a stale
 * build served is a confusing way to lose an hour.
 */
function loadPatched() {
  const raw = readFileSync(scriptPath, "utf8");
  // Drop the metadata block: it is comments, and it is not what we are testing.
  const body = raw.slice(raw.indexOf("*/") + 2);
  if (!body.includes(ANCHOR)) {
    throw new Error(`could not find ${ANCHOR} - update the substitution`);
  }
  return body.replace(ANCHOR, 'isTargetHost("jav8.vip")');
}

const SHIM = `
<script>
(function () {
  // Minimal GM_* stand-ins. Settings persist per page load via sessionStorage so
  // a reload can be used to check that saving works.
  var mem = {};
  try { mem = JSON.parse(sessionStorage.getItem("gm-store") || "{}"); } catch (e) {}
  window.GM_getValue = function (k, d) { return k in mem ? mem[k] : d; };
  window.GM_setValue = function (k, v) { mem[k] = v; sessionStorage.setItem("gm-store", JSON.stringify(mem)); };
  window.GM_deleteValue = function (k) { delete mem[k]; sessionStorage.setItem("gm-store", JSON.stringify(mem)); };

  // Records every outbound request so tests can assert what was sent without
  // needing aria2 or qBittorrent to actually exist.
  //
  // Note the parameter name: GM_xmlhttpRequest takes the body as \`data\`, not
  // \`body\`. An earlier version of this shim read \`body\`, sent an empty
  // request, and the real aria2 on the developer's machine replied "Parse
  // error" - which looked like a userscript bug but was not one.
  window.__sent = [];
  window.GM_xmlhttpRequest = function (opts) {
    var record = { method: opts.method, url: opts.url, data: opts.data, headers: opts.headers };
    window.__sent.push(record);
    var finish = function (status, text, headers) {
      if (opts.onload) opts.onload({ status: status, responseText: text, responseHeaders: headers || "" });
    };
    fetch(opts.url, { method: opts.method, body: opts.data || undefined, headers: opts.headers || {} })
      .then(function (r) {
        return r.text().then(function (t) {
          // A browser fetch cannot see Set-Cookie - it is a forbidden header
          // name. Real userscript managers can, so the stub also sets an
          // X- header the shim may read. ?nocookie=1 suppresses it to
          // exercise the script's fallback when a manager hides the cookie.
          var hide = location.search.indexOf("nocookie") !== -1;
          var cookie = hide ? "" : r.headers.get("x-stub-set-cookie") || r.headers.get("set-cookie") || "";
          finish(r.status, t, cookie ? "set-cookie: " + cookie + "\\r\\n" : "");
        });
      })
      .catch(function (err) {
        if (opts.onerror) opts.onerror({ status: 0, error: String(err) });
      });
    return { abort: function () {} };
  };

  /**
   * Opt-in strict CSRF mode, standing in for the real client.
   *
   * qBittorrent answers 401 to any request whose Origin or Referer is not the
   * client itself, and a privileged request inherits both from the page it runs
   * on. That is why the script sets them, and this is the check that would
   * notice if it stopped. It is off by default because a browser fetch() strips
   * the forbidden header names on its way out, so enforcing it here would fail
   * every request regardless of what the script did - it reports what the script
   * *asked* for, not what a browser would actually transmit.
   */
  window.__csrfStrict = false;
  window.GM_xmlhttpRequest = (function (inner) {
    return function (opts) {
      if (!window.__csrfStrict) return inner(opts);
      var headers = opts.headers || {};
      var base = new URL(opts.url).origin;
      var origin = headers.Origin || "";
      var referer = headers.Referer || "";
      if (origin && origin !== base) {
        if (opts.onload) opts.onload({ status: 401, responseText: "", responseHeaders: "" });
        return { abort: function () {} };
      }
      if (referer && referer.replace(/\\/$/, "") !== base) {
        if (opts.onload) opts.onload({ status: 401, responseText: "", responseHeaders: "" });
        return { abort: function () {} };
      }
      return inner(opts);
    };
  })(window.GM_xmlhttpRequest);
})();
</script>
`;

function inject(html) {
  // Scripts go at the end of <head> so the userscript's document-idle
  // equivalent runs after the fixture markup exists.
  const tag = `<script src="/__harness__/script.js"></script>`;
  if (html.includes("</head>")) return html.replace("</head>", `${SHIM}${tag}</head>`);
  return SHIM + tag + html;
}

/**
 * Route table.
 *
 * Matched against pathname *and* query, not pathname alone. An earlier version
 * matched only the pathname, so `/actress/58956?page=2` resolved to the same
 * fixture as page 1 and the crawler cheerfully "walked two pages" of identical
 * markup - reporting success while testing nothing. Pagination is the whole
 * reason the query has to be part of the key.
 */
const ROUTES = [
  [/^\/$/, "listing.html"],
  [/^\/updated(\?.*)?$/, "listing.html"],
  [/^\/latest(\?.*)?$/, "listing.html"],
  [/^\/genre\/353(\?.*)?$/, "listing-vr.html"],
  // A two-page career, so autopagination can be walked to its real end. Page 2
  // is the last one and carries no pagination-next, which is the only signal
  // the crawler uses to stop.
  //
  // Order matters: the exact page-2 match must precede the bare actress match,
  // because for these two fixtures the page number *is* the content - page 1
  // has 17 works and a next link, page 2 has 12 and none.
  [/^\/actress\/58956\?page=2$/, "listing-actress-p2.html"],
  [/^\/actress\/58956$/, "listing-actress-p1.html"],
  [/^\/actress\/\d+(\?.*)?$/, "listing-actress.html"],
  [/^\/top-actresses(\?.*)?$/, "top-actresses.html"],
  [/^\/v\/\d+(\?.*)?$/, "detail.html"],
];

/**
 * Stub download clients.
 *
 * Tests must never reach the developer's real aria2 or qBittorrent: a stray
 * request would queue a torrent on their machine. These answer just enough of
 * each protocol for the script to complete its happy path, and record what they
 * were sent so assertions do not depend on GM_xmlhttpRequest plumbing.
 *
 * The script is pointed at them as host=http://127.0.0.1 port=<this port>, so
 * the real endpoint composition (host + port + path) is what gets exercised.
 */
const stubHits = { aria2: [], qbittorrent: [] };

function handleStub(req, res, url) {
  const path = url.pathname;
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    if (path === "/__harness__/stub-hits") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(stubHits));
      return;
    }
    if (path === "/__harness__/stub-reset") {
      stubHits.aria2.length = 0;
      stubHits.qbittorrent.length = 0;
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
      return;
    }

    // The stub speaks 4.x by default. Real 5.x answers 204 with an empty body
    // and names the cookie QBT_SID_<port>, both of which broke the script
    // silently, so ?v5=1 switches it and keeps that path exercised.
    const speakV5 = url.searchParams.get("v5") === "1";

    if (path === "/jsonrpc") {
      stubHits.aria2.push({ path, body });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ jsonrpc: "2.0", id: "stub", result: "2089b66ecca2d829" }));
      return;
    }

    if (path.startsWith("/api/v2/")) {
      stubHits.qbittorrent.push({ path, body, origin: req.headers.origin || null, referer: req.headers.referer || null });
      if (path.endsWith("/auth/login")) {
        // A real manager surfaces Set-Cookie; the shim reads this X- header to
        // simulate that. Loading the page with ?nocookie=1 hides it, which is
        // how the "manager hides Set-Cookie" fallback gets exercised.
        const cookie = speakV5
          ? "QBT_SID_8980=stub-v5-session; path=/; HttpOnly"
          : "SID=stub-session-id; path=/; HttpOnly";
        // 5.x answers 204 with no body. Both are accepted by the script; a 4.x
        // "Fails." body is how a rejected password is signalled.
        const failed = /password=wrong|badpass|wrongpass/i.test(body);
        if (failed) {
          // A real 4.x answers 200 "Fails."; 5.x answers 401. Both are accepted
          // as "credentials rejected", so the stub mimics each per ?v5.
          res.writeHead(speakV5 ? 401 : 200, { "Content-Type": "text/plain" });
          res.end(speakV5 ? "Unauthorized" : "Fails.");
          return;
        }
        res.writeHead(speakV5 ? 204 : 200, {
          "Content-Type": "text/plain",
          "Set-Cookie": cookie,
          "X-Stub-Set-Cookie": cookie,
        });
        res.end(speakV5 ? "" : "Ok.");
        return;
      }
      if (path.endsWith("/app/version")) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("v4.6.0");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Ok.");
      return;
    }

    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("no stub for " + path);
  });
}

const port = Number(process.argv[2] || 8977);

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  const path = url.pathname;

  if (path === "/__harness__/script.js") {
    let text;
    try {
      text = loadPatched();
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(String(err));
      return;
    }
    // no-store, deliberately. loadPatched() re-reads the file per request so an
    // edit shows up on reload without restarting the harness - but a cached
    // response quietly defeats that, and the symptom is the worst kind: the page
    // under test runs yesterday's logic while every assertion still passes. That
    // is how a size-preference fix appeared to "not work" here when it did.
    res.writeHead(200, {
      "Content-Type": "text/javascript; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    });
    res.end(text);
    return;
  }
  if (path === "/__harness__/reset") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  if (path.startsWith("/__harness__/stub-") || path === "/jsonrpc" || path.startsWith("/api/v2/")) {
    handleStub(req, res, url);
    return;
  }

  // A screenshot route, so the README image can be regenerated rather than
  // rotting. It puts the script into a realistic mid-batch state, then blurs the
  // site behind the panel: the panel is the thing being documented, and blurring
  // is what keeps a captured third-party page out of a public repository.
  //
  // Headless Chrome can screenshot this page - it serves the script as a plain
  // <script src>, so an ordinary page load runs it - but it cannot seed storage
  // first, which is why the seeding lives here and not in the capture command.
  // A listing carrying adverts, in the site's real shape.
  //
  // This route exists because the previous one was wrong in the way that mattered.
  // It injected cards with a relative /v/ href and a .work-title containing promo
  // wording - the shape the rule was written against - so the test passed while
  // the feature did nothing on the real site. Fixtures cannot catch this:
  // tools/fetch_fixtures.py strips the adworker script on purpose, so no captured
  // page has ever contained an advert.
  //
  // Transcribed from the live page's own adworker().prmt() template:
  //   <a class="work" href="http://tdsd95.com/" target="_blank">
  //     <img class="work-cover" src="https://img.j-cdn.com/apps/img/k/N.jpg">
  //     <div class="work-intro">
  //       <p class="work-id highlight">91Porn</p>
  //       <div class="work-meta">promo copy</div>
  //     </div>
  //   </a>
  // Note what is absent: a relative href, and any .work-title element at all.
  //
  // It runs before the userscript so these are decorated through the same path as
  // every other card. Injecting them afterwards would only prove that an
  // undecorated card is hidden.
  if (path === "/__harness__/ads") {
    const html = readFileSync(join(fixtures, "listing.html"), "utf8");
    const tag = `<script src="/__harness__/script.js"></script>`;
    const ads = `<script>
document.addEventListener("DOMContentLoaded", function () {
  var promos = [
    ["91Porn", "http://tdsd95.com/", "promo copy one"],
    ["AI-se", "http://tdsd96.com/", "promo copy two"],
  ];
  var works = document.querySelector(".works");
  if (!works) return;
  var real = works.querySelector('a[href^="/v/"]');
  if (!real) return;
  promos.forEach(function (p, i) {
    var card = document.createElement("a");
    card.className = "work";
    card.href = p[1];
    card.target = "_blank";
    // Built as a string rather than with createElement for the inner parts, so
    // this stays a transcription of the site's template rather than a tidy
    // reimplementation that could drift from it.
    card.innerHTML =
      '<img class="work-cover" src="https://img.j-cdn.com/apps/img/k/' + (i + 1) + '.jpg">' +
      '<div class="work-intro">' +
      '<p class="work-id highlight">' + p[0] + "</p>" +
      '<div class="work-meta">' + p[2] + "</div>" +
      "</div>";
    // Inserted among the real works, as the site does, so it is not merely
    // appended and therefore not distinguishable by position.
    real.after(card);
  });
});
</script>`;
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    });
    res.end(inject(html).replace(tag, ads + tag));
    return;
  }

  if (path === "/__harness__/shot") {
    const html = readFileSync(join(fixtures, "listing.html"), "utf8");
    const tag = `<script src="/__harness__/script.js"></script>`;
    // Runs *before* the userscript, because a classic script tag executes in
    // document order. It has to: headless capture cannot seed storage first, and
    // a pause flag left over from an earlier run silently changes what the
    // picture shows - which is how the first attempt at this came to depict a
    // finished batch claiming "Selection is clear".
    const seed = `<script>
localStorage.clear();
sessionStorage.clear();
sessionStorage.setItem("gm-store", JSON.stringify({
  "jav8-downloader-settings": {
    active: "aria2",
    filter: "all",
    preferredSize: 5368709120,
    downloaders: { aria2: { host: "http://127.0.0.1", port: ${port} } },
  },
}));
</script>`;
    // Runs after it, once the panel exists.
    const pose = `<script>
window.confirm = function () { return true; };
setTimeout(function () {
  var boxes = document.querySelectorAll(".jd-box input");
  for (var i = 0; i < 12 && i < boxes.length; i++) boxes[i].click();
  document.querySelector(".jd-foot .jd-btn").click();
  // Pause partway through, so the capture shows a batch in progress rather than
  // a finished one. Headless capture fast-forwards timers, so this is the only
  // reliable way to stop mid-batch: with a plain time budget the whole batch
  // runs instantly and the panel reads "Selection is clear".
  setTimeout(function () {
    document.querySelector(".jd-pause").click();
  }, 1500);
  setTimeout(function () {
    // An overlay, not "blur everything except the panel": a filter on an
    // ancestor cannot be undone by a descendant, so the panel has to sit *above*
    // the blur rather than be excluded from it - which it does by z-index.
    var s = document.createElement("style");
    s.textContent =
      "#shot-blur{position:fixed;inset:0;z-index:2147482999;" +
      "backdrop-filter:blur(10px) saturate(.6);-webkit-backdrop-filter:blur(10px) saturate(.6);" +
      "background:rgba(6,8,14,.74);pointer-events:none}" +
      // The page is shorter than the capture window, which would otherwise leave
      // the html background showing as a white band below the overlay.
      "html{background:#06080e}body{min-height:100vh}";
    document.head.appendChild(s);
    var o = document.createElement("div");
    o.id = "shot-blur";
    document.body.appendChild(o);
  }, 2600);
}, 400);
</script>`;
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    });
    res.end(inject(html).replace(tag, seed + tag + pose));
    return;
  }

  const route = ROUTES.find(([re]) => re.test(path + (url.search || "")));
  if (!route) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("no fixture for " + path + (url.search || ""));
    return;
  }
  try {
    const html = readFileSync(join(fixtures, route[1]), "utf8");
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    });
    res.end(inject(html));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(String(err));
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`harness on http://127.0.0.1:${port}`);
  console.log(`  listing      http://127.0.0.1:${port}/updated`);
  console.log(`  VR listing   http://127.0.0.1:${port}/genre/353`);
  console.log(`  actress     http://127.0.0.1:${port}/actress/18787`);
  console.log(`  actress 2p  http://127.0.0.1:${port}/actress/58956`);
  console.log(`  performers  http://127.0.0.1:${port}/top-actresses`);
  console.log(`  detail       http://127.0.0.1:${port}/v/557564`);
});
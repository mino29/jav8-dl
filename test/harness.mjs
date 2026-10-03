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

const ROUTES = [
  [/^\/$/, "listing.html"],
  [/^\/updated$/, "listing.html"],
  [/^\/latest$/, "listing.html"],
  [/^\/genre\/353$/, "listing-vr.html"],
  [/^\/v\/\d+/, "detail.html"],
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

    if (path === "/jsonrpc") {
      stubHits.aria2.push({ path, body });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ jsonrpc: "2.0", id: "stub", result: "2089b66ecca2d829" }));
      return;
    }

    if (path.startsWith("/api/v2/")) {
      stubHits.qbittorrent.push({ path, body });
      if (path.endsWith("/auth/login")) {
        // A real manager surfaces Set-Cookie; the shim reads this X- header to
        // simulate that. Loading the page with ?nocookie=1 hides it, which is
        // how the "manager hides Set-Cookie" fallback gets exercised.
        res.writeHead(200, {
          "Content-Type": "text/plain",
          "Set-Cookie": "SID=stub-session-id; path=/; HttpOnly",
          "X-Stub-Set-Cookie": "SID=stub-session-id; path=/; HttpOnly",
        });
        res.end("Ok.");
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
    res.writeHead(200, { "Content-Type": "text/javascript; charset=utf-8" });
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

  const route = ROUTES.find(([re]) => re.test(path));
  if (!route) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("no fixture for " + path);
    return;
  }
  try {
    const html = readFileSync(join(fixtures, route[1]), "utf8");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
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
  console.log(`  detail       http://127.0.0.1:${port}/v/557564`);
});
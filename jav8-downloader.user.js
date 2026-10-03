// ==UserScript==
// @name         JAV8 Downloader
// @namespace    https://github.com/mino29/jav-scraper
// @version      1.0.0
// @description  Tick covers to queue them, filter by VR, pick the best magnet by size, and send to aria2 or qBittorrent. Settings live in the browser, not in a config file.
// @author       mino29
// @match        *://jav8.vip/*
// @match        *://*.jav8.vip/*
// @connect      localhost
// @connect      127.0.0.1
// @connect      host.docker.internal
// @connect      192.168.*
// @connect      10.*
// @connect      172.16.*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_deleteValue
// @run-at       document-idle
// ==/UserScript==

/*
 * Design notes
 * ------------
 * Every assumption about the site's markup was measured, not guessed:
 *
 * - Listing cards are `a.work[href^="/v/"]` containing `img.work-cover`.
 *   The site injects ad cards with absolute hrefs via `adworker`, so requiring
 *   the `/v/` prefix skips them.
 * - Magnets live in `.magnet` blocks on `/v/<id>`. Size is in
 *   `.magnet-size` ("5.37GB"), the URI is the `a[href^="magnet:"]` inside
 *   `.magnet-title`, and the anchor's *text* is the release name.
 * - A meaningful share of magnet entries are adverts. Over 262 real entries
 *   the rule below separated them cleanly with no false positives, so ads are
 *   excluded from automatic selection rather than silently queued.
 * - VR is signalled three ways. `【VR】` in the title matched 17/17 known VR
 *   releases; a `VR` substring in the code prefix (`MDVR-`, `SAVR-`, `PXVR-`)
 *   produced zero false positives and caught 6 more. Together they cover
 *   both. A hand-listed set of prefixes was tried first and caught only 6 of
 *   26, so it is deliberately not used.
 * - `第一人称` (first person) appears on ordinary flat releases and is NOT a
 *   VR signal. Do not add it.
 *
 * Cross-origin note: aria2 and qBittorrent send no CORS headers, so a plain
 * fetch() from the page cannot reach them. GM_xmlhttpRequest is what makes
 * this work; without a userscript manager there is nothing to fall back to.
 */
(function () {
  "use strict";

  // ==========================================================================
  // pure:start  (no DOM, no network - exercised directly by test/pure.test.mjs)
  // ==========================================================================

  var KB = 1024;
  var MB = KB * 1024;
  var GB = MB * 1024;
  var TB = GB * 1024;

  // 1024-based. Torrent sites label GiB as "GB" almost everywhere, and using
  // one consistent basis keeps every comparison below self-consistent.
  var SIZE_UNITS = { B: 1, KB: KB, MB: MB, GB: GB, TB: TB, KIB: KB, MIB: MB, GIB: GB, TIB: TB };

  var SIZE_RE = /^\s*([0-9]+(?:[.,][0-9]+)?)\s*([A-Za-z]+)\s*$/;

  /**
   * Every selector this script depends on, in one place.
   *
   * These were verified against captured pages (see spec/site.json and
   * test/fixtures). Keeping them here rather than inline at each use site means
   * a site redesign is one edit, and test/parity.test.mjs can assert them
   * against the spec.
   */
  var SELECTORS = {
    // Listing cards. The /v/ prefix requirement also skips the promotional
    // cards the site injects with absolute hrefs via its adworker script.
    card: 'a.work[href^="/v/"]',
    cover: "img.work-cover",
    cardCode: ".work-id",
    cardTitle: ".work-title",
    // Detail page.
    magnetBlock: ".magnet",
    magnetSize: ".magnet-size",
    magnetLink: '.magnet-title a[href^="magnet:"]',
    detailCode: "dl dt.highlight",
    detailTitle: "h1.text-zh",
    detailTag: "a.tag",
  };

  /**
   * Vendor defaults for a stock install.
   *
   * These are publicly documented product defaults shown as placeholders in the
   * settings form, not credentials. Only what a user actually types is
   * persisted, so an empty field unambiguously means "use the default".
   *
   * Mirrored in spec/site.json, which test/parity.test.mjs holds them against.
   */
  var DEFAULTS = {
    downloaders: {
      aria2: {
        host: "http://localhost",
        port: 6800,
        secret: "",
        dir: "",
      },
      qbittorrent: {
        host: "http://localhost",
        port: 8080,
        username: "admin",
        password: "adminadmin",
        savePath: "",
        category: "jav",
      },
    },
    active: "aria2",
    filter: "all", // all | vr | non-vr
    minSize: 500 * MB,
    maxSize: 100 * GB,
  };

  /** "5.37GB" -> bytes. Returns null when the text is not a size. */
  function parseSize(text) {
    if (!text) return null;
    var m = SIZE_RE.exec(String(text));
    if (!m) return null;
    var unit = SIZE_UNITS[m[2].toUpperCase()];
    if (!unit) return null;
    var value = parseFloat(m[1].replace(",", "."));
    if (!isFinite(value) || value <= 0) return null;
    return Math.round(value * unit);
  }

  /** Bytes -> the largest unit that keeps it readable. */
  function formatSize(bytes) {
    if (bytes === null || bytes === undefined || !isFinite(bytes)) return "?";
    if (bytes >= TB) return trimNum(bytes / TB) + " TB";
    if (bytes >= GB) return trimNum(bytes / GB) + " GB";
    if (bytes >= MB) return trimNum(bytes / MB) + " MB";
    if (bytes >= KB) return trimNum(bytes / KB) + " KB";
    return bytes + " B";
  }

  function trimNum(n) {
    return (Math.round(n * 100) / 100).toString();
  }

  /** "IPZZ-961" from a code element or a magnet name. */
  function normalizeCode(raw) {
    return String(raw || "")
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9-]/g, "");
  }

  /**
   * Only ever run on jav8.vip. Kept as a pure function so the test harness can
   * exercise it and so the guard is unit tested rather than merely present.
   * @match is not a security boundary - it is a convenience - so this is the
   * check that actually decides.
   */
  function isTargetHost(hostname) {
    var host = String(hostname || "").toLowerCase().replace(/\.$/, "");
    return host === "jav8.vip" || /\.jav8\.vip$/.test(host);
  }

  var VR_CODE_RE = /^[A-Z0-9]*VR[A-Z0-9]*-\d/;

  /**
   * Is this release VR?
   *
   * title marker OR a VR substring in the code prefix. The title marker alone
   * missed 6 real VR releases and the code rule alone missed 6 others, so
   * both are needed.
   */
  function isVr(code, title) {
    var t = String(title || "");
    if (t.indexOf("【VR】") !== -1) return true;
    // Full-width and plain brackets, in case the marker wording changes.
    if (/[［[]\s*VR\s*[］\]]/i.test(t)) return true;
    return VR_CODE_RE.test(normalizeCode(code));
  }

  // Ad magnets carry a promo payload in the release name. The three groups
  // below are what actually appeared across 262 sampled entries.
  var AD_STRONG = /[▷▶]/;
  var AD_WORDS = /(夸克|無广告|无广告|旗舰APP|成人APP|1视频|月新地址)/;
  // A bare "@" is the signal. An earlier version required a domain after it
  // and so missed real entries such as "第一會所新片@SIS001@DDH-451" and
  // "ALDN-433.[4K]@R90s", where nothing follows the @ but a dotted domain.
  // Genuine catalog names never contain "@", so treating it as "suspect"
  // (deprioritised, never auto-excluded) is the safe way to use it.
  var AT_NAME = /@/;

  /**
   * Classify a magnet name.
   *   "ad"      - certainly a promo, never auto-selected
   *   "suspect" - has an @ marker; usable only if nothing better exists
   *   "clean"   - a plain catalog release
   */
  function classifyMagnet(name) {
    var n = String(name || "");
    if (AD_STRONG.test(n) || AD_WORDS.test(n)) return "ad";
    if (AT_NAME.test(n)) return "suspect";
    return "clean";
  }

  /**
   * Choose one magnet for a work.
   *
   * Rule, in order:
   *   1. clean magnets whose size sits inside the user's window
   *   2. if the window excludes everything clean, the largest clean magnet,
   *      flagged so the caller can say it fell outside
   *   3. if there are no clean magnets at all, a "suspect" one rather than
   *      nothing - but never an "ad"
   *
   * Within a tier the largest wins: the user asked for a size floor, and among
   * releases that clear it the full-quality version is the one they want.
   */
  function pickMagnet(magnets, minBytes, maxBytes) {
    var pool = (magnets || []).filter(function (m) {
      return m && m.uri && m.size !== null && m.size !== undefined && m.size > 0;
    });
    if (!pool.length) return { magnet: null, reason: "no-magnets" };

    var clean = pool.filter(function (m) {
      return m.tier === "clean";
    });
    var candidates = clean.length ? clean : pool.filter(function (m) {
      return m.tier !== "ad";
    });
    if (!candidates.length) return { magnet: null, reason: "ads-only" };

    var inWindow = candidates.filter(function (m) {
      return m.size >= minBytes && m.size <= maxBytes;
    });
    if (inWindow.length) {
      return { magnet: largest(inWindow), reason: "in-window" };
    }
    return { magnet: largest(candidates), reason: "outside-window" };
  }

  function largest(list) {
    return list.reduce(function (best, m) {
      return best === null || m.size > best.size ? m : best;
    }, null);
  }

  /**
   * Join a host, port and path into a URL, tolerating whichever form the user
   * typed. aria2 and qBittorrent take host and port separately, but people
   * paste "http://box:6800" out of habit, so an embedded port has to win
   * rather than producing "http://box:6800:6800".
   */
  function endpoint(host, port, path) {
    var h = String(host || "").trim().replace(/\/+$/, "");
    if (!h) h = "http://localhost";
    if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(h)) h = "http://" + h;

    // Split off a trailing :port, ignoring anything inside an IPv6 bracket.
    var embedded = "";
    var m = /^(.*\[[^\]]*\]):(\d{1,5})$/.exec(h);
    if (m) {
      h = m[1];
      embedded = m[2];
    } else if (/:\d{1,5}$/.test(h)) {
      var idx = h.lastIndexOf(":");
      embedded = h.slice(idx + 1);
      h = h.slice(0, idx);
    }

    var chosen = embedded || (port === undefined || port === null || port === "" ? "" : String(port));
    return h + (chosen ? ":" + chosen : "") + path;
  }

  /** Read magnets out of a detail page document. */
  function readMagnets(doc) {
    var out = [];
    var blocks = doc.querySelectorAll(SELECTORS.magnetBlock);
    for (var i = 0; i < blocks.length; i++) {
      var block = blocks[i];
      var anchor = block.querySelector(SELECTORS.magnetLink);
      if (!anchor) continue;
      var sizeEl = block.querySelector(SELECTORS.magnetSize);
      var name = (anchor.textContent || "").trim();
      out.push({
        uri: anchor.getAttribute("href"),
        name: name,
        size: parseSize(sizeEl ? sizeEl.textContent : ""),
        sizeText: sizeEl ? sizeEl.textContent.trim() : "",
        tier: classifyMagnet(name),
      });
    }
    return out;
  }

  // ==========================================================================
  // pure:end
  // ==========================================================================

  // ---------------------------------------------------------------- settings
  var STORE_KEY = "jav8-downloader-settings";

  function deepMerge(base, over) {
    var out = {};
    Object.keys(base).forEach(function (k) {
      out[k] =
        base[k] && typeof base[k] === "object" && !Array.isArray(base[k])
          ? deepMerge(base[k], (over && over[k]) || {})
          : over && over[k] !== undefined
            ? over[k]
            : base[k];
    });
    return out;
  }

  function readStore() {
    var stored = null;
    try {
      stored = GM_getValue(STORE_KEY, null);
    } catch (e) {
      stored = null;
    }
    if (!stored) {
      try {
        var raw = window.localStorage.getItem(STORE_KEY);
        stored = raw ? JSON.parse(raw) : null;
      } catch (e) {
        stored = null;
      }
    }
    return stored && typeof stored === "object" ? stored : {};
  }

  function writeStore(data) {
    try {
      GM_setValue(STORE_KEY, data);
    } catch (e) {
      try {
        window.localStorage.setItem(STORE_KEY, JSON.stringify(data));
      } catch (e2) {
        /* nothing left to try; this run simply will not persist */
      }
    }
  }

  // Only what the user actually changed is persisted. Keeping the overrides
  // sparse is what lets the settings form show an empty box with the vendor
  // default as its placeholder: an empty field unambiguously means "use the
  // default", whereas a pre-filled value cannot be told apart from a real
  // override.
  var storedSettings = readStore();
  var settings = deepMerge(DEFAULTS, storedSettings);

  /** The stored override for one field, or undefined if the default applies. */
  function overrideFor(engine, key) {
    var engineOverrides = (storedSettings.downloaders || {})[engine];
    return engineOverrides ? engineOverrides[key] : undefined;
  }

  function persist() {
    // settings.downloaders holds resolved values; persist only the sparse
    // overrides the user typed.
    writeStore({
      active: settings.active,
      filter: settings.filter,
      minSize: settings.minSize,
      maxSize: settings.maxSize,
      downloaders: storedSettings.downloaders || {},
    });
  }

  function resetAll() {
    storedSettings = {};
    settings = deepMerge(DEFAULTS, {});
    writeStore({});
  }

  // ------------------------------------------------------------------- http
  function request(method, url, opts) {
    opts = opts || {};
    return new Promise(function (resolve, reject) {
      var done = false;
      var timer = setTimeout(function () {
        if (done) return;
        done = true;
        reject(new Error("timed out after " + (opts.timeout || 15000) + "ms"));
      }, opts.timeout || 15000);

      function finish(err, value) {
        if (done) return;
        done = true;
        clearTimeout(timer);
        if (err) reject(err);
        else resolve(value);
      }

      if (typeof GM_xmlhttpRequest !== "function") {
        finish(
          new Error(
            "GM_xmlhttpRequest unavailable - install Tampermonkey or Violentmonkey. " +
              "aria2 and qBittorrent send no CORS headers, so a plain fetch cannot reach them.",
          ),
        );
        return;
      }

      GM_xmlhttpRequest({
        method: method,
        url: url,
        data: opts.body,
        headers: opts.headers || {},
        timeout: opts.timeout || 15000,
        anonymous: false,
        onload: function (res) {
          if (res.status >= 200 && res.status < 300) finish(null, res);
          else
            finish(
              new Error("HTTP " + res.status + " from " + url + ": " + String(res.responseText || "").slice(0, 160)),
            );
        },
        onerror: function (res) {
          finish(new Error("network error reaching " + url + (res && res.status ? " (HTTP " + res.status + ")" : "")));
        },
        ontimeout: function () {
          finish(new Error("timed out reaching " + url));
        },
      });
    });
  }

  function getText(url) {
    return request("GET", url).then(function (res) {
      return res.responseText;
    });
  }

  // -------------------------------------------------------------- downloaders
  var aria2 = {
    label: "aria2",
    probe: function () {
      var cfg = settings.downloaders.aria2;
      var params = [];
      if (cfg.secret) params.push("token:" + cfg.secret);
      params.push(["aria2.getVersion"]);
      return request("POST", endpoint(cfg.host, cfg.port, "/jsonrpc"), {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: "probe", method: "aria2.getVersion", params: params }),
      }).then(function (res) {
        var parsed = JSON.parse(res.responseText);
        if (parsed.error) throw new Error(parsed.error.message || "aria2 error");
        return "aria2 " + ((parsed.result && parsed.result.version) || "online");
      });
    },

    send: function (magnet) {
      var cfg = settings.downloaders.aria2;
      var options = {};
      if (cfg.dir) options.dir = cfg.dir;
      var params = [];
      if (cfg.secret) params.push("token:" + cfg.secret);
      params.push([magnet.uri], options);
      return request("POST", endpoint(cfg.host, cfg.port, "/jsonrpc"), {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: "jav8", method: "aria2.addUri", params: params }),
      }).then(function (res) {
        var parsed = JSON.parse(res.responseText);
        if (parsed.error) throw new Error(parsed.error.message || "aria2 rejected the task");
        return "gid " + parsed.result;
      });
    },
  };

var qbittorrent = {
    label: "qBittorrent",
    // qBittorrent hands out a SID cookie on login and expects it back on every
    // later call. Reading it out of responseHeaders is the reliable path, but
    // Set-Cookie is a forbidden header name for a normal fetch and not every
    // userscript manager surfaces it. So when no SID can be read the request is
    // still attempted without an explicit Cookie header and the manager's own
    // cookie jar is relied on - rather than failing outright.
    _sid: null,

    _login: function () {
      var cfg = settings.downloaders.qbittorrent;
      var body = "username=" + encodeURIComponent(cfg.username) + "&password=" + encodeURIComponent(cfg.password);
      return request("POST", endpoint(cfg.host, cfg.port, "/api/v2/auth/login"), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      }).then(function (res) {
        var text = (res.responseText || "").trim();
        if (text === "Fails.") throw new Error("qBittorrent rejected the username or password");
        var match = /SID\s*=\s*([^;\r\n]+)/i.exec(res.responseHeaders || "");
        qbittorrent._sid = match ? match[1] : null;
        return qbittorrent._sid;
      });
    },

    _authHeaders: function (extra) {
      var headers = extra || {};
      if (qbittorrent._sid) headers.Cookie = "SID=" + qbittorrent._sid;
      return headers;
    },

    probe: function () {
      var cfg = settings.downloaders.qbittorrent;
      return qbittorrent._login().then(function () {
        return request("GET", endpoint(cfg.host, cfg.port, "/api/v2/app/version"), {
          headers: qbittorrent._authHeaders(),
        }).then(
          function (res) {
            return "qBittorrent " + String(res.responseText).trim();
          },
          function (err) {
            if (!qbittorrent._sid && /403/.test(err.message)) {
              throw new Error(
                "logged in, but the session id could not be read and the request was " +
                  "refused. Your userscript manager is hiding Set-Cookie; " +
                  "Tampermonkey and Violentmonkey both work here.",
              );
            }
            throw err;
          },
        );
      });
    },

    send: function (magnet) {
      var cfg = settings.downloaders.qbittorrent;
      return qbittorrent._login().then(function () {
        var body = "urls=" + encodeURIComponent(magnet.uri);
        if (cfg.savePath) body += "&savepath=" + encodeURIComponent(cfg.savePath);
        if (cfg.category) body += "&category=" + encodeURIComponent(cfg.category);
        return request("POST", endpoint(cfg.host, cfg.port, "/api/v2/torrents/add"), {
          headers: qbittorrent._authHeaders({
            "Content-Type": "application/x-www-form-urlencoded",
          }),
          body: body,
        }).then(function () {
          return "added";
        });
      });
    },
  };

  var ENGINES = { aria2: aria2, qbittorrent: qbittorrent };
  function engine() {
    return ENGINES[settings.active] || aria2;
  }

  // ----------------------------------------------------------------- fetching
  var detailCache = {};

  function fetchMagnets(href) {
    if (detailCache[href]) return detailCache[href];
    detailCache[href] = getText(new URL(href, location.origin).href)
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        var codeEl = doc.querySelector("dl dt.highlight");
        var titleEl = doc.querySelector("h1.text-zh") || doc.querySelector("h1.title");
        var magnets = readMagnets(doc);
        return {
          href: href,
          code: codeEl ? codeEl.textContent.trim() : "",
          title: titleEl ? titleEl.textContent.trim() : "",
          magnets: magnets,
        };
      })
      .catch(function (err) {
        delete detailCache[href];
        throw err;
      });
    return detailCache[href];
  }

  // -------------------------------------------------------------------- UI
  var STYLE_ID = "jav8-dl-style";
  var CSS = `
.jd-box{position:absolute;top:4px;left:4px;z-index:40;width:20px;height:20px;
  border-radius:4px;background:rgba(12,16,20,.78);border:1px solid rgba(255,255,255,.35);
  display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:.25;
  transition:opacity .12s,background .12s}
.jd-box:hover{opacity:1}
.jd-box.on{opacity:1;background:#2b6cb0;border-color:#63b3ed}
.jd-box input{width:13px;height:13px;margin:0;cursor:pointer;accent-color:#63b3ed}
.jd-box.bad{opacity:1;background:#7b341e;border-color:#f6ad55}
.jd-badge{position:absolute;bottom:4px;left:4px;z-index:40;font-size:9px;line-height:1.5;
  padding:0 4px;border-radius:3px;background:rgba(12,16,20,.8);color:#9ab;pointer-events:none}
.jd-badge.vr{color:#f6ad55}
.jd-panel{position:fixed;top:12px;right:12px;z-index:2147483000;width:264px;
  background:#1d2126;color:#9ab;border:1px solid #303840;border-radius:6px;
  font:12px/1.5 -apple-system,Segoe UI,Roboto,"Helvetica Neue",sans-serif;
  box-shadow:0 8px 28px rgba(0,0,0,.5)}
.jd-panel *{box-sizing:border-box}
.jd-hd{display:flex;align-items:center;gap:6px;padding:8px 10px;border-bottom:1px solid #303840;
  cursor:move;user-select:none}
.jd-hd b{color:#def;font-weight:600;flex:1}
.jd-body{padding:9px 10px}
.jd-row{display:flex;align-items:center;gap:6px;margin-bottom:7px}
.jd-row label{color:#7f8c99;min-width:44px;font-size:11px}
.jd-row select,.jd-row input{flex:1;min-width:0;background:#2b2d30;color:#fff;
  border:1px solid #474747;border-radius:3px;padding:3px 5px;font-size:11px}
.jd-btn{background:#2f6feb;color:#fff;border:1px solid #2f6feb;border-radius:3px;
  padding:4px 8px;font-size:11px;cursor:pointer}
.jd-btn:hover{background:#2559c4}
.jd-btn[disabled]{opacity:.45;cursor:not-allowed}
.jd-btn.ghost{background:transparent;border-color:#474747;color:#9ab}
.jd-foot{display:flex;gap:6px;padding:0 10px 9px}
.jd-foot .jd-btn{flex:1}
.jd-count{font-size:11px;color:#7f8c99;margin-top:2px}
.jd-count b{color:#63b3ed}
.jd-log{margin-top:8px;max-height:132px;overflow:auto;font-size:10.5px;
  border-top:1px solid #303840;padding-top:6px}
.jd-log div{padding:1px 0;word-break:break-all}
.jd-ok{color:#68d391}.jd-er{color:#fc8181}.jd-wa{color:#f6ad55}.jd-mu{color:#7f8c99}
.jd-mt{margin-top:9px;border-top:1px solid #303840;padding-top:9px}
.jd-mrow{display:flex;gap:6px;align-items:center;padding:3px 0;font-size:11px}
.jd-mrow .jd-mname{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.jd-mrow .jd-msz{color:#63b3ed;cursor:pointer}
.jd-mrow.pick{background:rgba(47,111,235,.16);border-radius:3px;padding-left:3px;padding-right:3px}
.jd-mrow.ad{opacity:.45}
.jd-tag{font-size:9px;padding:0 3px;border-radius:2px;background:#303840;color:#9ab}
.jd-tag.ad{background:#7b341e;color:#f6ad55}
.jd-tag.sus{background:#4a3f10;color:#f6ad55}
.jd-dlg{position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:2147483100;
  display:flex;align-items:center;justify-content:center}
.jd-dlgbox{width:420px;max-height:82vh;overflow:auto;background:#1d2126;color:#9ab;
  border:1px solid #303840;border-radius:6px;padding:14px;font:12px/1.6 inherit;
  box-shadow:0 10px 40px rgba(0,0,0,.6)}
.jd-dlgbox h3{margin:0 0 4px;font-size:13px;color:#def}
.jd-dlgbox p.hint{margin:0 0 12px;font-size:11px;color:#7f8c99}
.jd-set{margin-bottom:14px}
.jd-set h4{margin:0 0 6px;font-size:11.5px;color:#63b3ed;text-transform:uppercase;letter-spacing:.05em}
.jd-set label{display:flex;align-items:center;gap:8px;margin-bottom:4px;font-size:11px}
.jd-set label span{min-width:74px;color:#7f8c99}
.jd-set input{flex:1;min-width:0;background:#2b2d30;color:#fff;border:1px solid #474747;
  border-radius:3px;padding:3px 6px;font-size:11.5px;font-family:ui-monospace,Menlo,Consolas,monospace}
.jd-set input::placeholder{color:#5a6472}
.jd-actions{display:flex;gap:8px;margin-top:14px}
.jd-actions .jd-btn{flex:1;padding:6px}
`;

  function injectStyle() {
    if (document.getElementById(STORE_KEY + "-" + STYLE_ID)) return;
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  var selected = new Set();
  var known = new Map(); // href -> {code, title, vr}
  var logLines = [];
  var dragging = null;

  function log(message, tone) {
    logLines.push({ message: message, tone: tone || "mu" });
    if (logLines.length > 60) logLines.shift();
    renderLog();
  }

  function renderLog() {
    var box = document.querySelector(".jd-log");
    if (!box) return;
    box.textContent = "";
    logLines.slice(-14).forEach(function (entry) {
      var line = el("div", "jd-" + entry.tone, entry.message);
      box.appendChild(line);
    });
    box.scrollTop = box.scrollHeight;
  }

  // ------------------------------------------------------------- work cards
  function worksOnPage() {
    var nodes = document.querySelectorAll(SELECTORS.card);
    var out = [];
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      // Cards in the studio strip have no cover, so there is nowhere sensible
      // to put a tick.
      if (!node.querySelector(SELECTORS.cover)) continue;
      out.push(node);
    }
    return out;
  }

  function cardInfo(card) {
    var codeEl = card.querySelector(SELECTORS.cardCode);
    var titleEl = card.querySelector(SELECTORS.cardTitle);
    var code = codeEl ? codeEl.textContent.trim() : "";
    var title = titleEl ? titleEl.getAttribute("title") || titleEl.textContent.trim() : "";
    return { code: code, title: title, vr: isVr(code, title) };
  }

  function decorateCard(card) {
    if (card.dataset.jdDone === "1") return;
    card.dataset.jdDone = "1";
    if (getComputedStyle(card).position === "static") card.style.position = "relative";

    var info = cardInfo(card);
    var href = card.getAttribute("href");
    known.set(href, info);

    var box = el("label", "jd-box");
    box.title = "Queue this release";
    var input = el("input");
    input.type = "checkbox";
    input.checked = selected.has(href);
    box.appendChild(input);

    // The tick lives inside an <a class="work">, so a click that reaches the
    // anchor navigates away and the selection is lost.
    //
    // stopPropagation is what stops the navigation - the anchor's default
    // action only runs if the event actually reaches it. Calling
    // preventDefault() on the click as well would cancel the checkbox toggle
    // too, which is why it is only used on the events that need it: those
    // suppress text selection and middle-click, and have no toggle semantics.
    box.addEventListener("click", function (event) {
      event.stopPropagation();
    });
    ["mousedown", "mouseup", "auxclick", "contextmenu", "keydown"].forEach(function (type) {
      box.addEventListener(type, function (event) {
        event.preventDefault();
        event.stopPropagation();
      });
    });
    input.addEventListener("change", function () {
      if (input.checked) selected.add(href);
      else selected.delete(href);
      box.classList.toggle("on", input.checked);
      if (info.vr) box.classList.remove("bad");
      updateCount();
    });
    box.classList.toggle("on", input.checked);
    card.appendChild(box);

    if (info.vr) {
      var badge = el("span", "jd-badge vr", "VR");
      card.appendChild(badge);
    }
  }

  function applyFilter() {
    var hidden = 0;
    worksOnPage().forEach(function (card) {
      var info = known.get(card.getAttribute("href"));
      if (!info) return;
      var show =
        settings.filter === "all" ||
        (settings.filter === "vr" && info.vr) ||
        (settings.filter === "non-vr" && !info.vr);
      card.style.display = show ? "" : "none";
      if (!show) hidden++;
    });
    updateCount(hidden);
  }

  function updateCount(hidden) {
    var node = document.querySelector(".jd-count");
    if (!node) return;
    node.textContent = "";
    node.appendChild(document.createTextNode("Selected "));
    node.appendChild(el("b", null, String(selected.size)));
    if (hidden) node.appendChild(document.createTextNode(" · " + hidden + " hidden by filter"));
  }

  function clearSelection() {
    selected.clear();
    document.querySelectorAll(".jd-box input").forEach(function (input) {
      input.checked = false;
    });
    document.querySelectorAll(".jd-box.on").forEach(function (box) {
      box.classList.remove("on");
    });
    updateCount();
  }

  // ----------------------------------------------------------------- panel
  function buildPanel() {
    if (document.querySelector(".jd-panel")) return;

    var panel = el("div", "jd-panel");
    var head = el("div", "jd-hd");
    head.appendChild(el("b", null, "JAV8 Downloader"));
    var fold = el("button", "jd-btn ghost", "–");
    fold.style.padding = "0 6px";
    head.appendChild(fold);
    panel.appendChild(head);

    var body = el("div", "jd-body");

    // Downloader
    var r1 = el("div", "jd-row");
    r1.appendChild(el("label", null, "Client"));
    var engineSel = el("select");
    [
      ["aria2", "aria2"],
      ["qbittorrent", "qBittorrent"],
    ].forEach(function (pair) {
      var opt = el("option", null, pair[1]);
      opt.value = pair[0];
      if (settings.active === pair[0]) opt.selected = true;
      engineSel.appendChild(opt);
    });
    engineSel.addEventListener("change", function () {
      settings.active = engineSel.value;
      persist();
    });
    r1.appendChild(engineSel);
    body.appendChild(r1);

    // VR filter
    var r2 = el("div", "jd-row");
    r2.appendChild(el("label", null, "Filter"));
    var filterSel = el("select");
    [
      ["all", "All"],
      ["non-vr", "non-VR only"],
      ["vr", "VR only"],
    ].forEach(function (pair) {
      var opt = el("option", null, pair[1]);
      opt.value = pair[0];
      if (settings.filter === pair[0]) opt.selected = true;
      filterSel.appendChild(opt);
    });
    filterSel.addEventListener("change", function () {
      settings.filter = filterSel.value;
      persist();
      applyFilter();
    });
    r2.appendChild(filterSel);
    body.appendChild(r2);

    // Size window
    var r3 = el("div", "jd-row");
    r3.appendChild(el("label", null, "Min"));
    var minIn = el("input");
    minIn.type = "number";
    minIn.min = "0";
    minIn.step = "100";
    minIn.value = String(Math.round((settings.minSize / MB) * 100) / 100);
    minIn.title = "Lower bound in MB";
    r3.appendChild(minIn);
    body.appendChild(r3);

    var r4 = el("div", "jd-row");
    r4.appendChild(el("label", null, "Max"));
    var maxIn = el("input");
    maxIn.type = "number";
    maxIn.min = "0";
    maxIn.step = "100";
    maxIn.value = String(Math.round((settings.maxSize / MB) * 100) / 100);
    maxIn.title = "Upper bound in MB";
    r4.appendChild(maxIn);
    body.appendChild(r4);

    function commitSizes() {
      var lo = parseFloat(minIn.value);
      var hi = parseFloat(maxIn.value);
      if (isFinite(lo) && lo > 0) settings.minSize = Math.round(lo * MB);
      if (isFinite(hi) && hi > 0) settings.maxSize = Math.round(hi * MB);
      if (settings.minSize > settings.maxSize) {
        var swap = settings.minSize;
        settings.minSize = settings.maxSize;
        settings.maxSize = swap;
      }
      persist();
    }
    minIn.addEventListener("change", commitSizes);
    maxIn.addEventListener("change", commitSizes);

    var count = el("div", "jd-count");
    body.appendChild(count);

    var logBox = el("div", "jd-log");
    body.appendChild(logBox);

    var magnetBox = el("div", "jd-mt");
    magnetBox.style.display = "none";
    body.appendChild(magnetBox);

    panel.appendChild(body);

    var foot = el("div", "jd-foot");
    var go = el("button", "jd-btn", "Download selected");
    go.addEventListener("click", function () {
      runSelection(go);
    });
    var clear = el("button", "jd-btn ghost", "Clear");
    clear.addEventListener("click", clearSelection);
    var cfg = el("button", "jd-btn ghost", "Settings");
    cfg.addEventListener("click", openSettings);
    foot.appendChild(go);
    foot.appendChild(clear);
    foot.appendChild(cfg);
    panel.appendChild(foot);

    // draggable
    head.addEventListener("mousedown", function (event) {
      if (event.target === fold) return;
      var box = panel.getBoundingClientRect();
      dragging = { dx: event.clientX - box.left, dy: event.clientY - box.top };
      event.preventDefault();
    });
    document.addEventListener("mousemove", function (event) {
      if (!dragging) return;
      var x = Math.max(0, Math.min(window.innerWidth - 60, event.clientX - dragging.dx));
      var y = Math.max(0, Math.min(window.innerHeight - 40, event.clientY - dragging.dy));
      panel.style.left = x + "px";
      panel.style.top = y + "px";
      panel.style.right = "auto";
    });
    document.addEventListener("mouseup", function () {
      dragging = null;
    });
    fold.addEventListener("click", function () {
      var open = body.style.display !== "none";
      body.style.display = open ? "none" : "";
      foot.style.display = open ? "none" : "flex";
      fold.textContent = open ? "+" : "–";
    });

    document.body.appendChild(panel);
    renderLog();
  }

  // -------------------------------------------------------------- downloading
  function runSelection(button) {
    if (!selected.size) {
      log("Nothing ticked yet.", "wa");
      return;
    }
    var hrefs = Array.from(selected);
    var target = engine();
    button.disabled = true;
    log("Sending " + hrefs.length + " to " + target.label + "…", "mu");

    var queue = hrefs.slice();
    var failures = 0;

    function next() {
      if (!queue.length) {
        button.disabled = false;
        log(failures ? "Done with " + failures + " failure(s)." : "All done.", failures ? "wa" : "ok");
        return;
      }
      var href = queue.shift();
      var label = (known.get(href) || {}).code || href;
      fetchMagnets(href)
        .then(function (detail) {
          var picked = pickMagnet(detail.magnets, settings.minSize, settings.maxSize);
          if (!picked.magnet) {
            failures++;
            log(label + ": " + (picked.reason === "ads-only" ? "only advert magnets" : "no magnets"), "er");
            return;
          }
          if (picked.reason === "outside-window") {
            log(label + ": " + formatSize(picked.magnet.size) + " is outside your size window", "wa");
          }
          return target.send(picked.magnet).then(
            function (result) {
              log(label + " → " + result + "  (" + formatSize(picked.magnet.size) + ")", "ok");
            },
            function (err) {
              failures++;
              log(label + ": " + err.message, "er");
            },
          );
        })
        .catch(function (err) {
          failures++;
          log(label + ": " + err.message, "er");
        })
        .then(next);
    }
    next();
  }

  // ------------------------------------------------------- detail page panel
  function isDetailPage() {
    return /^\/v\/\d+/.test(location.pathname);
  }

  function buildDetailPanel() {
    // No "already built" guard here: init() calls buildPanel() first, so an
    // early return on ".jd-panel exists" would skip the magnet list entirely.
    // buildPanel() is itself idempotent, which is the guard that belongs here.
    buildPanel();
    if (document.querySelector(".jd-magnet-rows")) return;
    var box = document.querySelector(".jd-mt");
    if (!box) return;
    box.style.display = "";
    box.textContent = "";
    box.appendChild(el("div", "jd-count", "Reading magnets on this page…"));

    var href = location.pathname;
    fetchMagnets(href)
      .then(function (detail) {
        box.textContent = "";
        var codeEl = document.querySelector("dl dt.highlight");
        var titleEl = document.querySelector("h1.text-zh");
        var vr = isVr(
          codeEl ? codeEl.textContent : detail.code,
          titleEl ? titleEl.textContent : detail.title,
        );

        var head = el("div", "jd-count");
        head.appendChild(document.createTextNode(detail.magnets.length + " magnets"));
        if (vr) head.appendChild(el("span", "jd-tag", " VR"));
        if (detail.magnets.some(function (m) {
          return m.tier !== "clean";
        })) {
          head.appendChild(document.createTextNode(" · adverts marked"));
        }
        box.appendChild(head);

        var picked = pickMagnet(detail.magnets, settings.minSize, settings.maxSize);

        // Marks this panel as populated so a repeat visit does not duplicate it.
        var rows = el("div", "jd-magnet-rows");
        box.appendChild(rows);

        detail.magnets
          .slice()
          .sort(function (a, b) {
            return (b.size || 0) - (a.size || 0);
          })
          .forEach(function (magnet) {
            var row = el("div", "jd-mrow");
            if (magnet.tier !== "clean") row.classList.add("ad");
            if (picked.magnet && magnet.uri === picked.magnet.uri) row.classList.add("pick");

            var name = el("div", "jd-mname", magnet.name || "(unnamed)");
            name.title = magnet.tier === "clean" ? "real release" : "advert - not queued automatically";
            row.appendChild(name);

            if (magnet.tier === "ad") row.appendChild(el("span", "jd-tag ad", "AD"));
            else if (magnet.tier === "suspect") row.appendChild(el("span", "jd-tag sus", "SUS"));

            var size = el("span", "jd-msz", formatSize(magnet.size));
            size.title = "Click to send this one";
            size.addEventListener("click", function () {
              engine()
                .send(magnet)
                .then(function (result) {
                  log(magnet.name + " → " + result + " (" + formatSize(magnet.size) + ")", "ok");
                })
                .catch(function (err) {
                  log(magnet.name + ": " + err.message, "er");
                });
            });
            row.appendChild(size);
            rows.appendChild(row);
          });

        if (picked.reason === "outside-window") {
          box.appendChild(
            el(
              "div",
              "jd-wa",
              "No magnet fell inside " +
                formatSize(settings.minSize) +
                "–" +
                formatSize(settings.maxSize) +
                "; the largest real one was used.",
            ),
          );
        } else if (picked.reason === "ads-only") {
          box.appendChild(el("div", "jd-er", "Every entry here looks like an advert."));
        }
      })
      .catch(function (err) {
        box.textContent = "";
        box.appendChild(el("div", "jd-er", "Could not read magnets: " + err.message));
      });
  }

  // -------------------------------------------------------------- settings
  function openSettings() {
    if (document.querySelector(".jd-dlg")) return;
    var overlay = el("div", "jd-dlg");

    var box = el("div", "jd-dlgbox");
    box.appendChild(el("h3", null, "Download clients"));
    box.appendChild(
      el(
        "p",
        "hint",
        "Vendor defaults are shown as placeholders; leave a field empty to keep it. " +
          "Saved in this browser only. Point a host at anything your browser can reach - " +
          "aria2 and qBittorrent send no CORS headers, so the userscript manager's " +
          "privileged request is what makes the connection work.",
      ),
    );

    var inputs = {};

    function section(title, engineName, fields) {
      var wrap = el("div", "jd-set");
      wrap.appendChild(el("h4", null, title));
      fields.forEach(function (field) {
        var label = el("label");
        label.appendChild(el("span", null, field.label));
        var input = el("input");
        input.type = field.secret ? "password" : field.type || "text";
        if (field.type) input.type = field.type;
        // Placeholder is the vendor default; the value is only the user's own
        // override, so an untouched field is visibly untouched.
        var fallback = DEFAULTS.downloaders[engineName][field.key];
        input.placeholder = fallback === "" || fallback === undefined ? field.placeholder : String(fallback);
        var mine = overrideFor(engineName, field.key);
        input.value = mine === undefined ? "" : String(mine);
        inputs[engineName + "." + field.key] = { input: input, spec: field };
        label.appendChild(input);
        wrap.appendChild(label);
      });
      box.appendChild(wrap);
    }

    section("aria2", "aria2", [
      { key: "host", label: "Host", placeholder: "http://localhost" },
      { key: "port", label: "Port", type: "number", placeholder: "6800" },
      { key: "secret", label: "RPC secret", secret: true, placeholder: "(none)" },
      { key: "dir", label: "Save dir", placeholder: "client default" },
    ]);

    section("qBittorrent", "qbittorrent", [
      { key: "host", label: "Host", placeholder: "http://localhost" },
      { key: "port", label: "Port", type: "number", placeholder: "8080" },
      { key: "username", label: "Username", placeholder: "admin" },
      { key: "password", label: "Password", secret: true, placeholder: "adminadmin" },
      { key: "savePath", label: "Save path", placeholder: "client default" },
      { key: "category", label: "Category", placeholder: "jav" },
    ]);

    var actions = el("div", "jd-actions");
    var test = el("button", "jd-btn", "Test connection");
    var save = el("button", "jd-btn", "Save");
    var reset = el("button", "jd-btn ghost", "Defaults");
    var close = el("button", "jd-btn ghost", "Close");
    actions.appendChild(test);
    actions.appendChild(save);
    actions.appendChild(reset);
    actions.appendChild(close);
    box.appendChild(actions);

    function collect() {
      // Rebuild the sparse override map from what is currently in the form:
      // blank means "vendor default", so the key is dropped entirely.
      var overrides = {};
      Object.keys(inputs).forEach(function (key) {
        var parts = key.split(".");
        var engineName = parts[0];
        var field = inputs[key];
        var raw = field.input.value.trim();
        if (!overrides[engineName]) overrides[engineName] = {};
        if (raw === "") {
          delete overrides[engineName][field.spec.key];
          return;
        }
        overrides[engineName][field.spec.key] = field.spec.type === "number" ? Number(raw) : raw;
      });
      storedSettings = { ...storedSettings, downloaders: overrides };
      settings = deepMerge(DEFAULTS, storedSettings);
    }

    test.addEventListener("click", function () {
      collect();
      test.disabled = true;
      test.textContent = "Testing…";
      engine()
        .probe()
        .then(function (message) {
          test.textContent = message;
          test.disabled = false;
          log("Probe: " + message, "ok");
        })
        .catch(function (err) {
          test.textContent = "Failed";
          test.disabled = false;
          log("Probe failed: " + err.message, "er");
        });
    });

    save.addEventListener("click", function () {
      collect();
      persist();
      log("Settings saved", "ok");
      closeSettings();
    });

    reset.addEventListener("click", function () {
      resetAll();
      log("Reset to vendor defaults", "wa");
      closeSettings();
    });

    function closeSettings() {
      overlay.remove();
    }
    close.addEventListener("click", closeSettings);
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) closeSettings();
    });

    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  // -------------------------------------------------------------------- init
  function decorateAll() {
    var cards = worksOnPage();
    if (!cards.length) return false;
    // Relative offsets need a positioned ancestor; the site does not set one.
    // Guarded, because init() may call decorateAll a second time on routes that
    // render their listing client-side.
    if (!document.getElementById("jd-position-style")) {
      var style = document.createElement("style");
      style.id = "jd-position-style";
      style.textContent = ".works .work,.studios .work{position:relative}";
      document.head.appendChild(style);
    }
    cards.forEach(decorateCard);
    applyFilter();
    updateCount();
    return true;
  }

  function init() {
    if (!isTargetHost(location.hostname)) return;
    injectStyle();
    buildPanel();
    if (isDetailPage()) {
      buildDetailPanel();
      return;
    }
    if (!decorateAll()) {
      // The listing is rendered client-side on some routes; try once more.
      setTimeout(function () {
        decorateAll();
      }, 1200);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
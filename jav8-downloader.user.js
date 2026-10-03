// ==UserScript==
// @name         JAV8 Downloader
// @namespace    https://github.com/mino29/jav8-dl
// @homepage     https://github.com/mino29/jav8-dl
// @version      1.4.0
// @icon          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAAAXNSR0IArs4c6QAAAFBlWElmTU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAANaADAAQAAAABAAAANQAAAAD1pCHuAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoZXuEHAAAGoklEQVRoBe1aa2wUVRQ+d2a23W1pd7u7RV5VoQ8TQxR+iBLRGiUh/tAAAgYSI6I8EjBRIuKDkrULfyTxETThETAaHwRE/dMQgjEQCz8IllCVAqVWpAEMfb/2OXM9Z7q7nRl22WV2dmNJJ5nee+6cx/3uufPtnXsLoVBoB96HotHoYs55AdwFl4BXJ+KYIyvK4Ugk8m84HN6DZS0CZGMaHwEgIAQI755QOMwxe1cpiyjPGtPgqPM0BWkq0pREQKEYwBYE/R4+q7wbAJYisJV4H1PBYQax3oj3BgQ48W4AOJHA4H2GAGIZwuw9M+aBxQHQNMTp2UIAsT62CSUOikr1vcOMUalt/z/UU47yQc7F5tbOrxlnc6mjtU6hwi0xWdvpqmKHRPLloUBU256LektA6b8wzAfJN2Psg/oazxep4qQERQbb/x6aHIwGfuMKn1wiMnjWKUCBxqJQFGFKkQN6g2HoiYRTxci6vSMCyvF+WSBHCOhwfZVnKZY8lWNVMdXD9+8vvi6KbDEDFhmQOZwYUHSqIVmGkKxwl/3OFiIMolAc2Qeu4BooDW0FSbmo86sV+nFuNA4ocUDnRadn5e0Aka1m3LWu9PUtl26uxZZd1PqAncEjxaNjYSZb7qFlUKj8nAjCoRC6iw5BWJyXaKNKGHNxpE8BGlBMUXchSHPqql1tOqUkwmjvkjyMN22rKd8NTNhL8sUgB5oO8WeUrcFIBDLNliP6ow4Q+WEQAmfw7bjLRHlqMAGIC8BWZAKIjDMCRYoVVe71OFqnqE7ToUtDDT3hCDVDmS39NLTJZ1Vd4x9JuYDgRp02BxTooFThhW/PO/XVnqNGm1RyxqDWMhZx2BxLENjVKOfQiKMYiwlRRUlkSxJu71IW7kvaF0UoBw4qmaozoXl4BBAqH/DXeD9MapSi8fY9MBgRcUgSW8YYBI3EkchWgc1gpRcDtiVAAIzXoO0NtUlLDNjQLLm8q4266eSMiMLoZOulrlcUUPZTOxHHozEFp8uuvltXbvQbTXSyyNuhhL0LNjiHL6cHhvkqCLBVEGYKNISFBDFg1mf7Kt3/6IwzEEyBIr91rZ07cYm0QUBmemlnBzjPDQJziFDy7SyI/jkAw1suZRBer9L06mRonOcipuMSg/m+Ku8veo3MpDuaflqX06o8GzH4cQV/lA+unQpRrw14AH+3vrkGtsfdID5UqlVPW7/2dNkIINTkwN4yC4gCmQZFxCEVFywl4gg4BGh4vQIUuwChn26AciMIjtUVaYHEFYZqiuCHFffERPbl9mrPR/FnZkrToCiYb0pppyTwxUQcV+4thFNrpuJKl0NwfweIM0vANrcsbZ8ow9+vnwqUceT0JsnmWZfWKI1CVqDIt6+y/Axmi1Yc0DR7ArQ974XIsU5Q2ofBni5b+OJQhvtKkcoZ3JQEcZFvOguSr2yurEFRcH+V9ytBhI+p3rCoHPoengDBvVdBmF4EtgVeak56Nb08CSjDtLZkoviCGaZL5tgSUOR45gzvJiYwdUFHxBFoHQT5jwGwr5wGgBkxXlpiwDd7o3+G+1ejjlnZMlD4iyyLRQXL8fvrSpw4ApStSXYoXDhJ1z8jMWCmP9MpZClYBor6QcQBkvAc5mWIptWJp5wQOdkNtlp3opt6YmCnrSCGhPNYxVJQ5NNf6f4d3w91aUPEcbalDwbfPD8STkMMOFWv41pyoRXEEMOSKCwHRZ7rK93f4c7vDqofne+GHiQOurTEAILwIq0l1QcW/7n1DbYoAO1xnLvc1cA4X+DAz4gnT/aqAGPu16nfaBbFMrrJGSgK5GvvceFu0xlc94zu7OLH5rZqzxpjR6yUczL94h30TS/rZfiDSsShtjF2Wv3YjCvkqMwpKOozEQdud6o7KwLwI7RmzBGWhNucg0pEymNlHFQeBzurUOOZymr48mg8nqk8DnZWocYzldXw5dF4PFN5HOysQo1nKqvhy6NxzjPla+96DPGo27UKsFrftf7Ue2YWAc/ZR+LIB6KC50r8NfzfoNE4eMyJ+3yb66vc+9Kd3ZrFOBrMrIckdlvbupcrivwpfvHeehAV18dTSQnYal+1J7YrE3+QfWkpKH9rb2UQop/TvkQmXaOdWdye3SFKHr+Vu0qWgNrNua3jctcmnGp1eHJqzwSQTodBmwDC+js519XZG4SsQdX91f0EyMouPIB70ODbjHjAUVC0MdutM9OgUhKBGSgaGySPPhygzf5q7x6zRGIKFGWHy/IneP6Smgg0HTVV5fyk2az9B+oZomKJHfTiAAAAAElFTkSuQmCC
// @description  Tick covers to queue them, filter by VR, pick the best magnet by size, and send to aria2 or qBittorrent. Settings live in the browser, not in a config file.
// @author       mino29
// @match        *://jav8.vip/*
// @match        *://*.jav8.vip/*
// @connect      *
// @updateURL    https://raw.githubusercontent.com/mino29/jav8-dl/main/jav8-downloader.user.js
// @downloadURL  https://raw.githubusercontent.com/mino29/jav8-dl/main/jav8-downloader.user.js
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
 * qBittorrent note, measured against a live v5.2.3 WebUI rather than assumed:
 *
 * - It refuses any request carrying a cross-site `Origin` or `Referer`, which is
 *   exactly what a privileged request inherits from the page it runs on. Its own
 *   wiki says to set both to the client's own base URL, so every request here
 *   does. If the userscript manager strips them anyway (Chrome forbids setting
 *   them, and not every manager passes them through), the failure is a bare 401
 *   and the only fix is one WebUI toggle - so qbFailure() names it.
 * - The session cookie is `SID` on 4.x but `QBT_SID_<port>` on 5.x, which allows
 *   several WebUIs to share a host. A pattern anchored on `SID` found nothing at
 *   all against a 5.x server and silently degraded to the manager's cookie jar.
 * - Login answers `200 "Ok."` on 4.x and `204` with an empty body on 5.x, so the
 *   body alone cannot decide whether a login succeeded.
 *
 * Cross-origin note: aria2 and qBittorrent send no CORS headers, so a plain
 * fetch() from the page cannot reach them. GM_xmlhttpRequest is what makes
 * this work; without a userscript manager there is nothing to fall back to.
 *
 * @connect note, read before changing the metadata block:
 *
 * The shipped line is `@connect *`, which is what makes this work against a
 * client on any address without the user editing anything. Listing one host per
 * client was tried first and rejected: @connect is read once, when the manager
 * installs the script, so it cannot be filled in at runtime - a user who has to
 * edit the script to make it work has a script that does not work. There is no
 * middle ground, because a subnet wildcard such as `192.168.*` is not a valid
 * value and silently grants nothing; that cost an afternoon to find out.
 *
 * What `*` costs: the script may send a privileged request to any host the
 * browser can reach. In practice it talks only to the download client and to
 * jav8.vip, and sends no page content anywhere. To narrow it, replace the line
 * with one entry per client you actually run:
 *
 *   @connect localhost
 *   @connect 127.0.0.1
 *   @connect 192.168.1.50
 *
 * If a request is ever refused, qbFailure() names the host it wanted.
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
    // Performer index (/top-actresses). Each tile is a link to her works page.
    actressTile: 'a.actress[href^="/actress/"]',
    actressName: ".actress-name",
    actressTitle: "h1.actress-title",
    // Every paginated route uses the same control, so autopagination is one
    // lookup rather than one per route. Verified on /actress/<id>?page=N,
    // /top-actresses?page=N and the listing routes.
    paginationNext: "a.pagination-next[href]",
  };

  /**
   * How wide a window one preferred-size stop buys: [P / 10, P * 10].
   *
   * A single slider has to stand in for the old Min and Max boxes, so the two
   * bounds are derived from one number instead of being set independently. The
   * floor is the half that carried the documented intent - it exists to skip
   * 200 MB samples - so the ratio is symmetric around the preferred size and
   * wide enough that the full-quality version of a release still clears it.
   */
  var SIZE_WINDOW_RATIO = 10;

  /**
   * Stops for the preferred-size slider, ascending, in bytes.
   *
   * Discrete stops rather than a continuous range on purpose: every position
   * then lands on a round number a user would actually type, the control is
   * keyboard- and screen-reader-navigable without any ARIA of our own, and a
   * persisted preference is always one of a known set rather than a float that
   * drifted. The ladder spans what the site actually labels (1-50 GB, with
   * plenty of headroom above the largest releases seen) rather than a
   * mathematically even range.
   */
  var SIZE_LADDER = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 30, 50].map(function (gb) {
    return gb * GB;
  });

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
    preferredSize: 5 * GB,
  };

  // minSize/maxSize are what pickMagnet() compares against, but they are derived
  // and never stored: persisting both a slider position and the window it implies
  // would be two answers to one question, and they would eventually disagree.
  DEFAULTS.minSize = Math.round(DEFAULTS.preferredSize / SIZE_WINDOW_RATIO);
  DEFAULTS.maxSize = Math.round(DEFAULTS.preferredSize * SIZE_WINDOW_RATIO);

  /** A usable byte count, or the fallback. Slider and stored values both. */
  function coerceSize(bytes, fallback) {
    var n = Number(bytes);
    return isFinite(n) && n > 0 ? n : fallback;
  }

  /** The [min, max] window one preferred-size stop implies. */
  function windowFromPreferred(bytes) {
    var preferred = coerceSize(bytes, DEFAULTS.preferredSize);
    return {
      min: Math.round(preferred / SIZE_WINDOW_RATIO),
      max: Math.round(preferred * SIZE_WINDOW_RATIO),
    };
  }

  /**
   * Index of the ladder stop a byte count names, or the nearest one.
   *
   * Distance is compared in log space because the ladder is geometric-ish: a
   * linear comparison would treat the gap from 1 GB to 2 GB as twice as
   * important as 49 GB to 50 GB and put almost every stop in the top half.
   */
  function preferredIndex(bytes) {
    var target = Math.log(coerceSize(bytes, DEFAULTS.preferredSize));
    var best = 0;
    for (var i = 1; i < SIZE_LADDER.length; i++) {
      if (
        Math.abs(Math.log(SIZE_LADDER[i]) - target) <
        Math.abs(Math.log(SIZE_LADDER[best]) - target)
      ) {
        best = i;
      }
    }
    return best;
  }

  /** The ladder stop at an index, clamped to the ladder. */
  function preferredAtIndex(index) {
    var i = Number(index);
    if (!isFinite(i)) i = preferredIndex(DEFAULTS.preferredSize);
    return SIZE_LADDER[Math.max(0, Math.min(SIZE_LADDER.length - 1, Math.round(i)))];
  }

  /**
   * One-off migration off the removed Min/Max boxes.
   *
   * Only the floor is carried across: it was the half with a stated purpose
   * ("skip 200 MB samples"), whereas a window spanning 500 MB to 100 GB has no
   * single centre worth recovering - its geometric mean sits near 240 MB, which
   * would hand back a window far narrower than the one the user had. So the
   * slider is positioned to preserve the old floor and the ceiling follows.
   */
  function preferredFromFloor(minBytes) {
    var budget = coerceSize(minBytes, DEFAULTS.minSize) * SIZE_WINDOW_RATIO;
    var pick = SIZE_LADDER[0];
    for (var i = 0; i < SIZE_LADDER.length; i++) {
      if (SIZE_LADDER[i] <= budget) pick = SIZE_LADDER[i];
    }
    return pick;
  }

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
   *   1. clean magnets whose size sits inside the user's window, and among
   *      those the one *closest to their preferred size*
   *   2. if the window excludes everything clean, the largest clean magnet,
   *      flagged so the caller can say it fell outside
   *   3. if there are no clean magnets at all, a "suspect" one rather than
   *      nothing - but never an "ad"
   *
   * Within a tier, closest to preferred wins - NOT the largest. Taking the
   * largest inside a window ten times either side of the target meant the
   * slider barely changed the outcome: move it from 5 GB to 20 GB and both
   * still picked whatever the biggest release happened to be, so the control
   * looked broken while every number it displayed was correct. A preference you
   * set and then cannot observe is not a preference.
   *
   * The floor keeps its original job - skipping 200 MB samples - and the ceiling
   * keeps excluding the absurd multi-hundred-GB labels. Both still apply as a
   * hard filter; only the tie-break within them changed.
   */
  function pickMagnet(magnets, minBytes, maxBytes, preferredBytes) {
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
      return { magnet: closestToPreferred(inWindow, preferredBytes), reason: "in-window" };
    }
    // Nothing the user asked for is available, so fall back to the biggest real
    // release - and say so, rather than sending nothing.
    return { magnet: largest(candidates), reason: "outside-window" };
  }

  /**
   * The entry whose size is nearest the preferred one.
   *
   * Compared in log space, because the window spans a factor of a hundred and a
   * linear distance would call 1 GB a long way from 5 GB while treating 49 GB and
   * 50 GB as interchangeable. Log space asks the question the slider actually
   * poses: which release is about the size I asked for.
   *
   * An exact tie goes to the larger, keeping the old instinct that between two
   * equally-close releases the fuller one is the better answer.
   */
  function closestToPreferred(list, preferredBytes) {
    var target = Math.log(coerceSize(preferredBytes, DEFAULTS.preferredSize));
    var best = null;
    var bestDelta = Infinity;
    list.forEach(function (m) {
      var delta = Math.abs(Math.log(m.size) - target);
      var tied = Math.abs(delta - bestDelta) < 1e-9;
      if (best === null || delta < bestDelta || (tied && m.size > best.size)) {
        best = m;
        bestDelta = delta;
      }
    });
    return best;
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

  /**
   * The scheme://host:port a client lives at - no path, no trailing slash.
   *
   * qBittorrent compares this against the request's Origin and Referer, so it
   * has to be composable on its own rather than as one of several endpoints.
   */
  function origin(host, port) {
    return endpoint(host, port, "").replace(/\/+$/, "");
  }

  /**
   * The bare hostname, which is what a userscript manager's @connect needs.
   *
   * Tampermonkey documents @connect as accepting a domain, `self`, `localhost`,
   * an IP address, or `*`. A subnet wildcard such as `192.168.*` is not among
   * them, so it does not reliably grant access - and when it does not, the
   * request is refused before it leaves the browser and arrives as a network
   * error with no HTTP status at all. That is the failure this whole function
   * exists to make fixable: it strips the scheme, port and IPv6 brackets so the
   * message can name a value that is correct rather than one that has to be
   * worked out.
   */
  function connectHost(host, port) {
    var full = endpoint(host, port, "");
    var afterScheme = full.replace(/^[a-z][a-z0-9+.-]*:\/\//i, "");
    var hostOnly = afterScheme.replace(/:\d{1,5}$/, "");
    // [::1]:8080 -> ::1. The brackets are IPv6 syntax, not part of the name.
    var unwrapped = hostOnly.replace(/^\[(.+)\]$/, "$1");
    return unwrapped || full;
  }

  /**
   * qBittorrent's session cookie.
   *
   * 4.x sets `SID`; 5.x sets `QBT_SID_<port>` so several WebUIs can share one
   * host. Anchoring on `SID` alone matched nothing at all against a 5.x server,
   * because of the `_8082` before the `=`, and the symptom was silence: no
   * cookie, no error, and every call quietly depending on the manager's own jar.
   *
   * Deliberately not anchored to the start of a header, because the value is
   * read out of a whole `responseHeaders` blob whose formatting is not ours.
   */
  var SID_COOKIE_RE = /((?:QBT_)?SID(?:_\d{1,5})?)\s*=\s*([^;\r\n]+)/i;

  /**
   * responseHeaders is a string in most managers, an object in some.
   *
   * Set-Cookie is a forbidden header name for a plain fetch and is not surfaced
   * by every userscript manager at all, so both shapes have to be tolerated
   * before concluding there is no cookie to read.
   */
  function headerString(headers) {
    if (typeof headers === "string") return headers;
    if (!headers) return "";
    if (Array.isArray(headers)) return headers.join("\n");
    if (typeof headers === "object") {
      return Object.keys(headers)
        .map(function (key) {
          return key + ": " + headers[key];
        })
        .join("\n");
    }
    return String(headers);
  }

  /** The "name=value" pair for a Cookie header, or null when there is none. */
  function parseSidCookie(headers) {
    var match = SID_COOKIE_RE.exec(headerString(headers));
    return match ? match[1] + "=" + match[2].trim() : null;
  }

  /**
   * Did a login response actually authenticate?
   *
   * 4.x answered `200` with the body `Ok.`, or `Fails.` on bad credentials. 5.x
   * answers `204` with an empty body, so the body alone cannot decide this and
   * a check against `Fails.` alone is dead code on a current server. request()
   * has already rejected anything outside 2xx, so transport is not in question.
   */
  function loginAccepted(status, body) {
    return !/^\s*fails/i.test(String(body === undefined || body === null ? "" : body));
  }

  /**
   * The status code out of a request() error, or 0 when it is not an HTTP one.
   *
   * Prefers the field request() attaches, then falls back to the message: a
   * rejection can also come from a caller wrapping the error itself, and 0 is a
   * safe answer because it routes to the "never arrived" advice rather than
   * guessing at a status.
   */
  function statusOf(err) {
    if (err && err.status) return Number(err.status);
    var match = /HTTP (\d{3})/.exec(err && err.message ? String(err.message) : "");
    return match ? Number(match[1]) : 0;
  }

  /**
   * Mark a failure as already explained, so a caller further up does not
   * replace a precise message with a vaguer one.
   *
   * The layers here are login -> session -> call, and each has a different
   * remedy. Without this, a login rejected for bad credentials was re-reported
   * by the request layer as an unreachable host, pointing the user at @connect
   * for a problem that had nothing to do with it.
   */
  function explained(message) {
    var err = new Error(message);
    err.explained = true;
    return err;
  }

  /**
   * Consecutive login failures tolerated before giving up on a batch.
   *
   * qBittorrent's web_ui_max_auth_fail_count defaults to 5 and its ban lasts an
   * hour, so a selection of 17 that keeps retrying a wrong password does not
   * merely fail - it locks the user out of their own client, from their own
   * machine, which is worse than the bug it started as. Three leaves margin
   * under that default while still letting a transient blip through.
   *
   * Kept here rather than inline so the threshold is asserted rather than
   * rediscovered when someone tunes it.
   */
  var MAX_LOGIN_FAILURES = 3;

  /**
   * Explain a qBittorrent failure in terms the user can act on.
   *
   * Every failure here arrives as a bare status code, and 401 in particular
   * means three different things depending on where in the exchange it landed.
   * Passing "HTTP 401" up to the log would leave the user with no way to tell a
   * typo'd password from a server-side security toggle, so the phase decides
   * what is said.
   */
  function qbFailure(status, phase, base) {
    if (!status) {
      // No status at all means the request never produced an HTTP response. In a
      // userscript that is almost always @connect: the manager refuses the call
      // before it leaves the browser, so the refusal cannot look like anything
      // else. Naming the exact value is the whole point - "add 192.168.1.50" is a
      // two-second fix, "check your @connect settings" is a guessing game.
      return (
        "Could not reach qBittorrent at " + (base || "the configured host") +
        ". The request was stopped before it reached the server, which for a " +
        "userscript almost always means it is not permitted. Add this line to " +
        "the metadata block at the very top of this script, then reinstall or " +
        "save it in your manager:\n\n" +
        "// @connect      " + (connectHint(base) || "<host>") + "\n\n" +
        "Nothing in this script can add it for you at runtime - @connect is read " +
        "once, when the manager installs the script. There is no subnet wildcard " +
        "that covers a range of addresses; the exact host is required."
      );
    }
    if (phase === "login") {
      if (status === 403) {
        return (
          "qBittorrent refused the login with 403, which it returns when it has " +
          "banned this IP after too many failed attempts. Wait for the ban to " +
          "expire (Web UI > Security > ban duration) or restart qBittorrent."
        );
      }
      return (
        "qBittorrent at " + (base || "the configured host") + " refused the login " +
        "(HTTP " + (status || 401) + "). Either the username or password is wrong, or the " +
        "request reached the server as cross-site because this userscript manager " +
        "stripped the Origin and Referer headers the script sets. Check the " +
        "password and the host first; if both are right, uncheck \"Use CSRF " +
        "protection\" in Tools > Preferences > Web UI."
      );
    }
    if (status === 401 || status === 403) {
      return (
        "qBittorrent refused the request as cross-site (HTTP " + status + "). Its " +
        "CSRF protection rejects any request whose Origin or Referer is not the " +
        "client itself, and this userscript manager stripped the ones the script " +
        "sets. Uncheck \"Use CSRF protection\" in Tools > Preferences > Web UI " +
        "(and \"Validate host header\" if that is what is refusing)."
      );
    }
    return "qBittorrent returned HTTP " + status + ".";
  }

  /**
   * Turn a base URL back into the value a @connect line needs.
   *
   * Takes the composed URL rather than the raw host field so it works for every
   * shape a user can type - bare hostname, hostname with an embedded port, or a
   * full URL - and so it cannot disagree with the URL actually being requested.
   */
  function connectHint(base) {
    if (!base) return "";
    return connectHost(base, "");
  }

  /**
   * The page after this one, or null when this is the last one.
   *
   * Every paginated route on the site renders the same control, so one lookup
   * covers /actress/<id>, /top-actresses and the listings. The *absence* of the
   * link is the only dependable end-of-list signal - there is no total count in
   * the markup to divide up - so returning null rather than guessing a page
   * count is what stops the crawl at the right place.
   */
  function nextPageHref(doc) {
    var link = doc.querySelector(SELECTORS.paginationNext);
    if (!link) return null;
    var href = link.getAttribute("href");
    return href ? href : null;
  }

  /**
   * Follow an ?page=N chain and collect every work reference on the way.
   *
   * Takes a "fetch this href and hand me a document" function rather than doing
   * any I/O itself, so the traversal - which is where the bugs live - can be
   * exercised without a browser or a network. That callback is asynchronous
   * because every real page load is, and pretending otherwise here would have
   * meant the first page was parsed synchronously while the rest were not.
   *
   * Stops on: no next link (the last page), the page cap, a page that fails to
   * load, or a next link pointing somewhere already visited. Each is a real way
   * this could otherwise run forever, and a runaway crawl of someone else's site
   * is not a failure mode worth shipping.
   */
  function collectPages(firstDoc, loadDoc, options) {
    var opts = options || {};
    var maxPages = opts.maxPages || 40;
    var works = [];
    var seenHrefs = {};
    var visited = {};
    var pagesFetched = 0;
    var stopped = "last-page";

    function absorb(doc) {
      var cards = doc.querySelectorAll(SELECTORS.card);
      for (var i = 0; i < cards.length; i++) {
        var href = cards[i].getAttribute("href");
        if (!href || seenHrefs[href]) continue;
        seenHrefs[href] = true;
        works.push({ href: href, card: cards[i] });
      }
    }

    function step(doc) {
      if (!doc) {
        stopped = "page-failed";
        return Promise.resolve();
      }
      pagesFetched++;
      absorb(doc);
      if (pagesFetched >= maxPages) {
        stopped = "page-cap";
        return Promise.resolve();
      }
      var next = nextPageHref(doc);
      if (!next) return Promise.resolve();
      if (visited[next]) {
        stopped = "loop";
        return Promise.resolve();
      }
      visited[next] = true;
      return Promise.resolve(loadDoc(next)).then(step);
    }

    return step(firstDoc).then(function () {
      return { works: works, pages: pagesFetched, stopped: stopped };
    });
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

  // 1.0 persisted a minSize/maxSize pair;1.1 derives both from one slider.
  // Leaving the old keys in place would let them overwrite the derived values
  // while the slider still showed the default, so the window on screen would not
  // match the control that is supposed to own it. Migrate the floor once, then
  // drop the keys: they are not user data worth preserving beyond that, since
  // nothing can edit them any more.
  if (!storedSettings.preferredSize) {
    storedSettings.preferredSize = preferredFromFloor(storedSettings.minSize);
  }
  delete storedSettings.minSize;
  delete storedSettings.maxSize;

  var settings = deepMerge(DEFAULTS, storedSettings);

  /**
   * Re-derive the size window from the slider.
   *
   * Called after anything that can change settings wholesale, so minSize and
   * maxSize can never disagree with preferredSize. They are kept as fields
   * because pickMagnet() and the detail panel both read them, and deriving them
   * at the point of use instead would spread this ratio across the file.
   */
  function applyPreferredSize() {
    var window_ = windowFromPreferred(settings.preferredSize);
    settings.minSize = window_.min;
    settings.maxSize = window_.max;
  }

  applyPreferredSize();

  /** The stored override for one field, or undefined if the default applies. */
  function overrideFor(engine, key) {
    var engineOverrides = (storedSettings.downloaders || {})[engine];
    return engineOverrides ? engineOverrides[key] : undefined;
  }

  function persist() {
    // settings.downloaders holds resolved values; persist only the sparse
    // overrides the user typed.
    //
    // preferredSize is stored, never minSize/maxSize: the window is derived from
    // it on load, so writing both would persist a redundant copy that can only
    // ever disagree with the control that owns it.
    writeStore({
      active: settings.active,
      filter: settings.filter,
      preferredSize: settings.preferredSize,
      downloaders: storedSettings.downloaders || {},
    });
  }

  function resetAll() {
    storedSettings = {};
    settings = deepMerge(DEFAULTS, {});
    applyPreferredSize();
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
          else {
            // The status rides on the error object rather than only inside the
            // message. Scraping it back out of the text works right up until
            // something rewrites the message - and an already-explained failure
            // being re-explained by a different layer is how a "banned for too
            // many logins" turned into "could not reach the host".
            var err = new Error(
              "HTTP " + res.status + " from " + url + ": " + String(res.responseText || "").slice(0, 160),
            );
            err.status = res.status;
            finish(err);
          }
        },
        onerror: function (res) {
          // transport records *how* the request died, which the HTTP status
          // cannot express. "never reached the server" and "the server took too
          // long" call for different responses, and only the first one is worth
          // retrying with different headers.
          var err = new Error(
            "network error reaching " + url + (res && res.status ? " (HTTP " + res.status + ")" : ""),
          );
          err.transport = "network";
          finish(err);
        },
        ontimeout: function () {
          var err = new Error("timed out reaching " + url);
          err.transport = "timeout";
          finish(err);
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

/**
 * Consecutive login failures tolerated before giving up on a batch.
 *
 * qBittorrent's web_ui_max_auth_fail_count defaults to 5 and its ban lasts an
 * hour, so a selection of 17 that keeps retrying a wrong password does not
 * merely fail - it locks the user out of their own client for an hour, from
 * their own machine. Three leaves margin under that default while still letting
 * a transient blip through. Measured from a default install, not guessed; see
 * spec/site.json.
 */
  var MAX_LOGIN_FAILURES = 3;

  var qbittorrent = {
    label: "qBittorrent",
    // The session cookie as "name=value", e.g. "QBT_SID_8082=abc". Kept across
    // calls so a batch of magnets costs one login rather than one per magnet.
    //
    // A cookie is not guaranteed: Set-Cookie is a forbidden header name for a
    // plain fetch and is not surfaced by every userscript manager. When none can
    // be read the request is still attempted without an explicit Cookie header
    // and the manager's own jar is relied on, rather than failing outright.
    _cookie: null,

    // A login in flight, so concurrent sends do not each start their own.
    _pendingLogin: null,

    // Consecutive login failures this page load, and the reason we stopped.
    _loginFailures: 0,
    _stoppedWarned: false,

    /**
     * Whether this manager tolerates us setting Origin and Referer.
     *
     * null   - not discovered yet; try with them, since that is what the client
     *         wants when it can be told
     * "set"  - they are accepted
     * "off"  - setting them makes the manager drop the request, so omit them
     *
     * Chrome treats both as forbidden header names, and managers differ: some
     * pass them through, some strip them silently, and some refuse the whole
     * call. A refusal looks exactly like a blocked @connect - a network error
     * with no status - so guessing wrong here would send the user chasing the
     * wrong fix. Discovering it at runtime removes the question.
     */
    _originMode: null,

    _base: function () {
      var cfg = settings.downloaders.qbittorrent;
      return origin(cfg.host, cfg.port);
    },

    /**
     * qBittorrent refuses any request carrying a cross-site Origin or Referer,
     * answering 401 with no explanation - and a privileged request inherits
     * exactly those from the page the userscript runs on. Its own documentation
     * says to set both to the client's own base URL, so every request here does.
     *
     * A cross-origin POST from a content script sends the *page's* Origin, which
     * is not the client's, and that is what made this fail against a stock
     * install rather than only against an unusual one.
     */
    _headers: function (extra, withOrigin) {
      var headers = {};
      var key;
      for (key in extra || {}) headers[key] = extra[key];
      if (withOrigin) {
        var base = qbittorrent._base();
        headers.Origin = base;
        headers.Referer = base + "/";
      }
      if (qbittorrent._cookie) headers.Cookie = qbittorrent._cookie;
      return headers;
    },

    _login: function (withOrigin) {
      var cfg = settings.downloaders.qbittorrent;
      var body = "username=" + encodeURIComponent(cfg.username) + "&password=" + encodeURIComponent(cfg.password);
      return request("POST", endpoint(cfg.host, cfg.port, "/api/v2/auth/login"), {
        headers: qbittorrent._headers({ "Content-Type": "application/x-www-form-urlencoded" }, withOrigin),
        body: body,
      }).then(
        function (res) {
          if (!loginAccepted(res.status, res.responseText)) {
            // A 2xx login carrying "Fails." is 4.x's way of saying the
            // credentials were wrong, not an IP ban - 4.x reports that as 403.
            throw explained(qbFailure(401, "login", qbittorrent._base()));
          }
          var cookie = parseSidCookie(res.responseHeaders);
          if (cookie) qbittorrent._cookie = cookie;
          return cookie;
        },
        function (err) {
          // statusOf() reads the code request() attached; a bare network error
          // has none, and the remedy for that is @connect rather than anything
          // on the server.
          var wrapped = explained(qbFailure(statusOf(err), "login", qbittorrent._base()));
          // Carried across the wrap. Without it the caller can no longer tell a
          // request that never left the browser from one the server refused, and
          // the header fallback below - which depends on exactly that
          // distinction - silently never runs.
          if (err && err.transport) wrapped.transport = err.transport;
          throw wrapped;
        },
      );
    },

    /**
     * Log in, falling back to omitting Origin/Referer if this manager refuses
     * the request when they are set.
     *
     * Only a transport failure triggers the retry. A 401 or a "Fails." means the
     * server answered, so the headers got through and retrying without them
     * would just be a second wrong answer.
     */
    _loginAdaptive: function () {
      if (qbittorrent._originMode === "off") return qbittorrent._login(false);
      return qbittorrent._login(true).catch(function (err) {
        // Only a *transport* failure means the request never got an answer, so
        // the headers are a plausible suspect. A 401 or a "Fails." means the
        // server did answer, so the headers arrived and retrying without them
        // would only produce a second wrong answer.
        if (!err || err.transport !== "network") throw err;
        return qbittorrent._login(false).then(
          function (value) {
            qbittorrent._originMode = "off";
            log(
              "This userscript manager refuses requests that set Origin/Referer, so " +
                "they are now omitted. qBittorrent still accepted the login.",
              "wa",
            );
            return value;
          },
          function () {
            // Report the original: if both attempts failed the likelier cause is
            // still whatever stopped the first one, such as a blocked host.
            throw err;
          },
        );
      });
    },

    /**
     * One login per page load, however many magnets are sent.
     *
     * Split out from _login so concurrent sends share a single request; a batch
     * of ten used to mean ten logins, and qBittorrent bans an IP after a handful
     * of consecutive failures.
     */
    _ensureSession: function () {
      if (qbittorrent._cookie) return Promise.resolve(qbittorrent._cookie);
      if (qbittorrent._loginFailures >= MAX_LOGIN_FAILURES) {
        // Explain the stop once, then stay quiet. Repeating a paragraph for
        // every remaining item buries the log - and buries the *first* failure,
        // which is the one that says what is actually wrong.
        var detail =
          "Stopped after " + qbittorrent._loginFailures + " failed logins. qBittorrent " +
          "bans an IP for an hour after a handful of consecutive failures, so " +
          "continuing would lock you out of your own client. Fix the cause " +
          "above, then use Test connection in Settings.";
        var message = qbittorrent._stoppedWarned ? "skipped - not attempted." : detail;
        qbittorrent._stoppedWarned = true;
        return Promise.reject(explained(message));
      }
      if (!qbittorrent._pendingLogin) {
        var attempt = qbittorrent._loginAdaptive();
        // Cleared whether the login succeeded or failed: keeping a rejected
        // promise cached would make every later send replay the same failure
        // with no chance to recover after the user fixes their password.
        qbittorrent._pendingLogin = attempt.then(
          function (value) {
            qbittorrent._loginFailures = 0;
            qbittorrent._pendingLogin = null;
            return value;
          },
          function (err) {
            qbittorrent._loginFailures++;
            qbittorrent._pendingLogin = null;
            throw err;
          },
        );
      }
      return qbittorrent._pendingLogin;
    },

    /**
     * Forget what the last run learned, so a corrected setting gets a clean try.
     *
     * A stale cookie or a stale header mode would otherwise keep reproducing the
     * failure that produced it, which is the most confusing kind of bug to
     * diagnose: fix the setting, press Test connection, get the same error.
     */
    reset: function () {
      qbittorrent._cookie = null;
      qbittorrent._pendingLogin = null;
      qbittorrent._loginFailures = 0;
      qbittorrent._stoppedWarned = false;
      qbittorrent._originMode = null;
    },

    _api: function (method, path, extra, body) {
      var cfg = settings.downloaders.qbittorrent;
      return qbittorrent._ensureSession().then(function () {
        // Read after the session resolves, not before. The login is what
        // discovers whether this manager tolerates the headers, so a value
        // captured earlier is stale for the very first call - which made the
        // fallback look broken: the login succeeded, then the call after it
        // repeated the same refused request.
        return request(method, endpoint(cfg.host, cfg.port, path), {
          headers: qbittorrent._headers(extra, qbittorrent._originMode !== "off"),
          body: body,
        });
      });
    },

    _decode: function (res) {
      return res && res.responseText ? String(res.responseText).trim() : "";
    },

    probe: function () {
      // A probe is the one call that should not inherit anything from an earlier
      // batch: the user is asking "can I reach this right now", and a stale
      // cookie or a stale header mode would answer about the past instead.
      qbittorrent.reset();
      return qbittorrent._api("GET", "/api/v2/app/version").then(
        function (res) {
          return (
          "qBittorrent " + qbittorrent._decode(res) +
          (qbittorrent._originMode === "off" ? " (no Origin/Referer)" : "")
        );
        },
        function (err) {
          // A login failure arrives here too, already carrying the right
          // explanation. Replacing it would send the user chasing @connect for
          // what is really a wrong password.
          if (err && err.explained) throw err;
          throw explained(qbFailure(statusOf(err), "request", qbittorrent._base()));
        },
      );
    },

    send: function (magnet) {
      var cfg = settings.downloaders.qbittorrent;
      var body = "urls=" + encodeURIComponent(magnet.uri);
      if (cfg.savePath) body += "&savepath=" + encodeURIComponent(cfg.savePath);
      if (cfg.category) body += "&category=" + encodeURIComponent(cfg.category);
      return qbittorrent._api("POST", "/api/v2/torrents/add", {
        "Content-Type": "application/x-www-form-urlencoded",
      }, body).then(
        function () {
          return "added";
        },
        function (err) {
          if (err && err.explained) throw err;
          throw explained(qbFailure(statusOf(err), "request", qbittorrent._base()));
        },
      );
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
        // Marked so the caller can tell a failure to read the *site* from a
        // failure to reach the *client*. Both arrive as a bare Error on the same
        // log line otherwise, and they have nothing in common: one is jav8.vip
        // being slow or rate-limiting, the other is the download client being
        // unreachable. Acting on the wrong one wastes the user's time.
        var wrapped = new Error(err && err.message ? err.message : String(err));
        wrapped.fromSite = true;
        throw wrapped;
      });
    return detailCache[href];
  }

  // -------------------------------------------------------------------- UI
  var STYLE_ID = "jav8-dl-style";
  var CSS = `
.jd-box{position:absolute;top:4px;left:4px;z-index:40;width:24px;height:24px;
  border-radius:5px;background:rgba(10,14,18,.86);border:1px solid rgba(255,255,255,.55);
  box-shadow:0 1px 4px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;
  cursor:pointer;opacity:.62;transition:opacity .12s,background .12s}
.jd-box:hover{opacity:1}
.jd-box.on{opacity:1;background:#2b6cb0;border-color:#63b3ed}
.jd-box input{width:17px;height:17px;margin:0;cursor:pointer;accent-color:#63b3ed}
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
.jd-row select,.jd-row input:not(.jd-slider){flex:1;min-width:0;background:#2b2d30;color:#fff;
  border:1px solid #474747;border-radius:3px;padding:3px 5px;font-size:11px}
/* The slider fills its own row: it needs the width, and a text-sized input
  style would leave it unusably narrow inside a 264px panel. */
.jd-sizerow{align-items:flex-start}
.jd-sizewrap{flex:1;min-width:0}
.jd-slider{display:block;width:100%;margin:2px 0 1px;accent-color:#2f6feb;cursor:pointer}
.jd-sizeout{display:block;font-size:10px;color:#7f8c99;text-align:center;
  font-variant-numeric:tabular-nums}
.jd-bulk{display:flex;gap:6px;margin:8px 0 0}
.jd-bulk .jd-btn{flex:1;padding:3px 6px;font-size:10.5px}
/* Performer tiles are small and image-led, so the button has to stay out of the
   way until wanted - visible on hover, but never invisible. */
.jd-allof{position:absolute;top:3px;right:3px;z-index:41;width:22px;height:22px;
  display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer;
  font:600 14px/1 -apple-system,Segoe UI,Roboto,sans-serif;color:#fff;
  background:rgba(12,16,20,.8);border:1px solid rgba(255,255,255,.5);border-radius:4px;
  opacity:.55;transition:opacity .12s,background .12s}
.actress:hover .jd-allof{opacity:1}
.jd-allof:hover{background:#2b6cb0;border-color:#63b3ed}
.jd-allof[disabled]{opacity:.35;cursor:progress}
.jd-career{margin:7px 0 0}
.jd-career .jd-btn{width:100%;padding:5px}
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

  /**
   * Read a work's code, title and VR flag out of a card from any document.
   *
   * Takes the card rather than an href because the collected pages arrive as
   * detached parsed documents, where nothing can be looked up by id. VR is
   * re-derived from that card's own code and title rather than assumed from the
   * performer, so the same isVr() decides everywhere.
   */
  function workInfoFromCard(card) {
    return card ? cardInfo(card) : { code: "", title: "", vr: false };
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
      requestBulkRefresh();
    });
    box.classList.toggle("on", input.checked);
    card.appendChild(box);

    if (info.vr) {
      var badge = el("span", "jd-badge vr", "VR");
      card.appendChild(badge);
    }
  }

  /**
   * Does this card survive the current VR filter?
   *
   * One predicate for both hiding cards and for the page-wide buttons, so
   * "select all" cannot quietly disagree with what the filter is showing. When
   * those were separate, selecting all with a filter applied ticked the hidden
   * cards too - the count then claimed more than the user could see, and
   * switching the filter back revealed ticks they had never asked for.
   */
  function matchesFilter(card) {
    var info = known.get(card.getAttribute("href"));
    if (!info) {
      // Not in `known` yet: a card from a crawled page that has not been
      // recorded. Derive it from the card itself rather than assuming it
      // passes, or a VR filter would quietly admit everything crawled.
      info = workInfoFromCard(card);
      if (card.getAttribute("href")) known.set(card.getAttribute("href"), info);
    }
    return (
      settings.filter === "all" ||
      (settings.filter === "vr" && info.vr) ||
      (settings.filter === "non-vr" && !info.vr)
    );
  }

  function applyFilter() {
    var hidden = 0;
    worksOnPage().forEach(function (card) {
      var info = known.get(card.getAttribute("href"));
      if (!info) return;
      var show = matchesFilter(card);
      card.style.display = show ? "" : "none";
      if (!show) hidden++;
    });
    updateCount(hidden);
    // The buttons carry the filtered count in their label, so they are part of
    // what the filter changes - not just what decorates it.
    requestBulkRefresh();
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

  /**
   * Cards this page can actually queue.
   *
   * worksOnPage() alone is not enough: it also returns cards that decorateCard()
   * has not reached yet, and ticking those by writing to .jd-box would silently
   * do nothing.
   */
  function selectableCards() {
    return worksOnPage().filter(function (card) {
      // Only what the user can currently see. Filtering on the marker keeps
      // this in step with decoration; filtering on matchesFilter() is what makes
      // the buttons honour the VR filter rather than reaching past it.
      return card.dataset.jdDone === "1" && matchesFilter(card);
    });
  }

  /**
   * Apply one selection state to every eligible card.
   *
   * Driven from the card list rather than from a click handler per checkbox so
   * that it cannot disagree with `selected` however many cards there are, and so
   * the visible state and the model are always updated together.
   */
  function setPageSelection(on) {
    var cards = selectableCards();
    cards.forEach(function (card) {
      var href = card.getAttribute("href");
      if (on) selected.add(href);
      else selected.delete(href);
      var box = card.querySelector(".jd-box");
      if (!box) return;
      var input = box.querySelector("input");
      if (input) input.checked = on;
      box.classList.toggle("on", on);
    });
    // Both, not just the button state: the count is the only place the total is
    // reported, and a select-all that ticked 17 cards while still saying
    // "Selected 0" would be a straight contradiction on screen.
    updateCount();
    requestBulkRefresh();
    return cards.length;
  }

  // ---------------------------------------------- performer links, site-wide
  /**
   * The performer's name from a link to her page.
   *
   * Two shapes exist on the site: the performer index wraps the name in
   * <p class="actress-name">, while a work page renders it as a bare text node
   * beside the avatar with no element to read. Reading only the first would
   * label every button "this performer" on exactly the pages most likely to be
   * browsed, which is how the feature would have looked broken on arrival.
   */
  function actressTileName(tile) {
    var named = tile.querySelector(SELECTORS.actressName);
    if (named && named.textContent.trim()) return named.textContent.trim();
    // textContent skips the <img>, so the avatar contributes nothing here.
    return (tile.textContent || "").replace(/\s+/g, " ").trim();
  }

  /**
   * Crawl a performer's pages and hand back everything matching the filter.
   *
   * One crawl, two callers. The button on a performer link stages the result and
   * lets the user press Download selected; the panel button on her own page
   * sends it immediately, because being on her page is already the decision.
   * Splitting this into two functions once left the pagination rules, the filter
   * pass and the error wording duplicated - free to drift, and only the less-used
   * copy would get tested - so the traversal lives here once and the caller
   * supplies only what it does with the answer.
   *
   * The VR filter is applied by the same matchesFilter() the listings use, and
   * the size preference by pickMagnet() later, rather than a second copy of
   * either rule here.
   */
  function crawlActress(href, name, button, onCollected) {
    var label = name || href;
    if (button) button.disabled = true;
    log("Collecting works for " + label + "…", "mu");

    function parse(html) {
      return new DOMParser().parseFromString(html, "text/html");
    }

    function loadPage(pageHref) {
      return getText(new URL(pageHref, location.origin).href)
        .then(parse)
        .catch(function () {
          // A page that will not load ends the crawl and keeps what was already
          // found. Failing the whole thing would throw away a hundred collected
          // works over one bad request.
          return null;
        });
    }

    getText(new URL(href, location.origin).href)
      .then(parse)
      .then(function (firstDoc) {
        return collectPages(firstDoc, loadPage);
      })
      .then(function (result) {
        var hrefs = [];
        result.works.forEach(function (work) {
          // Recorded even when filtered out, so switching the filter afterwards
          // does not show a stale count for works already collected.
          known.set(work.href, workInfoFromCard(work.card));
          if (matchesFilter(work.card)) hrefs.push(work.href);
        });
        onCollected(hrefs, result, button, label);
      })
      .catch(function (err) {
        if (button) button.disabled = false;
        log(label + ": could not read her works page - " + (err.message || err), "er");
      });
  }

  /** How many pages a crawl walked, phrased for a log line. */
  function pagesPhrase(pages) {
    return pages + (pages === 1 ? " page" : " pages");
  }

  /** Warn about a crawl that stopped early, whatever the caller intended. */
  function warnIfTruncated(result, where, tail) {
    if (result.stopped === "page-cap") {
      log("Stopped at the " + where + " limit; some works were not seen. " + tail, "wa");
    } else if (result.stopped === "page-failed") {
      log("Stopped early - a page would not load. " + tail, "wa");
    }
  }

  /**
   * Outcome for the performer-link button: stage, and let the user confirm.
   *
   * Staged because reaching a performer through a link on some other page is an
   * exploratory act, and a career can be a hundred works. Sending a hundred
   * magnets on a single click is not a reasonable thing to do by accident.
   */
  function stageCollected(hrefs, result, button, label) {
    hrefs.forEach(function (href) {
      selected.add(href);
    });
    updateCount();
    requestBulkRefresh();
    if (button) button.disabled = false;

    if (!result.works.length) {
      log(label + ": no works found on any page.", "wa");
      return;
    }
    var where = pagesPhrase(result.pages);
    warnIfTruncated(result, where, "The works found so far are queued.");
    if (!hrefs.length) {
      log(label + ": " + result.works.length + " works found, but none match " + filterScope() + ".", "wa");
      return;
    }
    log(
      label + ": " + hrefs.length + " of " + result.works.length + " works queued (" +
        filterScope() + ", from " + where + "). Press Download selected to send them.",
      "ok",
    );
  }

  /**
   * Put a "queue her whole career" button on every link to a performer.
   *
   * Site-wide rather than only on /top-actresses: the links appear on work
   * pages, listings and searches, and that is where the decision "do I want
   * everything she has" is actually made. Gating this on one route meant the
   * button existed on the one page least likely to prompt its use.
   *
   * The tile is an <a>, so the button needs the same treatment as a cover tick:
   * the click must not reach the anchor, or the user lands on her page instead
   * of queueing her.
   */
  function decorateActressTiles() {
    var tiles = document.querySelectorAll(SELECTORS.actressTile);
    if (!tiles.length) return false;
    if (!document.getElementById("jd-actress-style")) {
      var style = document.createElement("style");
      style.id = "jd-actress-style";
      // Applied to every performer link, not just the ones inside .actresses, because
      // the button now appears wherever the site links to a performer.
      style.textContent = "a.actress{position:relative}";
      document.head.appendChild(style);
    }

    for (var i = 0; i < tiles.length; i++) {
      (function (tile) {
        if (tile.dataset.jdActress === "1") return;
        tile.dataset.jdActress = "1";
        var name = actressTileName(tile);
        var href = tile.getAttribute("href");

        var btn = el("button", "jd-allof", "＋");
        btn.type = "button";
        // Retitled whenever the filter changes: the promise this button makes is
        // filter-dependent, and a stale tooltip is a promise the script breaks.
        btn._retitle = function () {
          btn.title =
            "Queue every work on " + (name || "her") + "'s pages (" +
            filterScope() + "), following pagination. " +
            "Nothing is sent until you press Download selected.";
        };
        btn._retitle();
        btn.setAttribute("aria-label", "Queue all works by " + (name || "this performer"));

        btn.addEventListener("click", function (event) {
          // stopPropagation only: preventDefault() here would cancel the button.
          event.preventDefault();
          event.stopPropagation();
        });
        ["mousedown", "mouseup", "auxclick", "contextmenu", "keydown"].forEach(function (type) {
          btn.addEventListener(type, function (event) {
            event.stopPropagation();
          });
        });
        btn.addEventListener("click", function () {
          crawlActress(href, name, btn, stageCollected);
        });
        tile.appendChild(btn);
      })(tiles[i]);
    }
    return true;
  }

  // ------------------------------------------------- performer: career crawl
  /** The performer's own page, with any ?page=N stripped. */
  function isActressWorksPage() {
    return /^\/actress\/\d+/.test(location.pathname);
  }

  /**
   * Her base URL, always page 1.
   *
   * Stripping the query is the whole point: arriving on page 4 of a career must
   * not mean starting the crawl at page 4. Without this the button would
   * collect the last page and call it her filmography.
   */
  function actressBasePath() {
    return location.pathname.replace(/\/+$/, "");
  }

  function performerName() {
    var el = document.querySelector("h1.actress-title");
    return el ? el.textContent.trim() : "";
  }

  /**
   * Outcome for the panel button: send immediately.
   *
   * Being on her page is already the decision, so there is nothing to confirm -
   * which is also why this differs from the link button's staging. The traversal
   * is shared; only the ending is not.
   */
  function sendCollected(hrefs, result, button, label) {
    if (!result.works.length) {
      button.disabled = false;
      log(label + ": no works found on any page.", "wa");
      return;
    }
    var where = pagesPhrase(result.pages);
    warnIfTruncated(result, where, "Sending what was found.");
    if (!hrefs.length) {
      button.disabled = false;
      log(label + ": " + result.works.length + " works found, but none match " + filterScope() + ".", "wa");
      return;
    }
    log(
      label + ": sending " + hrefs.length + " of " + result.works.length +
        " works (" + filterScope() + ", from " + where + ").",
      "mu",
    );
    // The button stays disabled for the duration; sendHrefs re-enables it.
    sendHrefs(hrefs, button);
  }

  /**
   * Add the career button to the panel, on her works page only.
   *
   * Lives in the panel rather than on the page because the page already has a
   * per-card tick, and a second floating control per performer would compete
   * with it. It is panel-scoped for the same reason the size slider is.
   */
  function addCareerButton(body) {
    if (!isActressWorksPage() || body.querySelector(".jd-career")) return;
    var name = performerName();
    var row = el("div", "jd-career");
    var btn = el("button", "jd-btn", "All works");
    btn.type = "button";
    // Retitled with the filter, for the same reason the performer tiles are:
    // the promise this button makes depends on which filter is set, and a
    // tooltip that still says "all works" after switching to VR only is a
    // promise the script breaks.
    btn._retitle = function () {
      btn.title =
        "Send every work on " + (name || "this performer") + "'s pages, following " +
        "pagination from page 1 - not just the page you are on. Applies the " +
        filterScope() + " filter and your size preference. This starts sending " +
        "immediately; there is no confirmation step.";
    };
    btn._retitle();
    btn.addEventListener("click", function () {
      crawlActress(actressBasePath(), name, btn, sendCollected);
    });
    row.appendChild(btn);
    body.appendChild(row);
  }

  /**
   * The label the current filter puts in front of a count.
   *
   * Pure data so the panel cannot describe a filter differently from the one
   * matchesFilter() is actually applying. `all` reads as a noun phrase on its
   * own, which is why it is not "all only".
   */
  var FILTER_LABEL = { all: "all works", vr: "VR only", "non-vr": "non-VR only" };

  /** The filter as a scope, for a sentence. */
  function filterScope() {
    return FILTER_LABEL[settings.filter] || FILTER_LABEL.all;
  }

  /**
   * What the page-wide buttons are about to act on, as a noun phrase.
   *
   * Separate from filterScope() because the two read differently in place: "29
   * of 29 works queued (VR only)" versus "Tick all 3 VR-only works on this
   * page". Squeezing one string into both positions produced "Tick all 17 on
   * this page", which named no thing at all.
   */
  function countScope() {
    return settings.filter === "all"
      ? "works on this page"
      : (settings.filter === "vr" ? "VR-only" : "non-VR-only") + " works on this page";
  }

  /**
 * Ask the work page's magnet list to re-mark its pick.
 *
 * Separate from requestBulkRefresh() because they answer to different controls:
 * the buttons follow the VR filter, this follows the size preference.
 */
  function requestMagnetRefresh() {
    var rows = document.querySelector(".jd-magnet-rows");
    if (rows && rows._repick) rows._repick();
  }

  /** Ask the panel to redraw the page-wide buttons, if it has been built yet. */
  function requestBulkRefresh() {
    var bulk = document.querySelector(".jd-bulk");
    if (bulk && bulk._refresh) bulk._refresh();
    // The performer tiles and the career button describe the filter too, and both
    // were written once at build time - so without this they keep promising
    // "all works" after the user switches to VR only.
    document.querySelectorAll(".jd-allof, .jd-career .jd-btn").forEach(function (btn) {
      if (btn._retitle) btn._retitle();
    });
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
    // Preferred size. One slider replaces the old Min and Max boxes: the floor
    // and ceiling are derived from this single number (see SIZE_WINDOW_RATIO),
    // so there is no way for the two to disagree or to be set into an inverted
    // window - the old inputs could be, and silently swapped themselves on save.
    var r3 = el("div", "jd-row jd-sizerow");
    var sizeLabel = el("label", null, "Size");
    sizeLabel.htmlFor = "jd-size-slider";
    r3.appendChild(sizeLabel);
    var sizeWrap = el("div", "jd-sizewrap");
    var slider = el("input", "jd-slider");
    slider.type = "range";
    slider.id = "jd-size-slider";
    slider.min = "0";
    slider.max = String(SIZE_LADDER.length - 1);
    slider.step = "1";
    slider.value = String(preferredIndex(settings.preferredSize));
    sizeWrap.appendChild(slider);
    var sizeOut = el("span", "jd-sizeout");
    sizeWrap.appendChild(sizeOut);
    r3.appendChild(sizeWrap);
    body.appendChild(r3);

    function paintSize() {
      var preferred = preferredAtIndex(slider.value);
      settings.preferredSize = preferred;
      applyPreferredSize();
      var window_ = windowFromPreferred(preferred);
      // The readout states the window, because the slider controls something
      // abstract: without the derived numbers there is no way to tell that
      // moving one stop shifts both bounds.
      sizeOut.textContent =
        formatSize(preferred) + " · " + formatSize(window_.min) + "–" + formatSize(window_.max);
      slider.title =
        "Preferred size " + formatSize(preferred) +
        "; picks releases between " + formatSize(window_.min) + " and " + formatSize(window_.max) +
        ". Within that, the release closest to " + formatSize(preferred) + " wins.";
      // On a work page the panel highlights the magnet it would send, so the
      // highlight has to move with the control that decides it. Without this the
      // panel asserts a specific release while the slider sits somewhere else.
      requestMagnetRefresh();
    }
    slider.addEventListener("input", paintSize);
    slider.addEventListener("change", function () {
      paintSize();
      persist();
    });
    paintSize();

    var count = el("div", "jd-count");
    body.appendChild(count);

    // Page-wide selection. Scoped to this page on purpose: `selected` is keyed by
    // href and is cleared per navigation, so "all" can only ever mean the works
    // in front of the user.
    var bulk = el("div", "jd-bulk");
    var selectAll = el("button", "jd-btn ghost", "Select all");
    selectAll.type = "button";
    var deselectAll = el("button", "jd-btn ghost", "Deselect all");
    deselectAll.type = "button";

    /**
     * Spell out what the buttons will act on, and how many.
     *
     * A button that says "Select all" while a filter is hiding two thirds of the
     * page is asking to be misunderstood. The count moves with the filter, so
     * the label is the confirmation.
     */
    function refreshBulkButtons() {
      var cards = selectableCards();
      var total = worksOnPage().filter(function (card) {
        return card.dataset.jdDone === "1";
      }).length;
      var scoped = countScope();
      selectAll.textContent = cards.length ? "Select all (" + cards.length + ")" : "Select all";
      selectAll.title = cards.length
        ? "Tick all " + cards.length + " " + scoped + (total > cards.length ? " (of " + total + " works)" : "")
        : "Nothing to select";
      deselectAll.title = "Untick the " + cards.length + " " + scoped;
      selectAll.disabled = !cards.length;
      deselectAll.disabled = !cards.length;
    }

    // Exposed so the rest of the script can refresh the labels when the filter
    // or the card list changes, without buildPanel() having to own that.
    bulk._refresh = refreshBulkButtons;

    function reportPageSelection(on) {
      // Guarded rather than assumed: a listing that renders after the panel is
      // built has no cards to act on, and claiming "selected 34" would be a lie
      // the count would immediately contradict.
      var touched = setPageSelection(on);
      if (!touched) {
        log(on ? "No works match the current filter." : "Nothing to deselect.", "wa");
      }
    }

    selectAll.addEventListener("click", function () {
      reportPageSelection(true);
    });
    deselectAll.addEventListener("click", function () {
      reportPageSelection(false);
    });
    bulk.appendChild(selectAll);
    bulk.appendChild(deselectAll);
    body.appendChild(bulk);

    // Her whole career, from whichever page of it the user happens to be on.
    addCareerButton(body);
    // Disabled from the outset: a work page has no cards at all, and decorateAll()
    // - the only other caller of refreshBulkButtons() - never runs there. Without
    // this they sit enabled next to an empty grid and do nothing when clicked.
    selectAll.disabled = true;
    deselectAll.disabled = true;

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
  /**
   * Send a list of works to the client, one at a time.
   *
   * Shared by "Download selected" and the performer career button so both take
   * exactly the same path: the same size window, the same VR-derived pick, the
   * same site-vs-client error labelling, and the same one-login-per-batch
   * behaviour the qBittorrent ban guard depends on. Two copies of this would
   * drift, and the drift would only show up on whichever path was tested less.
   *
   * Sequential on purpose - it is gentler on the site, and one torrent client
   * does not benefit from being hit in parallel.
   */
  function sendHrefs(hrefs, button) {
    var target = engine();
    if (button) button.disabled = true;
    log("Sending " + hrefs.length + " to " + target.label + "…", "mu");

    var queue = hrefs.slice();
    var failures = 0;
    var sent = 0;

    // Say which of the two systems failed. Reading the site and talking to the
    // client are independent steps; a bare error message does not reveal which
    // one broke, and the fixes are unrelated.
    function describe(err) {
      var reason = err && err.message ? err.message : String(err);
      return err && err.fromSite
        ? "could not read this page from jav8.vip: " + reason
        : reason;
    }

    function next() {
      if (!queue.length) {
        if (button) button.disabled = false;
        log(
          (sent ? "Sent " + sent + " of " + hrefs.length + ". " : "") +
            (failures ? "Done with " + failures + " failure(s)." : "All done."),
          failures ? "wa" : "ok",
        );
        return;
      }
      var href = queue.shift();
      var label = (known.get(href) || {}).code || href;
      fetchMagnets(href)
        .then(function (detail) {
          var picked = pickMagnet(detail.magnets, settings.minSize, settings.maxSize, settings.preferredSize);
          if (!picked.magnet) {
            failures++;
            log(label + ": " + (picked.reason === "ads-only" ? "only advert magnets" : "no magnets on this page"), "er");
            return;
          }
          if (picked.reason === "outside-window") {
            log(label + ": " + formatSize(picked.magnet.size) + " is outside your size window", "wa");
          }
          return target.send(picked.magnet).then(
            function (result) {
              sent++;
              log(label + " → " + result + "  (" + formatSize(picked.magnet.size) + ")", "ok");
            },
            function (err) {
              failures++;
              log(label + ": " + describe(err), "er");
            },
          );
        })
        .catch(function (err) {
          failures++;
          log(label + ": " + describe(err), "er");
        })
        .then(next);
    }
    next();
  }

  function runSelection(button) {
    if (!selected.size) {
      log("Nothing ticked yet.", "wa");
      return;
    }
    sendHrefs(Array.from(selected), button);
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

        var picked = pickMagnet(detail.magnets, settings.minSize, settings.maxSize, settings.preferredSize);

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
            row.dataset.jdUri = magnet.uri;

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

        /**
         * Re-mark which magnet would be sent, without re-fetching anything.
         *
         * The list is built once, so moving the size slider used to leave the
         * highlight on whatever was picked at load time. That is worse than a
         * missing feature: the panel claimed a specific release "would be
         * chosen" while the control that decides it had moved underneath.
         */
        rows._repick = function () {
          var now = pickMagnet(detail.magnets, settings.minSize, settings.maxSize, settings.preferredSize);
          Array.prototype.forEach.call(rows.children, function (row) {
            row.classList.toggle("pick", !!(now.magnet && row.dataset.jdUri === now.magnet.uri));
          });
          var note = box.querySelector(".jd-window-note");
          if (note) {
            note.textContent = now.reason === "outside-window"
              ? "No magnet fell inside " + formatSize(settings.minSize) + "–" +
                formatSize(settings.maxSize) + "; the largest real one was used."
              : "";
            note.style.display = now.reason === "outside-window" ? "" : "none";
          }
        };
        rows._repick();
        // The panel may not exist yet when this page was decorated first.
        requestMagnetRefresh();

        if (picked.reason === "outside-window") {
          var note = el(
            "div",
            "jd-wa jd-window-note",
            "No magnet fell inside " +
              formatSize(settings.minSize) +
              "–" +
              formatSize(settings.maxSize) +
              "; the largest real one was used.",
          );
          box.appendChild(note);
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
    // Cards are only decorated now, so this is the first point at which the
    // page-wide buttons have anything to act on.
    requestBulkRefresh();
    return true;
  }

  function init() {
    if (!isTargetHost(location.hostname)) return;
    injectStyle();
    buildPanel();

    // Every link to a performer gets a crawl button, on every route. This runs
    // before the work-page and listing branches below so that a performer named
    // on a work page gets one too - which is where the link mostly appears.
    if (!decorateActressTiles()) {
      // Some routes render their content client-side; try once more.
      setTimeout(function () {
        decorateActressTiles();
      }, 1200);
    }

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
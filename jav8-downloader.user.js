// ==UserScript==
// @name         JAV8 Downloader
// @namespace    https://github.com/mino29/jav8-dl
// @homepage     https://github.com/mino29/jav8-dl
// @version      1.11.1
// @icon          data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAAAXNSR0IArs4c6QAAAFBlWElmTU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAANaADAAQAAAABAAAANQAAAAD1pCHuAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgoZXuEHAAAGoklEQVRoBe1aa2wUVRQ+d2a23W1pd7u7RV5VoQ8TQxR+iBLRGiUh/tAAAgYSI6I8EjBRIuKDkrULfyTxETThETAaHwRE/dMQgjEQCz8IllCVAqVWpAEMfb/2OXM9Z7q7nRl22WV2dmNJJ5nee+6cx/3uufPtnXsLoVBoB96HotHoYs55AdwFl4BXJ+KYIyvK4Ugk8m84HN6DZS0CZGMaHwEgIAQI755QOMwxe1cpiyjPGtPgqPM0BWkq0pREQKEYwBYE/R4+q7wbAJYisJV4H1PBYQax3oj3BgQ48W4AOJHA4H2GAGIZwuw9M+aBxQHQNMTp2UIAsT62CSUOikr1vcOMUalt/z/UU47yQc7F5tbOrxlnc6mjtU6hwi0xWdvpqmKHRPLloUBU256LektA6b8wzAfJN2Psg/oazxep4qQERQbb/x6aHIwGfuMKn1wiMnjWKUCBxqJQFGFKkQN6g2HoiYRTxci6vSMCyvF+WSBHCOhwfZVnKZY8lWNVMdXD9+8vvi6KbDEDFhmQOZwYUHSqIVmGkKxwl/3OFiIMolAc2Qeu4BooDW0FSbmo86sV+nFuNA4ocUDnRadn5e0Aka1m3LWu9PUtl26uxZZd1PqAncEjxaNjYSZb7qFlUKj8nAjCoRC6iw5BWJyXaKNKGHNxpE8BGlBMUXchSHPqql1tOqUkwmjvkjyMN22rKd8NTNhL8sUgB5oO8WeUrcFIBDLNliP6ow4Q+WEQAmfw7bjLRHlqMAGIC8BWZAKIjDMCRYoVVe71OFqnqE7ToUtDDT3hCDVDmS39NLTJZ1Vd4x9JuYDgRp02BxTooFThhW/PO/XVnqNGm1RyxqDWMhZx2BxLENjVKOfQiKMYiwlRRUlkSxJu71IW7kvaF0UoBw4qmaozoXl4BBAqH/DXeD9MapSi8fY9MBgRcUgSW8YYBI3EkchWgc1gpRcDtiVAAIzXoO0NtUlLDNjQLLm8q4266eSMiMLoZOulrlcUUPZTOxHHozEFp8uuvltXbvQbTXSyyNuhhL0LNjiHL6cHhvkqCLBVEGYKNISFBDFg1mf7Kt3/6IwzEEyBIr91rZ07cYm0QUBmemlnBzjPDQJziFDy7SyI/jkAw1suZRBer9L06mRonOcipuMSg/m+Ku8veo3MpDuaflqX06o8GzH4cQV/lA+unQpRrw14AH+3vrkGtsfdID5UqlVPW7/2dNkIINTkwN4yC4gCmQZFxCEVFywl4gg4BGh4vQIUuwChn26AciMIjtUVaYHEFYZqiuCHFffERPbl9mrPR/FnZkrToCiYb0pppyTwxUQcV+4thFNrpuJKl0NwfweIM0vANrcsbZ8ow9+vnwqUceT0JsnmWZfWKI1CVqDIt6+y/Axmi1Yc0DR7ArQ974XIsU5Q2ofBni5b+OJQhvtKkcoZ3JQEcZFvOguSr2yurEFRcH+V9ytBhI+p3rCoHPoengDBvVdBmF4EtgVeak56Nb08CSjDtLZkoviCGaZL5tgSUOR45gzvJiYwdUFHxBFoHQT5jwGwr5wGgBkxXlpiwDd7o3+G+1ejjlnZMlD4iyyLRQXL8fvrSpw4ApStSXYoXDhJ1z8jMWCmP9MpZClYBor6QcQBkvAc5mWIptWJp5wQOdkNtlp3opt6YmCnrSCGhPNYxVJQ5NNf6f4d3w91aUPEcbalDwbfPD8STkMMOFWv41pyoRXEEMOSKCwHRZ7rK93f4c7vDqofne+GHiQOurTEAILwIq0l1QcW/7n1DbYoAO1xnLvc1cA4X+DAz4gnT/aqAGPu16nfaBbFMrrJGSgK5GvvceFu0xlc94zu7OLH5rZqzxpjR6yUczL94h30TS/rZfiDSsShtjF2Wv3YjCvkqMwpKOozEQdud6o7KwLwI7RmzBGWhNucg0pEymNlHFQeBzurUOOZymr48mg8nqk8DnZWocYzldXw5dF4PFN5HOysQo1nKqvhy6NxzjPla+96DPGo27UKsFrftf7Ue2YWAc/ZR+LIB6KC50r8NfzfoNE4eMyJ+3yb66vc+9Kd3ZrFOBrMrIckdlvbupcrivwpfvHeehAV18dTSQnYal+1J7YrE3+QfWkpKH9rb2UQop/TvkQmXaOdWdye3SFKHr+Vu0qWgNrNua3jctcmnGp1eHJqzwSQTodBmwDC+js519XZG4SsQdX91f0EyMouPIB70ODbjHjAUVC0MdutM9OgUhKBGSgaGySPPhygzf5q7x6zRGIKFGWHy/IneP6Smgg0HTVV5fyk2az9B+oZomKJHfTiAAAAAElFTkSuQmCC
// @description  Tick covers to queue them, filter by VR, prefer uncensored / subtitled / 4K releases, send to aria2 or qBittorrent, and play or skip whatever your Jellyfin or Emby library already holds. Settings live in the browser, not in a config file.
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
 * Release-tag note, counted across 783 magnets from 80 work pages rather than
 * inferred from how these tags usually look:
 *
 * - There is no `-CN` on this site (0 of 783) and no `無修正` (0). It writes
 *   `-C` and simplified `无码`. A rule for either absent flag could only ever
 *   fire on a page nobody has seen, which is not a feature.
 * - `-U` *or* `-UC` is how uncensored is written, and the two spellings barely
 *   overlap - `-U` with `无码` on 5 of 736 releases, `-C` with `中文字幕` on
 *   none. They are conventions of different uploaders, so matching one spelling
 *   matches about half of what it appears to.
 * - Only ~14% of releases carry any tag, which is why a tag preference relaxes
 *   instead of blocking: a rule that skipped untagged works would skip six
 *   releases in seven.
 * - The sample matters more than its size. A first pass over /updated and
 *   /latest found *none* of these flags in 149 magnets, because those listings
 *   are dominated by one streamer's uploads. Actress filmographies are where
 *   catalogue releases live.
 *
 * Jellyfin / Emby note, and why the matching key looks the way it does:
 *
 * - The integration is driven by the code, not the title. A listing card carries
 *   `<p class="work-id highlight">fex-004</p>`, and a work page carries the same
 *   value in `<dt class="highlight">ipzz-961</dt>` - so both ends of the site
 *   give an exact catalogue number. A library filename does not, which is why
 *   the code is extracted from free text there instead of compared as a string.
 * - Codes are written several ways and every one of them is real: `fex-004` on
 *   the site, `FEX004`, `FEX 004` and `h_259fex00004` in a DMM filename, and
 *   `259LUXU-1900` where the number comes *first*. So the key is the
 *   alphanumerics with leading zeros dropped from the trailing digit run:
 *   `FEX-004` and `FEX4` are the same key, and so are `259LUXU-1900` and
 *   `259luxu1900`.
 * - At least two letters and at least two digits are required. That one rule is
 *   what keeps the noise out without a blocklist: `x264`, `AV1`, `CD1` and
 *   `MP4` all fail it, while `HD1080` passes and is harmless, because a real
 *   catalogue code is never `HD-1080` for the two to collide.
 * - There is no single "play this" URL that every media-server version accepts.
 *   Jellyfin 10.9 moved the web client from hashbang routes (`#!/video?id=`) to
 *   plain hash routes (`#/video?id=`). So the destination is a setting with
 *   three choices rather than a constant that is wrong for half the installs.
 * - A work already in the library is skipped by *bulk* selection and upgraded by
 *   a *hand* tick. Bulk means "everything she has", which is only worth having if
 *   it is everything you lack; a hand tick is a deliberate request, and the only
 *   reason to make one for a work you already own is a fuller release.
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
   * How much larger a release has to be before it counts as an upgrade.
   *
   * Used only when the work is already in the library and was ticked by hand:
   * the point there is not to download it again but to replace it with a better
   * copy, and a release a couple of percent larger is the same encode in a
   * different container. A quarter is the smallest step that is reliably a
   * different release rather than a different mux, and it is a ratio rather than
   * a number of bytes because the gap between a 1080p and a 4K release grows
   * with the release.
   */
  var UPGRADE_MIN_RATIO = 1.25;

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
    // Release-tag preferences. See magnetTags() for the measured vocabulary.
    //
    // skipAI is on by default because it is a veto - it removes AI-generated
    // releases - and every other setting here is a requirement the user must ask
    // for. Only 14% of the 783 sampled releases carry any tag at all, so an
    // opt-in requirement that cannot be met relaxes rather than blocking, and
    // that is the common case rather than an edge case.
    tags: {
      uncensored: false,
      chinese: false,
      uhd: false,
      skipAI: true,
    },
    // The optional Emby / Jellyfin integration. Off, with an empty key, because
    // a script that starts talking to a server the user never mentioned is not
    // one anybody should install. Both defaults are the products' own: 8096 is
    // Jellyfin's port (Emby ships 8096 too) and the host is the documented
    // localhost form, so nothing here names a particular machine.
    mediaServer: {
      enabled: false,
      host: "http://localhost",
      port: 8096,
      apiKey: "",
      // Where a "play" button sends you. See MEDIA_LINK and the README.
      link: "play",
      // Optional: the name of one library to read. Blank reads everything.
      // Measured, not a guess: on a real 15,288-item server the JAV library is
      // 582 of them, and reading all 15,288 is four requests and a multi-megabyte
      // index to match against 582 useful rows.
      library: "",
    },
  };

  // minSize/maxSize are what pickMagnet() compares against, but they are derived
  // and never stored: persisting both a slider position and the window it implies
  // would be two answers to one question, and they would eventually disagree.
  DEFAULTS.minSize = Math.round(DEFAULTS.preferredSize / SIZE_WINDOW_RATIO);
  DEFAULTS.maxSize = Math.round(DEFAULTS.preferredSize * SIZE_WINDOW_RATIO);

  /**
 * Above this many works in one action, ask first.
 *
 * The gentlest possible failure here is a refusal, not a crash: a career can be
 * a hundred works, and a single click firing that many page requests at the site
 * is enough to earn an IP rate-limit or a temporary block. One dialog is a far
 * better outcome than losing access to the site for an afternoon, and it costs
 * one keypress on the runs that are genuine.
 *
 * Deliberately a threshold rather than a confirmation every time. Confirming
 * every batch trains people to click through dialogs, which is exactly the
 * reflex that makes the one that matters get dismissed.
 */
  var CONFIRM_THRESHOLD = 25;

  /** Does sending this many works warrant asking first? */
  function needsConfirmation(count, threshold) {
    var limit = threshold === undefined ? CONFIRM_THRESHOLD : threshold;
    return count > limit;
  }

  /**
   * Gap between consecutive requests to the site, in milliseconds.
   *
   * Long enough to matter, short enough that twenty items still finish in a
   * sensible time. Roughly the pace of a person clicking through a gallery.
   */
  var REQUEST_GAP_MS = 400;

  /**
   * How many works a list of jobs still has to send.
   *
   * Pure, and extracted precisely so it can be tested: this number is what the
   * panel shows and what the resume log reports, and an off-by-one here would
   * either promise work that is not left or hide work that is.
   *
   * Collect jobs count as zero - a crawl has no per-work cost until it hands over
   * to a send job.
   */
  function pendingWorkCount(jobs) {
    return (jobs || []).reduce(function (total, job) {
      if (!job || job.kind !== "send") return total;
      var total_hrefs = (job.hrefs || []).length;
      var done = job.cursor || 0;
      return total + Math.max(0, total_hrefs - done);
    }, 0);
  }

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
   * A comparison key for a catalogue code.
   *
   * `FEX-004`, `fex004`, `FEX 004` and `h_259fex00004` all end up as `FEX4`, and
   * `259LUXU-1900` stays `259LUXU1900`. Two transformations do that, and both
   * are there because real filenames need them:
   *
   *   - every separator goes, because a file may write the code with a dash, a
   *     space, an underscore or nothing at all;
   *   - leading zeros come off the trailing digit run, because `fex-004` on the
   *     site is `fex-4` in the next filename along.
   *
   * Note the prefix is allowed to contain digits. That is what makes
   * `259LUXU-1900` work, and numeric prefixes are not rare - `259LUXU-`,
   * `300MIUM-` and `200GANA-` are all real series. Requiring the character
   * before the number to be a letter keeps the stripping from firing on a string
   * that is not code-shaped at all.
   *
   * Anything that does not look like a code is returned compacted and unchanged,
   * so a caller cannot be handed an empty key by an input it did not expect.
   */
  function codeKey(raw) {
    var compact = normalizeCode(raw).replace(/-/g, "");
    var m = /^([A-Z0-9]*?[A-Z])(0*)(\d{1,5})$/.exec(compact);
    if (!m) return compact;
    return m[1] + String(Number(m[2] + m[3]));
  }

  /**
   * Every catalogue code a free-text string mentions.
   *
   * Library filenames are prose, not codes: `[JAV] IPZZ-961 1080p.mp4`,
   * `IPZZ961-U`, `259LUXU-1900-c 4K.mkv`. So this pulls codes out of a string
   * rather than trimming one, and returns all of them because a filename may
   * name a series as well as an episode.
   *
   * The shape is "letters, then an optional separator, then digits" - at least
   * two of each - with an optional run of up to four digits in front. The digit
   * run is grabbed greedily so a five-digit code is not read as a two-digit one
   * with a suffix.
   *
   * Two keys come out of a match that has a leading digit run, and both are
   * needed because two real conventions disagree about what that run is:
   *
   *   - DMM glues a maker number onto the front and pads the code:
   *     `fex-004` becomes `h_259fex00004`. The site never writes that form, so
   *     without the bare key a library named by a DMM tool would match nothing
   *     at all.
   *   - `259LUXU-1900` is the code itself, digits and all, and matches on the
   *     full key.
   *
   * Emitting both rather than guessing which one a filename means is the honest
   * choice: the extra key is specific enough that a false match needs two
   * different makers to share a letter run *and* a number. When that does
   * happen the failure is a work reported as already held, which the log says
   * out loud rather than hiding - not a silent duplicate download.
   *
   * Pure, and deliberately not anchored: a code in the middle of a filename is
   * the normal case, not the exception.
   */
  var CODE_IN_TEXT = /(\d{0,4})([A-Za-z]{2,7})[ _-]?(\d{2,5})/g;

  function codeKeys(text) {
    var s = String(text || "");
    var out = [];
    var seen = {};
    var m;
    CODE_IN_TEXT.lastIndex = 0;
    while ((m = CODE_IN_TEXT.exec(s)) !== null) {
      // The pattern always consumes at least four characters, so it cannot match
      // empty and loop; the guard is here because a hang costs far more than a
      // comparison if that ever stops being true.
      if (m.index === CODE_IN_TEXT.lastIndex) CODE_IN_TEXT.lastIndex++;
      var candidates = [m[1] + m[2] + m[3]];
      if (m[1]) candidates.push(m[2] + m[3]);
      for (var i = 0; i < candidates.length; i++) {
        var key = codeKey(candidates[i]);
        if (!key || seen[key]) continue;
        seen[key] = true;
        out.push(key);
      }
    }
    return out;
  }

  /**
   * Index library entries by every code they mention.
   *
   * Keyed rather than listed so a lookup is one property read per card: a
   * listing of 34 covers must not become 34 scans of a 500-item library.
   *
   * The largest copy wins when a library holds the same work twice. That is not
   * arbitrary - the size on record is the bar an upgrade has to clear, so
   * keeping the smaller one would offer an "upgrade" that is smaller than a copy
   * the user already has.
   *
   * Pure: it takes plain {id, name, path, size} records so it can be tested
   * without a server, and so the Jellyfin response shape is mapped in one place
   * rather than at every use.
   */
  function libraryIndexOf(items) {
    var index = {};
    (items || []).forEach(function (item) {
      if (!item || !item.id) return;
      var size = Number(item.size) || 0;
      var keys = codeKeys(item.name).concat(codeKeys(item.path));
      keys.forEach(function (key) {
        var prev = index[key];
        if (!prev || size > prev.size) {
          index[key] = { id: item.id, size: size, name: item.name || "" };
        }
      });
    });
    return index;
  }

  /** The library entry for a work code, or null when it is not held. */
  function libraryHit(index, code) {
    var key = codeKey(code);
    if (!key) return null;
    return (index && index[key]) || null;
  }

  /**
   * Deep links into a Jellyfin or Emby web client.
   *
   * There is no one URL that every version accepts, so there are three and the
   * user picks. Jellyfin 10.9 replaced the hashbang routes (`#!/video?id=`) with
   * plain hash routes (`#/video?id=`), so a hard-coded link is wrong on roughly
   * half the installs and the symptom is an error page where the video should
   * be. Emby still answers to the hashbang form, which is the other reason both
   * are offered rather than one being assumed.
   *
   * `details` is the item page, which has been at `#/details?id=` for long
   * enough to be the safe choice when neither play route works: it is one click
   * from playing, and it always renders.
   */
  var MEDIA_LINK = {
    play: "/web/#/video?id=",
    "play-legacy": "/web/index.html#!/video?id=",
    details: "/web/#/details?id=",
  };

  function mediaUrl(base, id, mode) {
    var root = String(base || "").replace(/\/+$/, "");
    var path = MEDIA_LINK[mode] || MEDIA_LINK.play;
    return root + path + encodeURIComponent(String(id || ""));
  }

  /**
   * Resolve a library name, or a raw id, to the id the API wants.
   *
   * Matching on the name rather than making the user paste a 32-hex id is the
   * whole point: the id is not shown anywhere in the Jellyfin UI. The id is
   * still accepted, so someone who has it can skip the lookup.
   *
   * Case-insensitive and trimmed, because a library called "JAV" and one typed
   * as "jav " are the same library to a human and would not be to a server.
   */
  function findLibrary(folders, wanted) {
    var want = String(wanted || "").trim().toLowerCase();
    if (!want) return null;
    var list = folders || [];
    var i;
    for (i = 0; i < list.length; i++) {
      if (String((list[i] && list[i].ItemId) || "").trim().toLowerCase() === want) {
        return list[i].ItemId;
      }
    }
    for (i = 0; i < list.length; i++) {
      if (String((list[i] && list[i].Name) || "").trim().toLowerCase() === want) {
        return list[i].ItemId;
      }
    }
    return null;
  }

  /** The library names a server has, for a "did you mean" message. */
  function libraryNames(folders) {
    return (folders || [])
      .map(function (f) {
        return f && f.Name ? String(f.Name).trim() : "";
      })
      .filter(function (name) {
        return !!name;
      });
  }

  /**
   * Should the library reader ask for another page?
   *
   * Pure, and separate from the fetching, so that the rule which actually had the
   * bug is the rule that gets tested. The first version asked for `Limit=5000`
   * and treated that as the whole library; against a real 15,288-item server it
   * returned the first 5,000 and stopped, so owned works past the cut would have
   * been downloaded a second time.
   *
   * A short page is the end signal, and it is checked *first* on purpose. A
   * server may report a total it will not actually hand over - a permission, a
   * filter, a deleted item - and "collected >= total" alone would then ask for a
   * page that is always empty, for ever.
   *
   * `maxPages` is a stop, not a target: reaching it means the answer is
   * incomplete and the caller says so.
   */
  function morePages(state) {
    if (!state || !state.lastPage) return false;
    if (state.lastPage < state.pageSize) return false;
    if (state.collected >= state.total) return false;
    if (state.maxPages && state.pages >= state.maxPages) return false;
    return true;
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
   * The release tags a magnet name declares.
   *
   * Measured, not guessed. From 783 magnets across 80 work pages drawn from
   * twelve performers' filmographies, the flags that recur are these, and they
   * arrive in two near-disjoint conventions:
   *
   *   uncensored   -U (32 pages)  -UC  -uncensored   and  the word 无码
   *   chinese subs -C  (21 pages)  -UC  and  the word 中文字幕
   *   AI           -AI (16 pages)
   *   4K           4K  (26 magnets, usually bracketed)
   *
   * Two corrections to the obvious guess, both from counting rather than
   * expecting. There is no -CN here at all (0 of 783) and no 無修正 either (0):
   * this site writes -C and simplified 无码. And the two spellings of the same
   * fact barely overlap - only 5 magnets carry both -U and 无码, and *no* magnet
   * carries both -C and 中文字幕. They are alternative conventions used by
   * different uploaders, so matching only one spelling matches roughly half of
   * the releases it claims to cover.
   *
   * Two places are read, because the site uses both:
   *   - everything inside 【】 or [], for 无码 / 4K / HD720p
   *   - the segment after the catalogue code, for -U / -C / -UC / -AI
   *
   * @-promo spans are stripped first: those are the "suspect" advert axis that
   * classifyMagnet() already handles, and a promo payload is not a quality tag.
   *
   * Pure and DOM-free so it can be tested against the forms that were measured.
   */
  function magnetTags(name) {
    var tags = { uncensored: false, chinese: false, ai: false, uhd: false };
    var body = String(name || "").replace(/@\S*/g, " ");
    var brackets = (body.match(/[\u3010\[\uFF08(]([^\]\u3011\uFF09)]*)[\]\u3011\uFF09)]/g) || []).join(" ");
    var code = /\b([A-Z]{2,6})-(\d{2,4})\b/.exec(body);
    var tail = code ? body.slice(code.index + code[0].length) : body;
    var flags = brackets + " " + tail;

    // Both -U and -UC mean uncensored; -UC additionally means Chinese subs. One
    // pattern each, because `UC?` cannot express "U or UC" and "C or UC" at once.
    tags.uncensored =
      /(^|[\s\-_])UC?($|[\s\-_])/.test(tail) ||
      /uncensored/i.test(flags) ||
      /\u65e0\u7801|\u7121\u4fee\u6b63|\u65e0\u4fee\u6b63/.test(flags);
    tags.chinese =
      /(^|[\s\-_])(C|UC)($|[\s\-_])/.test(tail) ||
      /\u5B57\u5E55|\u4E2D\u5B57/.test(flags);
    // Bounded, or AI matches inside words like "hair".
    tags.ai = /(^|[\s\-_])AI($|[\s\-_])/.test(tail) || /(^|[\s])AI($|[\s])/.test(brackets);
    tags.uhd = /4K/i.test(flags);
    return tags;
  }

  /**
   * Narrow a pool to the tag categories the user asked for.
   *
   * Explicit requirements first, then the AI veto, and that order is the whole
   * design: a requirement is something the user switched on and named, while the
   * AI veto is on by default and may never have been considered. When they
   * conflict - the only uncensored release is AI, say - the requirement is
   * honoured and the veto is the thing that gives way.
   *
   * Every category relaxes rather than emptying the pool. A work with no
   * uncensored release is still worth having, and silently dropping it would
   * leave the user staring at a batch that did nothing with no explanation. The
   * relaxed list is returned so the caller can say which way it fell back.
   *
   * Pure. `relaxed` is the list of preferences that could not be met.
   */
  function applyTagPrefs(pool, prefs) {
    var want = prefs || {};
    var relaxed = [];
    var items = (pool || [])
      .filter(function (m) {
        return m && m.uri;
      })
      .map(function (m) {
        return { magnet: m, tags: magnetTags(m.name) };
      });

    function require_(key) {
      if (!want[key]) return;
      var kept = items.filter(function (it) {
        return it.tags[key];
      });
      // Only narrow when something survives: a requirement the work cannot meet
      // must not turn into "send nothing for this work".
      if (kept.length) items = kept;
      else relaxed.push(key);
    }

    require_("uncensored");
    require_("chinese");
    require_("uhd");

    if (want.skipAI) {
      var notAI = items.filter(function (it) {
        return !it.tags.ai;
      });
      if (notAI.length) items = notAI;
      else relaxed.push("skipAI");
    }

    return {
      pool: items.map(function (it) {
        return it.magnet;
      }),
      relaxed: relaxed,
    };
  }

  /** Matches a URL that names a host: scheme://host, or protocol-relative. */
  var ABSOLUTE_HREF = /^(?:[a-z][a-z0-9+.-]*:)?\/\/([^/?#]+)/i;

  /**
   * Whether a listing card is one of the adverts the site injects.
   *
   * Measured from the page's own inline `adworker` script, which builds them with
   * `prmt()` and emits:
   *
   *   <a class="work" href="http://tdsd95.com/" target="_blank">
   *     <img class="work-cover" src="https://img.j-cdn.com/apps/img/k/N.jpg">
   *     <p class="work-id highlight">91Porn</p>
   *     <div class="work-meta">promo copy</div>
   *
   * So an advert is a real-looking work card that **links off this site**, and
   * that is the one thing an advert cannot avoid being: its whole job is to send
   * you somewhere else. Compared against the page's own host rather than against
   * a list of known ad domains, so one from a domain nobody has seen yet is still
   * caught, and a site-relative link that is genuinely ours is not.
   *
   * The rule this replaces looked for promo wording in the card's title, and it
   * could never have worked. Both reasons come from that same markup: the cards
   * are linked with an absolute href, so `a.work[href^="/v/"]` never matched them
   * and the script never saw them at all; and they carry no `.work-title`
   * element, so there was no title to read even where it did match.
   *
   * Pure: it takes the host rather than reading location, so it can be tested
   * against the real markup with no browser.
   */
  function isAdCard(href, pageHost) {
    var h = String(href || "");
    // A plain root-relative path is a work on this site, and so is a fragment or
    // a query-only link. Neither can be an advert.
    if (h.charAt(0) === "/" && h.charAt(1) !== "/") return false;
    if (h.charAt(0) === "#" || h.charAt(0) === "?") return false;
    var host = ABSOLUTE_HREF.exec(h);
    if (!host) return false;
    // Compare hosts with their ports dropped. location.host includes one, so
    // leaving it on the right-hand side would make every comparison on a
    // non-default port - the harness included - fail open and call real works
    // adverts. A link to the same site on another port is still the same site.
    return domainOf(host[1]) !== domainOf(pageHost);
  }

  /** Host portion of a URL or of location.host, lower-cased, port dropped. */
  function domainOf(host) {
    var h = String(host || "").toLowerCase();
    var colon = h.lastIndexOf(":");
    return colon === -1 ? h : h.slice(0, colon);
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
   *
   * `prefs.upgradeFrom` replaces all of that with one rule, and only the caller
   * that knows the work is already in the user's library sets it. See the block
   * inside for why an upgrade is not a size preference.
   */
  function pickMagnet(magnets, minBytes, maxBytes, preferredBytes, prefs) {
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

    // Tag preferences narrow the pool before the size window is applied, so a
    // preferred size picks among the releases that actually match what the user
    // asked for rather than among all of them. Order matters: tags decide *which*
    // releases are eligible, size then decides which of those to take.
    var tagged = applyTagPrefs(candidates, prefs);
    candidates = tagged.pool;
    // Unreachable in practice - applyTagPrefs() only narrows to a non-empty set -
    // but returning a reason beats throwing on an invariant nobody can see.
    if (!candidates.length) return { magnet: null, reason: "ads-only", relaxed: tagged.relaxed };

    // Already in the library, and ticked by hand: this is an upgrade, not a
    // download. Only a release meaningfully larger than the copy on disk is
    // worth sending, so the size window and the preferred size are both set
    // aside here - they answer "which release do I want", and the question is
    // now "which release is better than the one I have".
    //
    // `upgradeFrom` is 0 when the library knows the work but not its size. The
    // largest release is then the only honest guess at an upgrade, and the
    // caller says so rather than implying a comparison it could not make.
    var upgradeFrom = prefs ? prefs.upgradeFrom : undefined;
    if (upgradeFrom !== undefined && upgradeFrom !== null) {
      if (upgradeFrom > 0) {
        var bigger = candidates.filter(function (m) {
          return m.size >= upgradeFrom * UPGRADE_MIN_RATIO;
        });
        if (!bigger.length) {
          return { magnet: null, reason: "already-owned", relaxed: tagged.relaxed };
        }
        return { magnet: smallest(bigger), reason: "upgrade", relaxed: tagged.relaxed };
      }
      return { magnet: largest(candidates), reason: "upgrade", relaxed: tagged.relaxed };
    }

    var inWindow = candidates.filter(function (m) {
      return m.size >= minBytes && m.size <= maxBytes;
    });
    if (inWindow.length) {
      return {
        magnet: closestToPreferred(inWindow, preferredBytes),
        reason: "in-window",
        relaxed: tagged.relaxed,
      };
    }
    // Nothing the user asked for is available, so fall back to the biggest real
    // release - and say so, rather than sending nothing.
    return { magnet: largest(candidates), reason: "outside-window", relaxed: tagged.relaxed };
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
   * The smallest release in a list.
   *
   * The counterpart of largest(), and used for one thing: picking the *next*
   * step up when a work is already in the library. Among the releases that beat
   * what the user has, the smallest is the one that beats it by the least - a
   * tier up rather than the biggest file on the page.
   */
  function smallest(list) {
    return list.reduce(function (best, m) {
      return best === null || m.size < best.size ? m : best;
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

  /**
   * Whether a job should check the download client is alive before it starts.
   *
   * Pure, and extracted so it can be tested: getting this wrong is expensive in
   * both directions. Skip the probe and a dead client turns one batch into
   * thirty-four identical failures, each of which first spends a request on
   * jav8.vip - the requests that actually risk an IP block. Probe a job that
   * only collects and the user pays for a check they did not need, before work
   * that would have succeeded anyway.
   *
   * A crawl in send mode needs the probe *before* the crawl, not after it: by the
   * time the pages are collected the whole career has been fetched, and if the
   * client was never reachable that was all wasted.
   */
  function jobNeedsProbe(job) {
    if (!job) return false;
    if (job.kind === "send") return true;
    return job.kind === "collect" && job.mode === "send";
  }

  /**
   * Works in `selection` that a send job has not already been given.
   *
   * Pure, and extracted so it can be tested: this decides what a running batch
   * picks up next, and getting it wrong either drops work the user ticked or
   * re-sends work already sent.
   *
   * The comparison is against everything the job has ever been given, *not*
   * against what is left to send. A work that was sent and then unticked, or
   * unticked here and ticked in another tab, is still in `sent` - so if the test
   * were "is it in the remaining tail", that work would go round again. The
   * `sent` list is the memory of every item the job owns.
   */
  function joinableHrefs(selection, sent) {
    var have = {};
    (sent || []).forEach(function (href) {
      have[href] = true;
    });
    var out = [];
    (selection || []).forEach(function (href) {
      if (have[href]) return;
      have[href] = true;
      out.push(href);
    });
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
  function overridesFor(section) {
    // The media server lives at the top level, not under `downloaders`: that
    // object is a list of places to *send* a magnet, and this is not one.
    if (section === "mediaServer") return storedSettings.mediaServer || {};
    return (storedSettings.downloaders || {})[section] || {};
  }

  /** The stored override for one field, or undefined if the default applies. */
  function overrideFor(section, key) {
    return overridesFor(section)[key];
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
      tags: settings.tags || DEFAULTS.tags,
      downloaders: storedSettings.downloaders || {},
      mediaServer: storedSettings.mediaServer || {},
    });
  }

  function resetAll() {
    storedSettings = {};
    settings = deepMerge(DEFAULTS, {});
    applyPreferredSize();
    writeStore({});
    // The panel is still open behind the dialog, so its controls would otherwise
    // keep showing values that no longer exist.
    requestTagRefresh();
    requestMagnetRefresh();
    libraryRepaint();
  }

  // -------------------------------------------------------- media server
  // The optional Jellyfin / Emby integration. Everything here is inert until
  // `mediaServer.enabled` is set and an API key is present; with either missing
  // the script behaves exactly as it did before this existed.

  var SERVER_KEY = STORE_KEY + "-library";

  /**
   * How long a library snapshot is trusted before it is re-read.
   *
   * Six hours, because a library changes when the user adds a download - not
   * while they browse - and the read is one request. Shorter would mean a
   * request per session for an answer that is almost always identical; no cache
   * at all would mean a request per page view.
   */
  var SERVER_TTL_MS = 6 * 60 * 60 * 1000;

  /**
   * How many items to ask for in one page.
   *
   * 5000 is Jellyfin's own comfortable page size. This is a *page*, not a
   * ceiling: an earlier version treated it as a ceiling and silently returned
   * only the first 5000 items of a 15,288-item server, which meant owned works
   * beyond the cut were not recognised and got downloaded a second time - the
   * exact failure this feature exists to prevent. The library is read in pages
   * until it is exhausted; see collectLibrary().
   */
  var SERVER_LIMIT = 5000;

  /**
   * How many pages to read before giving up and saying so.
   *
   * A hundred thousand items. High enough never to fire on a real library, low
   * enough that a server answering the same page for ever cannot turn a browse
   * into an infinite loop of requests.
   */
  var SERVER_MAX_PAGES = 20;

  var library = { at: 0, base: "", index: {} };

  /** The scheme://host:port of the configured server. */
  function mediaServerBase() {
    var cfg = settings.mediaServer || DEFAULTS.mediaServer;
    return origin(cfg.host, cfg.port);
  }

  /**
   * Read the cached snapshot.
   *
   * Deliberately tolerant: every failure path here means "no library yet", which
   * is a working state, because nothing is skipped and no play button is shown
   * until the index is known. A corrupt cache must not take the page down.
   */
  function readLibrary() {
    var raw = null;
    try {
      raw = GM_getValue(SERVER_KEY, null);
    } catch (e) {
      raw = null;
    }
    if (raw === null || raw === undefined || raw === "") {
      try {
        raw = window.localStorage.getItem(SERVER_KEY);
      } catch (e) {
        raw = null;
      }
    }
    if (typeof raw === "string") {
      try {
        raw = JSON.parse(raw);
      } catch (e) {
        raw = null;
      }
    }
    if (!raw || typeof raw !== "object" || !raw.index || typeof raw.index !== "object") return;
    library = {
      at: Number(raw.at) || 0,
      base: typeof raw.base === "string" ? raw.base : "",
      index: raw.index,
    };
  }

  function writeLibrary() {
    var data = { at: library.at, base: library.base, index: library.index };
    try {
      GM_setValue(SERVER_KEY, data);
    } catch (e) {
      try {
        window.localStorage.setItem(SERVER_KEY, JSON.stringify(data));
      } catch (e2) {
        /* nothing left to try; the snapshot is rebuilt next sync anyway */
      }
    }
  }

  /**
   * Forget a snapshot that belongs to a different server.
   *
   * The index is derived from codes, so it carries no record of where it came
   * from - which means a cache read from one server would happily claim matches
   * against another. Keyed on the base for that reason, and checked on load and
   * on save rather than only at sync time.
   */
  function libraryMatchesServer() {
    return library.base === mediaServerBase();
  }

  function dropLibrary() {
    library = { at: 0, base: "", index: {} };
    writeLibrary();
  }

  /** The index to match against, or an empty one when it cannot be trusted. */
  function libraryIndex() {
    if (!settings.mediaServer || !settings.mediaServer.enabled) return {};
    if (!libraryMatchesServer()) return {};
    return library.index || {};
  }

  /** The library entry for a work code, or null. */
  function mediaServerHit(code) {
    return libraryHit(libraryIndex(), code);
  }

  /**
   * Ask the server for the whole library, once.
   *
   * One *sync* for the whole library, not one request per card: a listing holds
   * 34 covers and a career crawl walks hundreds of pages, so per-card lookups
   * would be thousands of requests against a home server and would turn a
   * browsing aid into the heaviest thing the script does.
   *
   * Reading one named library is the difference between one small request and
   * four large ones on a server that also holds films and television. It is
   * optional, and the whole library is read when it is not set.
   */
  function syncLibrary() {
    var cfg = settings.mediaServer || DEFAULTS.mediaServer;
    if (!cfg.enabled) return Promise.resolve(false);
    var apiKey = String(cfg.apiKey || "").trim();
    if (!apiKey) {
      log("Jellyfin / Emby: no API key set, so the library cannot be read.", "wa");
      return Promise.resolve(false);
    }
    var base = mediaServerBase();
    log("Reading your media library from " + base + "…", "mu");
    return resolveLibraryId(cfg, apiKey, base)
      .then(function (parentId) {
        return collectLibrary(cfg, apiKey, parentId).then(function (items) {
          library = { at: Date.now(), base: base, index: libraryIndexOf(items) };
          writeLibrary();
          var recognised = Object.keys(library.index).length;
          log(
            "Library read: " + items.length + " items, " + recognised + " titles recognised.",
            "ok",
          );
          libraryRepaint();
          return true;
        });
      })
      .catch(function (err) {
        if (statusOf(err) === 401) {
          log("Jellyfin / Emby rejected the API key. Create one in the server dashboard under API Keys.", "er");
        } else if (!statusOf(err)) {
          // No status at all means the request never arrived, which is the same
          // shape as a userscript manager refusing it before it leaves the
          // browser - a wrong address and a missing @connect entry look
          // identical from here, so both remedies are named rather than one
          // being guessed at.
          log(
            "Jellyfin / Emby: no answer from " + base + ". Check the host and port in Settings, " +
              "and that the manager's @connect allows it.",
            "er",
          );
        } else {
          log("Jellyfin / Emby: " + base + " answered " + statusOf(err) + ", so the library could not be read.", "er");
        }
        return false;
      });
  }

  /**
   * Turn the configured library name into the id the Items API wants.
   *
   * Resolves to null - meaning "read everything" - when no library is named, and
   * also when the name does not match, because reading too much is a far smaller
   * problem than reading nothing and telling the user their library is empty.
   * The names the server does have are listed, so the fix is one word away.
   */
  function resolveLibraryId(cfg, apiKey, base) {
    var wanted = String(cfg.library || "").trim();
    if (!wanted) return Promise.resolve(null);
    return request("GET", endpoint(cfg.host, cfg.port, "/Library/VirtualFolders"), {
      headers: { "X-Emby-Token": apiKey, Accept: "application/json" },
      timeout: 20000,
    }).then(
      function (res) {
        var folders;
        try {
          folders = JSON.parse(res.responseText);
        } catch (e) {
          folders = null;
        }
        var id = findLibrary(folders, wanted);
        if (!id) {
          var names = libraryNames(folders);
          log(
            "Jellyfin / Emby: no library called \"" + wanted + "\"" +
              (names.length ? ". This server has: " + names.join(", ") + "." : ".") +
              " Reading every library instead.",
            "wa",
          );
          return null;
        }
        log("Reading only the \"" + wanted + "\" library.", "mu");
        return id;
      },
      function (err) {
        // A rejected key is not a "cannot list libraries" problem, and the outer
        // handler names the remedy for it. Swallowing it here would report the
        // wrong thing twice.
        if (statusOf(err) === 401) throw err;
        // A non-admin key cannot list libraries. Falling back to the whole
        // library is the useful answer; failing the sync would not be.
        log("Jellyfin / Emby: could not list libraries, so reading every one.", "wa");
        return null;
      },
    );
  }

  /** One page of items, mapped to the plain records libraryIndexOf() takes. */
  function fetchItemPage(cfg, apiKey, parentId, startIndex) {
    var url =
      endpoint(cfg.host, cfg.port, "/Items") +
      "?Recursive=true&IncludeItemTypes=Movie,Episode,Video" +
      "&Fields=Path,MediaSources&Limit=" + SERVER_LIMIT +
      "&StartIndex=" + startIndex +
      (parentId ? "&ParentId=" + encodeURIComponent(parentId) : "");
    return request("GET", url, {
      headers: { "X-Emby-Token": apiKey, Accept: "application/json" },
      timeout: 30000,
    }).then(function (res) {
      var parsed;
      try {
        parsed = JSON.parse(res.responseText);
      } catch (e) {
        parsed = null;
      }
      if (!parsed || !Array.isArray(parsed.Items)) {
        throw new Error("that address did not answer with a Jellyfin item list (check the host and port)");
      }
      var items = parsed.Items.map(function (it) {
        var sources = it.MediaSources || [];
        var first = sources.length ? sources[0] : null;
        return {
          id: it.Id,
          name: it.Name,
          path: it.Path,
          // Not every item carries a size - a freshly scanned file may not, and
          // measured on a real server, no television episode does. 0 means
          // "held, size unknown", which pickMagnet() treats differently from a
          // real size.
          size: first && first.Size ? Number(first.Size) : 0,
        };
      });
      return { items: items, total: Number(parsed.TotalRecordCount) || items.length };
    });
  }

  /**
   * Read every page of the library, in order, one request at a time.
   *
   * Sequential on purpose: this is someone's home server, and firing four
   * overlapping requests at it to save two seconds is not a trade worth making.
   *
   * Stops on the first page that comes back short, which is the only reliable
   * end signal - TotalRecordCount and the page size can disagree with what the
   * server will actually hand over.
   */
  function collectLibrary(cfg, apiKey, parentId) {
    var all = [];
    var pages = 0;

    function step() {
      return fetchItemPage(cfg, apiKey, parentId, all.length).then(function (page) {
        all = all.concat(page.items);
        pages++;
        var state = {
          collected: all.length,
          lastPage: page.items.length,
          total: page.total,
          pageSize: SERVER_LIMIT,
          pages: pages,
          maxPages: SERVER_MAX_PAGES,
        };
        if (!morePages(state)) {
          if (state.pages >= state.maxPages && state.collected < state.total) {
            log(
              "Jellyfin / Emby: stopped after " + state.collected + " items of " + state.total +
                ", so some titles were not seen.",
              "wa",
            );
          }
          return all;
        }
        return step();
      });
    }

    return step();
  }

  /** Re-read if the snapshot is stale. Called once, from init(). */
  function syncLibraryIfStale() {
    if (!settings.mediaServer || !settings.mediaServer.enabled) return;
    if (!libraryMatchesServer()) {
      dropLibrary();
      libraryRepaint();
    }
    if (Date.now() - library.at > SERVER_TTL_MS) syncLibrary();
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
/* The library "play" button sits opposite the tick box, so the two never
  compete for the same corner, and stays translucent until hovered because it is
  an offer rather than the page's primary action - the same reasoning as .jd-box.
  A real anchor, so middle-click and "open in new tab" behave as anyone expects;
  it is positioned on the card, which decorateAll() has already made relative. */
.jd-play{position:absolute;top:4px;right:4px;z-index:41;width:24px;height:24px;
  border-radius:5px;background:rgba(10,14,18,.86);border:1px solid rgba(255,255,255,.55);
  box-shadow:0 1px 4px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;
  color:#fff;font:12px/1 sans-serif;text-decoration:none;opacity:.62;
  transition:opacity .12s,background .12s}
.jd-play:hover{opacity:1;background:#276749;border-color:#68d391}
.jd-inlib{color:#68d391;text-decoration:none}
.jd-inlib:hover{text-decoration:underline}
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
.jd-tags{display:flex;gap:4px;margin:6px 0 0}
.jd-tags .jd-tag{flex:1;padding:3px 0;font-size:10.5px;line-height:1.3}
.jd-tags .jd-tag.on{background:#2b6cb0;border-color:#63b3ed;color:#fff}
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
.jd-queue{display:flex;align-items:center;gap:6px;margin:8px 0 0;padding:5px 6px;
  background:rgba(47,111,235,.14);border:1px solid rgba(99,179,237,.45);border-radius:4px}
.jd-queue-text{flex:1;min-width:0;font-size:10.5px;color:#9ab;line-height:1.35}
.jd-btn.danger{background:#7b341e;border-color:#c05621;color:#fff}
.jd-btn.danger:hover{background:#9b4220}
.jd-btn-warn{background:#8a6d1f;border-color:#c9a227;color:#fff}
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

  // ===================================================================== queue
  // Two stores, on purpose, because the two things have different lifetimes.
  //
  // The *queue* is per tab, in sessionStorage, so closing the tab ends it. That
  // is the requested behaviour and it is also what keeps this safe: only one tab
  // ever drives its own queue, so two tabs can never both send the same magnet.
  // A queue shared across tabs would need a lease to elect a driver, and a lease
  // that expires wrongly sends a torrent twice.
  //
  // The *selection* and the *pause* flag are shared across tabs, in
  // localStorage, because aggregating what you have ticked across open tabs is
  // meaningless if each tab keeps its own copy. The cost is that they now outlive
  // the tab; Clear and Cancel all both reach every tab, and the pause flag
  // expires with the browser session rather than with a page.
  //
  // One key per field rather than one JSON blob. A read-modify-write of a single
  // blob is two operations, so two tabs changing different fields at the same
  // moment lose one of the changes; separate keys make every write atomic on its
  // own.
  var QUEUE_KEY = "jav8-downloader-queue";
  var SHARED_HREFS_KEY = "jav8-downloader-hrefs";
  var SHARED_CODES_KEY = "jav8-downloader-codes";
  var PAUSED_KEY = "jav8-downloader-paused";

  var jobQueue = {
    jobs: [],
    busy: false,
    // Bumped by cancel-all. Every continuation checks it, so work already in
    // flight stops instead of quietly re-queueing the next item - a cancel that
    // lets one more item through is not a cancel.
    epoch: 0,
  };

  /**
   * Whether the active client has answered since the last time we changed it.
   *
   * Only ever read by the pre-batch probe. A send that fails against the client
   * clears it, so the next batch checks again instead of trusting a stale yes -
   * a client that was reachable and then stopped is exactly the case a cached
   * "reachable" would hide.
   */
  var targetReachable = false;

  /**
   * Work codes seen in *this* tab, and codes published by any tab.
   *
   * `sharedCodes` is what a resumed or cross-tab batch reads to label its log
   * lines; `known` is per page, so on its own it describes only the cards
   * currently on screen.
   */
  var sharedCodes = {};

  /** How often a paused queue checks whether it has been told to carry on. */
  var PAUSE_POLL_MS = 400;

  /**
   * Read or write one per-tab slot.
   *
   * Omitting `value` reads; passing anything else writes. Removal is separate
   * and explicit, because the obvious shortcut - writing null - silently stores
   * the *string* "null" instead of deleting the key. loadQueue() then reads that
   * back as JSON null and finds no jobs, so a finished queue appeared never to
   * resume. Passing null to delete is exactly the kind of shortcut that reads
   * fine and does the wrong thing.
   */
  function queueStore(key, value) {
    try {
      if (arguments.length < 2) {
        var raw = window.sessionStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      }
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return null;
    } catch (e) {
      // A full or disabled storage must not take the feature down; it only
      // means the queue stops surviving navigation.
      return null;
    }
  }

  /**
   * One slot shared by every tab on this site.
   *
   * localStorage, not GM_setValue, because GM_setValue is namespaced per script
   * rather than per site and there is no reliable way to enumerate sibling tabs
   * through it - the `storage` event is what makes this live, and only
   * localStorage raises it.
   *
   * Every failure here is swallowed on purpose. Storage being unavailable costs
   * cross-tab sync and nothing else: the page must still work, just on its own.
   */
  function readShared(key) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setShared(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* the feature degrades to this tab only */
    }
  }

  function dropShared(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      /* nothing to do */
    }
  }

  /**
   * Adopt a change made in another tab.
   *
   * MUST NOT WRITE. The event fires in every tab *except* the one that caused
   * it, so a write here would make each tab provoke the others to write again,
   * forever. Reads and repaints only.
   */
  function onSharedChange(event) {
    if (event.key === null) {
      // storage was cleared wholesale; nothing of ours is left to believe in.
      restoreSelection();
      renderSelection();
      joinRunningJob();
      renderQueueStatus();
      return;
    }
    if (event.key === SHARED_HREFS_KEY || event.key === SHARED_CODES_KEY) {
      if (restoreSelection()) {
        renderSelection();
        joinRunningJob();
      }
      return;
    }
    if (event.key === PAUSED_KEY) renderQueueStatus();
  }

  function clearStored(key) {
    try {
      window.sessionStorage.removeItem(key);
    } catch (e) {
      /* nothing to do; the slot simply lingers */
    }
  }

  function loadQueue() {
    var stored = queueStore(QUEUE_KEY);
    if (!stored || !Array.isArray(stored.jobs)) return;
    jobQueue.jobs = stored.jobs.filter(function (job) {
      return job && (job.kind === "collect" || job.kind === "send");
    });
  }

  function saveQueue() {
    queueStore(QUEUE_KEY, { jobs: jobQueue.jobs });
  }

  /** Persist the ticked set so a page change - or another tab - cannot drop it. */
  function saveSelection() {
    var hrefs = Array.from(selected);
    setShared(SHARED_HREFS_KEY, hrefs);
    // Codes travel with the selection so a batch started in one tab can still
    // name its works after the cards they came from are gone in another.
    var codes = {};
    hrefs.forEach(function (href) {
      var code = (known.get(href) || {}).code || sharedCodes[href];
      if (code) codes[href] = code;
    });
    sharedCodes = codes;
    setShared(SHARED_CODES_KEY, codes);
  }

  /** Pull the authoritative shared selection into this tab's memory. */
  function restoreSelection() {
    var hrefs = readShared(SHARED_HREFS_KEY);
    sharedCodes = readShared(SHARED_CODES_KEY) || {};
    if (!Array.isArray(hrefs)) return false;
    var next = new Set();
    hrefs.forEach(function (href) {
      if (typeof href === "string") next.add(href);
    });
    var changed = next.size !== selected.size;
    if (!changed) {
      next.forEach(function (href) {
        if (!selected.has(href)) changed = true;
      });
    }
    selected = next;
    return changed;
  }

  /**
   * A change anyone can see: this tab, or another one.
   *
   * The single funnel for "the selection moved", so the count, the tick boxes and
   * a running batch all learn about it the same way. Every path that mutates
   * `selected` goes through here - a hand tick, a crawl, a work finishing, or a
   * storage event from a sibling tab.
   */
  function selectionChanged() {
    saveSelection();
    renderSelection();
    joinRunningJob();
  }

  /** Re-tick this page's cards to match `selected`, and refresh the counts. */
  function renderSelection() {
    updateCount();
    requestBulkRefresh();
    worksOnPage().forEach(function (card) {
      var box = card.querySelector(".jd-box");
      if (!box) return;
      var input = box.querySelector("input");
      var on = selected.has(card.getAttribute("href"));
      if (input) input.checked = on;
      box.classList.toggle("on", on);
    });
  }

  /**
   * Read the pause flag from storage every time it is asked for.
   *
   * Never cached in a variable. The whole point is that the user can pause from
   * another tab, so a value captured when the job started would be a value from
   * the past - and a pause that does not take effect is worse than no pause,
   * because it looks like it worked.
   */
  function isPaused() {
    return readShared(PAUSED_KEY) === 1;
  }

  function setPaused(on) {
    setShared(PAUSED_KEY, on ? 1 : 0);
    renderQueueStatus();
  }

  /**
   * Sleep until work is allowed to continue.
   *
   * Checks the cancel epoch as well as the pause flag, because a tab that is
   * paused and then cancelled must still stop: otherwise the queue sits in a
   * wait loop for ever with nothing left to do.
   */
  function waitWhilePaused(epoch) {
    if (!isPaused() || epoch !== jobQueue.epoch) return Promise.resolve();
    renderQueueStatus();
    return new Promise(function (resolve) {
      setTimeout(resolve, PAUSE_POLL_MS);
    }).then(function () {
      return waitWhilePaused(epoch);
    });
  }

  function queuedWorkCount() {
    return pendingWorkCount(jobQueue.jobs);
  }

  function queueSummary() {
    if (!jobQueue.jobs.length) return "";
    var pending = queuedWorkCount();
    var parts = jobQueue.jobs.map(function (job) {
      return job.kind === "send" ? "sending" : "collecting";
    });
    var noun = jobQueue.jobs.length === 1 ? parts[0] : parts.length + " jobs";
    var state = isPaused() ? "paused" : jobQueue.busy ? noun : noun + " (waiting)";
    return state + (pending ? " · " + pending + " works left" : "");
  }

  /**
   * Add a job and make sure something is driving the queue.
   *
   * Jobs run strictly one at a time and in order. Concurrency here would mean
   * parallel page requests to the site, which is the one thing REQUEST_GAP_MS
   * exists to prevent.
   */
  function enqueue(job) {
    if (job.kind === "send") {
      // Snapshot the codes now, while the cards that supplied them are still on
      // this page. See runSendJob() for why.
      var labels = {};
      (job.hrefs || []).forEach(function (href) {
        var code = (known.get(href) || {}).code;
        if (code) labels[href] = code;
      });
      job.labels = labels;
    }
    jobQueue.jobs.push(job);
    saveQueue();
    renderQueueStatus();
    pumpQueue();
  }

  /**
   * Confirm the download client is reachable, or explain why it is not.
   *
   * Resolves true when the client answered, false when it did not - never
   * rejects, because the caller wants a decision rather than an exception. The
   * message names the remedy instead of just the symptom, and says plainly that
   * nothing was sent, so a failure that stops the batch cannot be mistaken for
   * one that quietly succeeded.
   *
   * Already reachable is treated as success without a second request. That is
   * safe because the only way a client stops answering between two sends is by
   * going away in between, and the first send after that fails on its own with
   * the same message. Re-probing per work would double the requests for a case
   * the send path already covers.
   */
  function probeClient(epoch) {
    var target = engine();
    if (targetReachable) {
      renderQueueStatus();
      return Promise.resolve(true);
    }
    return target.probe().then(
      function (message) {
        targetReachable = true;
        log(target.label + " reachable (" + message + ").", "mu");
        renderQueueStatus();
        return true;
      },
      function (err) {
        log(
          "Not sending anything: " + target.label + " is not answering - " +
            describeSendError(err) + ". Nothing was sent and everything is still ticked.",
          "er",
        );
        renderQueueStatus();
        return false;
      },
    );
  }

  function pumpQueue() {
    if (jobQueue.busy || !jobQueue.jobs.length) {
      if (!jobQueue.jobs.length) {
        // Nothing left: forget the persisted copy so a later visit does not
        // resurrect a queue that already finished.
        clearStored(QUEUE_KEY);
      }
      renderQueueStatus();
      return;
    }
    var job = jobQueue.jobs[0];
    jobQueue.busy = true;
    var epoch = jobQueue.epoch;
    renderQueueStatus();

    // Check the client is actually there before committing to the batch.
    //
    // One extra request per batch, against thirty-four wasted ones - each of
    // which would first fetch a page from jav8.vip, so the saving is in *site*
    // requests as much as client ones. It also converts the failure from a wall
    // of identical messages into one that names the remedy.
    var done = (jobNeedsProbe(job) ? probeClient(epoch) : Promise.resolve(true))
      .then(function (reachable) {
        // A probe that failed, or that was overtaken by a cancel, stops the job
        // here. Its work stays ticked, so fixing the client and pressing Download
        // again is all it takes to retry.
        if (reachable !== true || epoch !== jobQueue.epoch) return;
        // Paused before the job even starts, so nothing is probed and no page is
        // fetched while the user has asked for quiet.
        return waitWhilePaused(epoch).then(function () {
          if (epoch !== jobQueue.epoch) return;
          return job.kind === "collect" ? runCollectJob(job, epoch) : runSendJob(job, epoch);
        });
      });
    Promise.resolve(done).then(
      function () {
        if (epoch !== jobQueue.epoch) return;
        jobQueue.jobs.shift();
        saveQueue();
        jobQueue.busy = false;
        renderQueueStatus();
        pumpQueue();
      },
      function () {
        if (epoch !== jobQueue.epoch) return;
        jobQueue.jobs.shift();
        saveQueue();
        jobQueue.busy = false;
        renderQueueStatus();
      },
    );
  }

  /** Panic button: drop every job, stop anything in flight, forget it all. */
  function cancelAllJobs() {
    if (!jobQueue.jobs.length) {
      log("Nothing queued to cancel.", "wa");
      return;
    }
    var dropped = jobQueue.jobs.length;
    jobQueue.jobs = [];
    jobQueue.busy = false;
    jobQueue.epoch++;
    clearStored(QUEUE_KEY);
    renderQueueStatus();
    log("Cancelled " + dropped + (dropped === 1 ? " job" : " jobs") + ". Nothing further will be sent.", "wa");
  }

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
      // Ticks survive a page change and reach every other tab, so a hand-picked
      // selection is neither lost by clicking through nor invisible elsewhere.
      selectionChanged();
    });
    box.classList.toggle("on", input.checked);
    card.appendChild(box);

    if (info.vr) {
      var badge = el("span", "jd-badge vr", "VR");
      card.appendChild(badge);
    }
  }

  /**
   * Put a "play" button on every card whose work the library already holds.
   *
   * Separate from decorateCard(), which runs once per card and bails on the
   * second call. This one has to be re-runnable: a library sync finishes long
   * after the cards were decorated, and the buttons have to appear then rather
   * than on the next page load - which may be a page the user never visits.
   *
   * The card is an <a>, so the button carries an href of its own and stops the
   * click from reaching the card. stopPropagation() is what does that: the
   * anchor's default action only runs if the event reaches it, and the button's
   * own default (following its href, in a new tab) is untouched. It is a real
   * anchor so middle-click and "open in new tab" work the way a link should.
   */
  function decoratePlays() {
    var on = !!(settings.mediaServer && settings.mediaServer.enabled);
    worksOnPage().forEach(function (card) {
      var href = card.getAttribute("href");
      var info = known.get(href) || workInfoFromCard(card);
      var existing = card.querySelector(".jd-play");
      var hit = on ? mediaServerHit(info.code) : null;
      if (!hit) {
        // Removed rather than left behind: switching the server off, or pointing
        // at one that does not hold this work, must take the buttons with it.
        if (existing) existing.remove();
        return;
      }
      var url = mediaUrl(library.base, hit.id, settings.mediaServer.link);
      if (existing) {
        existing.href = url;
        return;
      }
      var play = el("a", "jd-play", "\u25b6");
      play.href = url;
      play.target = "_blank";
      play.rel = "noopener noreferrer";
      play.title = "Play " + (info.code || "this work") + " from your library";
      // None of these reach the card: the click opens the player in a new tab,
      // and the other four are what would otherwise start a drag or select the
      // cover text on the way past.
      ["click", "auxclick", "mousedown", "mouseup", "contextmenu"].forEach(function (type) {
        play.addEventListener(type, function (event) {
          event.stopPropagation();
        });
      });
      card.appendChild(play);
    });
  }

  /**
   * Is this work already in the configured library?
   *
   * Read through mediaServerHit() rather than the index directly, so the three
   * conditions that make the answer "no" - integration off, no snapshot yet,
   * snapshot from a different server - are all decided in one place.
   */
  function isOwned(href) {
    var info = known.get(href);
    if (!info) return false;
    return !!mediaServerHit(info.code);
  }

  /**
   * Does this card survive the current VR filter?
   *
   * One predicate for hiding cards and for the page-wide buttons, so "select all"
   * cannot quietly disagree with what the filter is showing. When those were
   * separate, selecting all with a filter applied ticked the hidden cards too -
   * the count then claimed more than the user could see, and switching the
   * filter back revealed ticks they had never asked for.
   *
   * Adverts are excluded here, ahead of the VR filter, and are not a setting.
   * They were already never selected for sending - pickMagnet() refuses them -
   * so leaving them visible only ever produced covers that could be ticked and
   * then fail. One rule, applied in one place, for both jobs.
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

  /**
   * Hide the advert cards the site injects into its own listings.
   *
   * Separate from matchesFilter() on purpose. Those cards are not works at all -
   * they carry an off-site href and no .work-title - so they are not in
   * worksOnPage() and the filter never sees them. They are also not subject to
   * the VR filter: an advert is not a VR release that happens to be unwanted, and
   * counting them as "hidden by filter" would name the wrong cause.
   *
   * Runs over every `a.work`, not just the /v/ ones, because that broader set is
   * exactly where the adverts live. Costs nothing: it reads the href the markup
   * already has and never fetches anything.
   *
   * Returns how many it hid, so the panel can say so.
   */
  function hideAdCards() {
    var cards = document.querySelectorAll("a.work");
    var hidden = 0;
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (!isAdCard(card.getAttribute("href"), location.host)) continue;
      card.style.display = "none";
      card.dataset.jdAd = "1";
      hidden++;
    }
    return hidden;
  }

  /**
   * Hidden-card tallies from the last applyFilter().
   *
   * Remembered because most callers of updateCount() have just been asked to
   * redraw the count after something *else* - a tick, a cleared selection - and
   * they know nothing about the filter. Passing nothing used to mean "no hidden
   * cards", so ticking one box made "12 hidden by filter" disappear until the
   * next filter change. The number was on screen a moment ago and it was still
   * true.
   */
  var lastHidden = 0;
  var lastAds = 0;

  function applyFilter() {
    // Adverts first, and counted separately: they are hidden whatever the VR
    // filter is set to, so folding them into "hidden by filter" would be a
    // description of the wrong cause. hideAdCards() is also what applies the
    // hiding - this loop must not clear it again by setting display on cards it
    // does not own.
    var ads = hideAdCards();
    var hidden = 0;
    worksOnPage().forEach(function (card) {
      var info = known.get(card.getAttribute("href"));
      if (!info) return;
      if (matchesFilter(card)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
        hidden++;
      }
    });
    lastHidden = hidden;
    lastAds = ads;
    updateCount(hidden, ads);
    // The buttons carry the filtered count in their label, so they are part of
    // what the filter changes - not just what decorates it.
    requestBulkRefresh();
  }

  function updateCount(hidden, ads) {
    var node = document.querySelector(".jd-count");
    if (!node) return;
    // The two tallies are disjoint now: `hidden` counts works the VR filter
    // removed, `ads` counts the injected advert cards. They were briefly folded
    // together with a subtraction, which is only right while the caller mixes
    // them - and it silently reported a filter count of -3 the moment it did not.
    var byFilter = hidden === undefined ? lastHidden : hidden;
    var adverts = ads === undefined ? lastAds : ads;
    node.textContent = "";
    node.appendChild(document.createTextNode("Selected "));
    node.appendChild(el("b", null, String(selected.size)));
    if (byFilter) node.appendChild(document.createTextNode(" · " + byFilter + " hidden by filter"));
    if (adverts) node.appendChild(document.createTextNode(" · " + adverts + " advert" + (adverts === 1 ? "" : "s") + " hidden"));
  }

  function clearSelection() {
    selected.clear();
    sharedCodes = {};
    // Drops the shared copy too, so Clear in one tab clears all of them - which
    // is the whole reason the selection is shared in the first place.
    dropShared(SHARED_CODES_KEY);
    selectionChanged();
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
   *
   * Bulk selection, and only bulk selection, steps over what the library already
   * holds. "Select all" means "everything on this page", and it is only worth
   * having if it is everything you lack; a work you already own is not work, it
   * is a second download of the same torrent. A hand tick is a deliberate
   * request and is left alone - see pickMagnet() for what it does instead.
   *
   * Returns the ticked count and the skipped count, because a button that
   * silently ticks fewer covers than it names is a button nobody can trust.
   */
  function setPageSelection(on) {
    var cards = selectableCards();
    var ticked = 0;
    var skipped = 0;
    cards.forEach(function (card) {
      var href = card.getAttribute("href");
      if (on && isOwned(href)) {
        skipped++;
        return;
      }
      ticked++;
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
    selectionChanged();
    return { ticked: ticked, skipped: skipped };
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
 * Shared by the queued job and the one-shot path. The VR filter is applied by
 * the same matchesFilter() the listings use, and the size preference by
 * pickMagnet() later, rather than a second copy of either rule here.
 */
  function crawlActress(href, name, button, onCollected, gate) {
    var label = name || href;
    if (button) button.disabled = true;
    log("Collecting works for " + label + "…", "mu");

    function parse(html) {
      return new DOMParser().parseFromString(html, "text/html");
    }

    function loadPage(pageHref) {
      // The gate runs before every page, not once at the start, so a crawl can be
      // paused halfway rather than only between crawls. collectPages() already
      // asks its loader for each page in turn, so this needs no change there.
      var wait = gate ? gate() : null;
      return Promise.resolve(wait)
        .then(function () {
          return getText(new URL(pageHref, location.origin).href);
        })
        .then(parse)
        .catch(function () {
          // A page that will not load ends the crawl and keeps what was already
          // found. Failing the whole thing would throw away a hundred collected
          // works over one bad request.
          return null;
        });
    }

    var start = gate ? gate() : null;
    Promise.resolve(start)
      .then(function () {
        return getText(new URL(href, location.origin).href);
      })
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

  /**
   * Returns a promise so the queue can await it.
   *
   * crawlActress() predates the queue and reports through callbacks; the queued
   * job needs to know when it is finished. Wrapping the callback in a promise
   * keeps one implementation of the traversal rather than two.
   */
  function crawlActressAsync(href, name, button, gate) {
    return new Promise(function (resolve) {
      crawlActress(href, name, button, function (hrefs, result, btn, label) {
        resolve({ hrefs: hrefs, result: result, button: btn, label: label });
      });
    });
  }

  /** Collect job: crawl a performer, then stage what matched the filter. */
  function runCollectJob(job, epoch) {
    log("Collecting works for " + job.label + "…", "mu");
    var gate = function () {
      return waitWhilePaused(epoch);
    };
    return crawlActressAsync(job.base, job.label, null, gate).then(function (outcome) {
      if (epoch !== jobQueue.epoch) return;
      var result = outcome.result;
      if (!result.works.length) {
        log(job.label + ": no works found on any page.", "wa");
        return;
      }
      // Her whole filmography is the one selection that is worth having because
      // it is exhaustive, so it is the one that must not spend a download on a
      // work the user already has. A hand tick is untouched by this - see
      // pickMagnet() for what that does instead.
      var owned = [];
      var keep = outcome.hrefs.filter(function (href) {
        if (!isOwned(href)) return true;
        owned.push(href);
        return false;
      });
      keep.forEach(function (href) {
        selected.add(href);
      });
      // The crawl survives navigation, so the ticks it produced must too - and so
      // must every other tab's.
      selectionChanged();

      var where = pagesPhrase(result.pages);
      warnIfTruncated(result, where, "The works found so far are queued.");
      if (owned.length) {
        log(owned.length + " of her works are already in your library and were left unticked.", "mu");
      }
      if (!keep.length) {
        log(
          job.label + ": " + result.works.length + " works found, but none match " +
            filterScope() + (owned.length ? ", or they are all already in your library" : "") + ".",
          "wa",
        );
        return;
      }

      if (job.mode === "send") {
        // The panel button on her own page sends as it goes, so hand straight
        // over to a send job. Enqueuing rather than calling keeps the traversal
        // and both endings in one place.
        if (!confirmSend(keep.length, job.label)) {
          log("Cancelled - " + job.label + "'s works were not sent.", "wa");
          return;
        }
        enqueue({ kind: "send", label: job.label, hrefs: keep, cursor: 0, sent: 0, failures: 0 });
        log(
          job.label + ": " + keep.length + " of " + result.works.length +
            " works found (" + filterScope() + ", from " + where + "). Sending now.",
          "ok",
        );
        return;
      }
      log(
        job.label + ": " + keep.length + " of " + result.works.length +
          " works queued (" + filterScope() + ", from " + where +
          "). Press Download selected to send them.",
        "ok",
      );
    });
  }

  /**
   * Send job: dispatch a list of works, one at a time, resuming where it left off.
   *
   * The cursor is the whole point. A page change mid-batch must not resend the
   * first thirty-nine works, and must not skip the fortieth either - so the
   * cursor advances after each item is attempted, not before. That makes resume
   * at-least-once: the only item that can be sent twice is one whose request was
   * in flight when the page went away, which is the safe direction to err in.
   */
  function runSendJob(job, epoch) {
    var labels = job.labels || {};
    // New work joins this job rather than starting another, so that ticking a
    // cover in another tab while a batch is in flight does not need a second
    // press of Download - and does not start a second batch racing this one.
    job.joinable = true;
    log("Sending " + pendingIn(job) + " to " + engine().label + "…", "mu");

    function step() {
      if (epoch !== jobQueue.epoch) return Promise.resolve();
      // Asked again on every item, never captured, because the pause can come
      // from another tab at any moment.
      return waitWhilePaused(epoch).then(function () {
        if (epoch !== jobQueue.epoch) return;
        var hrefs = job.hrefs || [];
        if ((job.cursor || 0) >= hrefs.length) {
          // Closed to new work before finishing, or nothing can slip in behind
          // the final untick and be silently dropped.
          job.joinable = false;
          // Only claim the selection is clear if it actually is. A work the user
          // ticked after this batch started, or one that failed and they re-ticked,
          // is still pending and should not be reported as done.
          log(
            "Batch finished: sent " + (job.sent || 0) + ", " + (job.failures || 0) + " failed." +
              (selected.size ? " " + selected.size + " still ticked." : " Selection is clear."),
            (job.failures || 0) ? "wa" : "ok",
          );
          return;
        }
        var href = hrefs[job.cursor];
        // Labels are snapshotted into the job when it is queued, because the
        // `known` map is per page: a resumed batch would otherwise log raw hrefs
        // for every work, because the cards it came from are on a page the tab has
        // since left.
        var label = labels[href] || (known.get(href) || {}).code || sharedCodes[href] || href;
        return sendOne(href, label).then(function (outcome) {
          if (epoch !== jobQueue.epoch) return;
          if (outcome && outcome.ok) job.sent = (job.sent || 0) + 1;
          else job.failures = (job.failures || 0) + 1;
          // Processed is processed: untick it either way, so the selection empties
          // itself as the batch runs and the count doubles as a progress display.
          // Skipped when cancelled - the work was never attempted, so it stays
          // ticked and stays available to retry.
          deselectWork(href);
          job.cursor = (job.cursor || 0) + 1;
          saveQueue();
          renderQueueStatus();
          return new Promise(function (resolve) {
            setTimeout(resolve, REQUEST_GAP_MS);
          }).then(step);
        });
      });
    }
    return step();
  }

  /** Works a send job has yet to attempt. */
  function pendingIn(job) {
    return Math.max(0, (job.hrefs || []).length - (job.cursor || 0));
  }

  /**
   * Offer newly ticked work to the batch that is already running.
   *
   * The set difference is against `job.hrefs`, not against what is left to send,
   * and that is deliberate: a work that has already been sent is still in
   * `job.hrefs`, so if it were unticked and re-ticked - or unticked here and
   * ticked in another tab - it could not be queued a second time. Diffing
   * against the cursor instead would let the same work back into a live batch and
   * send it again.
   */
  function joinRunningJob() {
    var job = jobQueue.jobs[0];
    if (!job || job.kind !== "send" || !job.joinable) return 0;
    // joinableHrefs() reasons about the whole history, which is what stops a
    // finished work being queued twice; see there.
    var joined = joinableHrefs(Array.from(selected), job.hrefs);
    if (!joined.length) return 0;
    job.hrefs = job.hrefs || [];
    job.labels = job.labels || {};
    joined.forEach(function (href) {
      job.hrefs.push(href);
      var code = (known.get(href) || {}).code || sharedCodes[href];
      if (code) job.labels[href] = code;
    });
    saveQueue();
    renderQueueStatus();
    log("+" + joined.length + " more ticked work" + (joined.length === 1 ? "" : "s") + " joined the batch.", "mu");
    return joined.length;
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
          enqueue({ kind: "collect", label: name || href, base: href, mode: "stage" });
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
      // Queued, not run inline: a crawl is several page fetches, and losing it
      // halfway through a navigation would mean starting over.
      enqueue({
        kind: "collect",
        label: name || "this performer",
        base: actressBasePath(),
        mode: "send",
      });
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

  /**
   * Redraw everything that depends on the library snapshot.
   *
   * One funnel, called from every point that can change the answer - a sync
   * finishing, settings being saved, the cache being dropped - so a play button
   * cannot outlive the library entry it points at, and a work page cannot keep
   * claiming a status that a sync has since changed.
   */
  function libraryRepaint() {
    decoratePlays();
    requestMagnetRefresh();
    requestBulkRefresh();
    var status = document.querySelector(".jd-libstatus");
    if (status && status._paint) status._paint();
  }

  /** "just now", "12 min ago", "3 hours ago" - coarse on purpose. */
  function agePhrase(ms) {
    var mins = Math.max(0, Math.round(Number(ms) / 60000));
    if (mins < 1) return "just now";
    if (mins < 60) return mins + " min ago";
    var hours = Math.round(mins / 60);
    return hours + (hours === 1 ? " hour ago" : " hours ago");
  }

  /** One line describing what the script knows about the library. */
  function libraryStatusText() {
    var cfg = settings.mediaServer || DEFAULTS.mediaServer;
    if (!cfg.enabled) return "Off.";
    if (!String(cfg.apiKey || "").trim()) return "No API key set, so the library cannot be read.";
    if (!libraryMatchesServer()) return "Not read from " + mediaServerBase() + " yet.";
    var known = Object.keys(library.index || {}).length;
    if (!library.at) return "Not read yet.";
    return (
      known + " title" + (known === 1 ? "" : "s") + " recognised · read " +
      agePhrase(Date.now() - library.at)
    );
  }

  /**
 * Redraw the queue row.
 *
 * Kept outside buildPanel() because the queue is driven from many places - a
 * crawl finishing, a send advancing, a cancel - and none of them should have to
 * know whether the panel happens to exist yet.
 */
  function renderQueueStatus() {
    var paused = isPaused();
    // The Pause button is a control whose label states what it will do, so it has
    // to be right in every tab - including a tab that paused nothing itself and
    // only heard about it over the storage event.
    // A dedicated class rather than ".ghost": Settings is a ghost button too, and
    // "the first ghost button in the foot" is not a name worth depending on.
    var pauseBtn = document.querySelector(".jd-foot .jd-pause");
    if (pauseBtn) {
      pauseBtn.textContent = paused ? "Start" : "Pause";
      pauseBtn.classList.toggle("jd-btn-warn", paused);
    }
    var row = document.querySelector(".jd-queue");
    if (!row) return;
    var summary = queueSummary();
    row.style.display = summary ? "flex" : "none";
    if (summary) row.querySelector(".jd-queue-text").textContent = summary;
    var go = document.querySelector(".jd-foot .jd-btn");
    if (go) go.textContent = jobQueue.busy ? (paused ? "Paused" : "Sending…") : "Download selected";
  }

  /** Ask the panel to redraw the page-wide buttons, if it has been built yet. */
  /**
   * Repaint the tag toggles from settings.
   *
   * Its own funnel rather than riding on requestBulkRefresh(), because that one
   * fires on every tick and these are not selection state.
   */
  function requestTagRefresh() {
    var row = document.querySelector(".jd-tags");
    if (row && row._paint) row._paint();
  }

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

  /**
 * Untick one work once it has been processed.
 *
 * Called after every item, successful or not. The point is that a batch should
 * empty itself as it goes: the user should never have to clear a finished
 * selection by hand to work out what is left, and the count counting down is the
 * progress display. A failure is still named in the log, so nothing becomes
 * invisible, and re-ticking it is one click if they want to retry.
 *
 * Returns whether the work was actually still ticked, so a caller can tell a
 * no-op from a real change.
 */
function deselectWork(href) {
    var removed = selected.delete(href);
    // Driven off the page's own cards rather than a stored node reference, so a
    // work queued on a previous page and processed on this one still unticks.
    worksOnPage().forEach(function (card) {
      if (card.getAttribute("href") !== href) return;
      var box = card.querySelector(".jd-box");
      if (!box) return;
      var input = box.querySelector("input");
      if (input) input.checked = false;
      box.classList.remove("on");
    });
    if (!removed) return false;
    // Through the shared funnel, so a finished work disappears from the count in
    // every tab and any tab that has a batch running sees the change.
    selectionChanged();
    return true;
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
      // Different client, so the last answer says nothing about this one.
      targetReachable = false;
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

    // Release-tag preferences. One row of toggles, each a requirement the user
    // switches on; the AI veto is on by default and reads differently on purpose,
    // because it removes releases rather than demanding them.
    var tagRow = el("div", "jd-tags");
    var TAG_BUTTONS = [
      { key: "uncensored", label: "\u7121\u78bc", title: "Only send uncensored releases when the work offers one." },
      { key: "chinese", label: "\u4e2d\u5b57", title: "Only send releases with Chinese subtitles when the work offers one." },
      { key: "uhd", label: "4K", title: "Only send 4K releases when the work offers one." },
      { key: "skipAI", label: "no AI", title: "Skip AI-generated releases. On by default; ignored if every release is AI." },
    ];
    function paintTags() {
      tagRow._buttons.forEach(function (b) {
        // b._tagKey, not b.key: the button has to carry its own settings key, or
        // this reads settings.tags[undefined] and every button looks off forever.
        b.classList.toggle("on", !!settings.tags[b._tagKey]);
      });
    }
    TAG_BUTTONS.forEach(function (spec) {
      var btn = el("button", "jd-btn ghost jd-tag", spec.label);
      btn.type = "button";
      btn.title = spec.title;
      btn._tagKey = spec.key;
      btn.addEventListener("click", function () {
        settings.tags[spec.key] = !settings.tags[spec.key];
        paintTags();
        persist();
        // The highlighted magnet on a work page is chosen by the same rule, so it
        // has to move with the toggle or the panel asserts a release the next
        // send would not choose.
        requestMagnetRefresh();
      });
      tagRow.appendChild(btn);
      tagRow._buttons = (tagRow._buttons || []).concat([btn]);
    });
    tagRow.title =
      "Release tags, matched from the magnet filename. Each one narrows the choices; " +
      "none of them will skip a work outright if the work offers nothing matching.";
    tagRow._paint = paintTags;
    paintTags();
    body.appendChild(tagRow);

    var count = el("div", "jd-count");
    body.appendChild(count);

    // Page-wide selection. Scoped to this page on purpose: `selected` is keyed by
    // href and is cleared per navigation, so "all" can only ever mean the works
    // in front of the user.
    var bulk = el("div", "jd-bulk");
    var selectAll = el("button", "jd-btn ghost", "Select all");
    selectAll.type = "button";
    // Named Clear, and it clears everything.
    //
    // The old pair was Clear and Deselect all, which are not the same thing:
    // Deselect all only unticked what the VR filter was showing, so with a
    // filter set there was no way to untick the rest in one click. Two buttons
    // whose names did not say which was which was the actual problem, so this is
    // one button that always clears completely.
    var clearBtn = el("button", "jd-btn ghost", "Clear");
    clearBtn.type = "button";

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
      // The count on the button is what the click will actually tick, not what
      // is on the page. A bulk action that steps over owned works has to say so
      // on its face: "Select all (34)" that ticks 28 is the same lie as a button
      // that ignores the filter, and the title is the only place that can
      // explain why without a paragraph on the button itself.
      var owned = settings.mediaServer && settings.mediaServer.enabled
        ? cards.filter(function (card) {
            return isOwned(card.getAttribute("href"));
          }).length
        : 0;
      var tickable = cards.length - owned;
      selectAll.textContent = tickable ? "Select all (" + tickable + ")" : "Select all";
      selectAll.title = !cards.length
        ? "Nothing to select"
        : "Tick " + tickable + " " + scoped +
          (total > cards.length ? " (of " + total + " works)" : "") +
          (owned ? " · " + owned + " already in your library, left alone" : "");
      var hidden = total - cards.length;
      clearBtn.title = selected.size
        ? "Untick all " + selected.size + " selected works, including " + hidden +
          " hidden by the filter"
        : "Nothing is ticked";
      clearBtn.disabled = !selected.size;
      selectAll.disabled = !tickable;
    }

    // Exposed so the rest of the script can refresh the labels when the filter
    // or the card list changes, without buildPanel() having to own that.
    bulk._refresh = refreshBulkButtons;

    selectAll.addEventListener("click", function () {
      // Guarded rather than assumed: a listing that renders after the panel is
      // built has no cards to act on, and claiming "selected 34" would be a lie
      // the count would immediately contradict.
      var out = setPageSelection(true);
      if (!out.ticked && !out.skipped) {
        log("No works match the current filter.", "wa");
      } else if (out.skipped) {
        log(
          "Ticked " + out.ticked + ", skipped " + out.skipped +
            " already in your library. Tick one by hand to upgrade it instead.",
          "mu",
        );
      }
    });
    clearBtn.addEventListener("click", function () {
      // Reaches every tab on its own; the extra refresh is only for this page's
      // card list, which is this tab's business.
      clearSelection();
      requestBulkRefresh();
    });
    bulk.appendChild(selectAll);
    bulk.appendChild(clearBtn);
    body.appendChild(bulk);

    // Her whole career, from whichever page of it the user happens to be on.
    addCareerButton(body);
    // Disabled from the outset: a work page has no cards at all, and decorateAll()
    // - the only other caller of refreshBulkButtons() - never runs there. Without
    // this they sit enabled next to an empty grid and do nothing when clicked.
    selectAll.disabled = true;
    clearBtn.disabled = true;

    // Queue status and the panic button. Only visible while something is
    // actually queued, so it cannot be hit when there is nothing to cancel.
    var queueRow = el("div", "jd-queue");
    var queueText = el("span", "jd-queue-text");
    var cancelAll = el("button", "jd-btn danger", "Cancel all");
    cancelAll.type = "button";
    cancelAll.title = "Stop every crawl and every download queue. Anything already sent stays sent.";
    cancelAll.addEventListener("click", cancelAllJobs);
    queueRow.appendChild(queueText);
    queueRow.appendChild(cancelAll);
    queueRow.style.display = "none";
    body.appendChild(queueRow);
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
    // In the foot rather than the queue strip, because pause outlives any one
    // job: it is a session-wide setting, so it has to be reachable when nothing
    // is queued - including before you queue anything.
    var pauseBtn = el("button", "jd-btn ghost jd-pause", "Pause");
    pauseBtn.type = "button";
    pauseBtn.title = "Hold every crawl and every download in every tab. Nothing is fetched while paused.";
    pauseBtn.addEventListener("click", function () {
      var next = !isPaused();
      setPaused(next);
      log(next ? "Paused. Nothing will be crawled or sent until you press Start." : "Started.", next ? "wa" : "ok");
    });
    var cfg = el("button", "jd-btn ghost", "Settings");
    cfg.addEventListener("click", openSettings);
    foot.appendChild(go);
    foot.appendChild(pauseBtn);
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
  /**
   * Fetch one work, choose a magnet, send it, log the outcome.
   *
   * One item, no loop: shared by the queued send job and the one-shot path so
   * there is a single definition of what "sending a work" means. Returns a
   * promise that always resolves - a failed item must not stop the batch.
   */
  /**
   * How to name a relaxed tag preference in a log line.
   *
   * Keys would be unreadable in the one place the user is actually looking.
   */
  var TAG_LABEL = {
    uncensored: "uncensored",
    chinese: "Chinese subtitles",
    uhd: "4K",
    skipAI: "skip-AI",
  };

  /**
   * The preferences this work could not satisfy, as a readable noun list.
   *
   * Just the names, because the log and the work-page note frame them
   * differently and a shared clause collided with the note's own prefix. The four
   * labels are a mixture of adjectives and nouns, which is why neither "no X
   * release" nor "X release" frames all of them; "matches X" does.
   */
  function relaxedNames(relaxed) {
    if (!relaxed || !relaxed.length) return "";
    return relaxed
      .map(function (key) {
        return TAG_LABEL[key] || key;
      })
      .join(" or ");
  }

  /**
   * The tag preferences, plus an upgrade instruction when the library already
   * holds the work.
   *
   * A fresh object every time: `settings.tags` is the live settings object, and
   * adding a field to it would persist an upgrade rule as if it were a tag.
   *
   * `upgradeFrom` is a number, and 0 is meaningful - it means "held, size
   * unknown" - so the presence check is against undefined/null and not against
   * falsiness. Getting that wrong would silently turn every size-less item into
   * an ordinary pick, which is the duplicate download this exists to prevent.
   */
  function prefsFor(hit) {
    var prefs = {};
    var tags = settings.tags || {};
    Object.keys(tags).forEach(function (k) {
      prefs[k] = tags[k];
    });
    if (hit) prefs.upgradeFrom = hit.size > 0 ? hit.size : 0;
    return prefs;
  }

  function sendOne(href, label) {
    var target = engine();
    return fetchMagnets(href)
      .then(function (detail) {
        // Looked up here rather than captured when the work was ticked: a tick
        // and the send can be minutes and one library sync apart, and the answer
        // that matters is the one at the moment of sending.
        var hit = settings.mediaServer && settings.mediaServer.enabled
          ? mediaServerHit(detail.code)
          : null;
        var picked = pickMagnet(
          detail.magnets,
          settings.minSize,
          settings.maxSize,
          settings.preferredSize,
          prefsFor(hit),
        );
        if (!picked.magnet) {
          if (picked.reason === "already-owned") {
            return {
              ok: false,
              reason: "already in your library at " + formatSize(hit.size) +
                " and no release here is a real upgrade, so nothing was sent",
            };
          }
          return { ok: false, reason: picked.reason === "ads-only" ? "only advert magnets" : "no magnets on this page" };
        }
        if (picked.reason === "upgrade") {
          log(
            label + ": already in your library" +
              (hit.size > 0 ? " at " + formatSize(hit.size) : "") +
              ", taking the next release up",
            "mu",
          );
        } else if (picked.reason === "outside-window") {
          log(label + ": " + formatSize(picked.magnet.size) + " is outside your size window", "wa");
        }
        var relaxed = relaxedNames(picked.relaxed);
        if (relaxed) log(label + ": nothing here matches " + relaxed + ", so sent the best available", "wa");
        return target.send(picked.magnet).then(
          function (result) {
            return { ok: true, text: result, size: picked.magnet.size };
          },
          function (err) {
            // The client just refused, so the probe's "reachable" is stale. Clear
            // it so the next batch checks again rather than skipping the check on
            // a yes that no longer holds.
            targetReachable = false;
            return { ok: false, reason: describeSendError(err) };
          },
        );
      })
      .catch(function (err) {
        return { ok: false, reason: describeSendError(err) };
      })
      .then(function (outcome) {
        if (outcome.ok) log(label + " → " + outcome.text + "  (" + formatSize(outcome.size) + ")", "ok");
        else log(label + ": " + outcome.reason, "er");
        return outcome;
      });
  }

  /**
   * Say which of the two systems failed.
   *
   * Reading the site and talking to the client are independent steps; a bare
   * error message does not reveal which one broke, and the fixes are unrelated.
   */
  function describeSendError(err) {
    var reason = err && err.message ? err.message : String(err);
    return err && err.fromSite ? "could not read this page from jav8.vip: " + reason : reason;
  }

  /**
   * Ask before queueing a large send.
   *
   * One place, because three call sites had the same dialog copy-pasted and would
   * eventually disagree about what it said. Below the threshold it never appears,
   * so the common case is untouched.
   */
  function confirmSend(count, what) {
    if (!needsConfirmation(count)) return true;
    return window.confirm(
      "Send " + count + " works" + (what ? " (" + what + ")" : "") + " to " + engine().label + "?\n\n" +
        "That is " + count + " page requests to jav8.vip, one after another. " +
        "If you did not mean to queue this many, press Cancel.",
    );
  }

  /**
   * Queue the ticked works for sending.
   *
   * Goes through the job queue rather than running inline so that navigating
   * away mid-batch does not lose the rest of it. The cursor is already part of
   * the job, so a job started here resumes on the next page exactly where it
   * stopped.
   */
  function runSelection(button) {
    if (!selected.size) {
      log("Nothing ticked yet.", "wa");
      return;
    }
    var hrefs = Array.from(selected);
    if (!confirmSend(hrefs.length)) {
      log("Cancelled - " + hrefs.length + " works were not sent.", "wa");
      return;
    }
    enqueue({ kind: "send", label: "selection", hrefs: hrefs, cursor: 0, sent: 0, failures: 0 });
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
        // Always present and hidden when not held, for the same reason the note
        // below is: a library sync can finish after this panel is built, and a
        // page that keeps saying "not in your library" while the play buttons
        // appear on the listing behind it is a contradiction the user has to
        // resolve by hand.
        var inLib = el("span");
        inLib.style.display = "none";
        head.appendChild(inLib);
        box.appendChild(head);

        /**
         * The library entry for this work, asked for afresh every time.
         *
         * Not captured at load: the snapshot can arrive, expire or be pointed at
         * a different server while the page sits open, and the answer that
         * matters is the current one.
         */
        function libraryNow() {
          if (!settings.mediaServer || !settings.mediaServer.enabled) return null;
          return mediaServerHit(detail.code);
        }

        var picked = pickMagnet(
          detail.magnets,
          settings.minSize,
          settings.maxSize,
          settings.preferredSize,
          prefsFor(libraryNow()),
        );

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
          var hit = libraryNow();
          var now = pickMagnet(
            detail.magnets,
            settings.minSize,
            settings.maxSize,
            settings.preferredSize,
            prefsFor(hit),
          );
          Array.prototype.forEach.call(rows.children, function (row) {
            row.classList.toggle("pick", !!(now.magnet && row.dataset.jdUri === now.magnet.uri));
          });

          // The link is rebuilt only when it would actually change: this runs on
          // every slider move, and replacing a focused link under the cursor
          // would drop the focus of anyone tabbing through the panel.
          var url = hit ? mediaUrl(library.base, hit.id, settings.mediaServer.link) : "";
          if (inLib._url !== url) {
            inLib._url = url;
            inLib.textContent = "";
            if (hit) {
              inLib.appendChild(document.createTextNode(" · "));
              var play = el("a", "jd-inlib", "\u25b6 play from your library");
              play.href = url;
              play.target = "_blank";
              play.rel = "noopener noreferrer";
              inLib.appendChild(play);
            }
            inLib.style.display = hit ? "" : "none";
          }

          var note = box.querySelector(".jd-window-note");
          if (note) {
            // Both reasons can apply at once, and then both have to be said.
            var parts = [];
            var held = hit ? (hit.size > 0 ? " at " + formatSize(hit.size) : "") : "";
            if (now.reason === "already-owned") {
              parts.push(
                "Already in your library" + held +
                  ", and nothing here is a larger release, so nothing would be sent.",
              );
            } else if (now.reason === "upgrade") {
              parts.push(
                "Already in your library" + held +
                  ", so this is the next release up rather than the one you have.",
              );
            }
            if (now.reason === "outside-window") {
              parts.push(
                "No magnet fell inside " + formatSize(settings.minSize) + "–" +
                  formatSize(settings.maxSize) + "; the largest real one was used.",
              );
            }
            var tagNames = relaxedNames(now.relaxed);
            if (tagNames) {
              parts.push("Nothing here matches " + tagNames + ", so that preference was set aside.");
            }
            note.textContent = parts.join(" ");
            note.style.display = parts.length ? "" : "none";
          }
        };
        rows._repick();
        // The panel may not exist yet when this page was decorated first.
        requestMagnetRefresh();

        // Always present, hidden when empty. Created only on demand it could not
        // be written into later, and a relaxed tag preference - the common case -
        // went unexplained.
        if (picked.reason !== "ads-only") {
          var note = el("div", "jd-wa jd-window-note");
          note.style.display = "none";
          box.appendChild(note);
          // Written once here so it is correct before any toggle is touched;
          // _repick() keeps it in step from then on.
          rows._repick();
        }
        if (picked.reason === "ads-only") {
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

    /**
     * One settings group.
     *
     * `bucket` is the storage key for the group: `aria2`, `qbittorrent`, or
     * `mediaServer`. Text and number fields show the vendor default as a
     * placeholder and hold the user's own value only, so an untouched field is
     * visibly untouched. Checkboxes and selects cannot express "empty means
     * default", so they always carry a value.
     */
    function section(title, bucket, fields) {
      var wrap = el("div", "jd-set");
      wrap.appendChild(el("h4", null, title));
      var defaults = DEFAULTS.downloaders[bucket] || DEFAULTS[bucket] || {};
      fields.forEach(function (field) {
        var label = el("label");
        label.appendChild(el("span", null, field.label));
        var input = el(field.type === "select" ? "select" : "input");
        if (field.type === "checkbox") {
          input.type = "checkbox";
        } else if (field.type !== "select") {
          input.type = field.secret ? "password" : field.type || "text";
        }
        if (field.type === "select") {
          field.options.forEach(function (pair) {
            var option = el("option", null, pair[1]);
            option.value = pair[0];
            input.appendChild(option);
          });
        }
        var fallback = defaults[field.key];
        var mine = overrideFor(bucket, field.key);
        if (field.type === "checkbox") {
          input.checked = mine === undefined ? !!fallback : !!mine;
        } else if (field.type === "select") {
          input.value = String(mine === undefined ? fallback : mine);
        } else {
          // Placeholder is the vendor default; the value is only the user's own
          // override, so an untouched field is visibly untouched.
          input.placeholder = fallback === "" || fallback === undefined ? field.placeholder : String(fallback);
          input.value = mine === undefined ? "" : String(mine);
        }
        inputs[bucket + "." + field.key] = { input: input, spec: field };
        label.appendChild(input);
        wrap.appendChild(label);
      });
      box.appendChild(wrap);
      return wrap;
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

    box.appendChild(el("h3", null, "Jellyfin / Emby (optional)"));
    box.appendChild(
      el(
        "p",
        "hint",
        "Read-only. With this on, works already in your library are marked with a " +
          "play button, left out of Select all, and upgraded rather than re-downloaded " +
          "when you tick one by hand. Needs an API key from the server's dashboard " +
          "(Dashboard → API Keys). Leave it off and nothing here is used.",
      ),
    );

    var mediaSection = section("Server", "mediaServer", [
      { key: "enabled", label: "Enabled", type: "checkbox" },
      { key: "host", label: "Host", placeholder: "http://localhost" },
      { key: "port", label: "Port", type: "number", placeholder: "8096" },
      { key: "apiKey", label: "API key", secret: true, placeholder: "(from the dashboard)" },
      { key: "library", label: "Library", placeholder: "all libraries" },
      {
        key: "link",
        label: "Open link",
        type: "select",
        options: [
          ["play", "Play directly"],
          ["play-legacy", "Play directly (Jellyfin 10.8 and older)"],
          ["details", "Item page"],
        ],
      },
    ]);

    mediaSection.appendChild(
      el(
        "p",
        "hint",
        "Name one library (for example JAV) to read only that one. Leave it blank " +
          "to read everything, which works but asks for a lot more: on a server " +
          "holding films and television too, one library was 582 items out of 15,288.",
      ),
    );

    var status = el("div", "jd-count jd-libstatus");
    status._paint = function () {
      status.textContent = "Library: " + libraryStatusText();
    };
    mediaSection.appendChild(status);

    var syncRow = el("div", "jd-actions");
    var syncBtn = el("button", "jd-btn ghost", "Read library now");
    syncBtn.type = "button";
    syncBtn.addEventListener("click", function () {
      // Collected first, so the button reads the address that is on screen
      // rather than the one that was saved last time.
      collect();
      syncBtn.disabled = true;
      syncLibrary().then(function () {
        syncBtn.disabled = false;
      });
    });
    syncRow.appendChild(syncBtn);
    mediaSection.appendChild(syncRow);
    status._paint();

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
      // Rebuild the sparse override maps from what is currently in the form:
      // blank means "vendor default", so the key is dropped entirely. The media
      // server is a sibling of `downloaders`, not an entry in it - that object
      // is a list of places to *send* a magnet, and this is not one.
      var downloaders = {};
      var mediaServer = {};
      Object.keys(inputs).forEach(function (key) {
        var bucket = key.split(".")[0];
        var field = inputs[key];
        var spec = field.spec;
        var target;
        if (bucket === "mediaServer") {
          target = mediaServer;
        } else {
          if (!downloaders[bucket]) downloaders[bucket] = {};
          target = downloaders[bucket];
        }
        if (spec.type === "checkbox") {
          target[spec.key] = field.input.checked;
          return;
        }
        if (spec.type === "select") {
          target[spec.key] = field.input.value;
          return;
        }
        var raw = field.input.value.trim();
        if (raw === "") {
          delete target[spec.key];
          return;
        }
        target[spec.key] = spec.type === "number" ? Number(raw) : raw;
      });
      storedSettings = { ...storedSettings, downloaders: downloaders, mediaServer: mediaServer };
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
      // The client may have just been given a new address or password, so the
      // last "reachable" describes a configuration that no longer exists.
      targetReachable = false;
      persist();
      // The library snapshot belongs to the server it was read from, so a
      // changed address has to invalidate it rather than leave the last server's
      // titles answering for this one. Read again straight away, because the
      // user has just told the script where to look and a play button that only
      // appears on the next page load reads as the setting not working.
      if (!libraryMatchesServer()) {
        dropLibrary();
        libraryRepaint();
        if (settings.mediaServer.enabled) syncLibrary();
      } else {
        libraryRepaint();
      }
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
    // After the ticks, because the play button is positioned relative to the
    // same card and must never end up underneath one.
    decoratePlays();
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

    // Restore before the panel is built, because the panel reads the queue and
    // the pause flag to decide what to show.
    restoreSelection();
    loadQueue();
    // The cached library, before any card is decorated, so a page load paints
    // its play buttons from the cache instead of waiting for a request.
    readLibrary();
    // Live sync from sibling tabs. Registered once, and its handler only ever
    // reads - see onSharedChange().
    window.addEventListener("storage", onSharedChange);

    buildPanel();
    renderQueueStatus();

    // Before the detail-page branch below, which returns early. One request per
    // six hours, or none at all when the snapshot is fresh.
    syncLibraryIfStale();

    // Hide the site's own advert cards here rather than only inside
    // decorateAll(), because decorateAll() gives up on a route with no works and
    // these are not works - a listing of nothing but adverts would keep them.
    hideAdCards();

    // Anything left over from the previous page in this tab picks up where it
    // stopped. The job carries its own cursor, so this does not resend work that
    // already went out.
    if (jobQueue.jobs.length) {
      var resumed = queuedWorkCount();
      log(
        "Resuming " + jobQueue.jobs.length + (jobQueue.jobs.length === 1 ? " job" : " jobs") +
          (resumed ? " · " + resumed + " works left" : "") + ".",
        "mu",
      );
      pumpQueue();
    }

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

    // The advert injector runs inline during parsing, so the cards normally exist
    // before any of the above. This second pass covers the routes where the
    // listing arrives later than that, and is worth its cost: one
    // querySelectorAll and an href comparison, with no requests.
    setTimeout(function () {
      if (!isDetailPage()) {
        hideAdCards();
        requestBulkRefresh();
      }
    }, 1200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
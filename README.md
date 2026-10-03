# JAV8 Downloader (userscript)

A Chrome-compatible userscript for [jav8.vip](https://jav8.vip). Tick covers to
queue them, filter by VR, pick the best magnet by size, and hand the result to
aria2 or qBittorrent. Settings live in the browser — there is no config file.

> This is a standalone project. It was developed inside `jav-scraper` and split
> out; see [Relationship to jav-scraper](#relationship-to-jav-scraper).

## Install

1. Install a userscript manager: **Tampermonkey** or **Violentmonkey**.
   (Chrome's built-in "Developer mode" snippets cannot reach a local aria2 —
   see [Why a userscript manager is required](#why-a-userscript-manager-is-required).)
2. Open `jav8-downloader.user.js` → the manager offers to install it.
3. Reload any listing on jav8.vip.

## Use

On any listing page (`/latest`, `/updated`, rankings, search, actress, studio,
genre) a small tick box appears on every work cover.

1. Tick the covers you want. VR releases get a `VR` badge in the corner.
2. Pick a client, a filter and a preferred size in the panel (top right).
3. **Download selected**. Each work is opened, its magnets are read, one is
   chosen, and it is sent to your client.

On a work page (`/v/123456`) the panel lists every magnet with its parsed size,
sorted largest first. The one that would be chosen is highlighted; adverts are
dimmed and tagged. Click any size to send that specific magnet.

### Select all / Deselect all

Two buttons under the count tick and untick **every work currently showing on
this page at once**. They work the same on `/updated`, the rankings, search and
`/actress/<id>`, because they act on the cards actually present rather than on
any hardcoded listing.

**They follow the VR filter.** With `VR only` set, `Select all` ticks only the
VR works and the button reads `Select all (3)`; with `non-VR only` it reads
`Select all (14)`. Cards hidden by the filter are left alone in both directions,
so switching the filter back never reveals a tick you did not ask for.

Both buttons are disabled where there is nothing to select, which is the case on
a work page.

### Performer index — download a whole career

On [jav8.vip/top-actresses](https://jav8.vip/top-actresses) every performer tile
gets a small **＋** button. It crawls **all** of that performer's pages —
following `?page=N` until the pagination link disappears — and stages every work
it finds.

- **Staged, not sent.** Nothing reaches your client until you press
  **Download selected**, so you can see the count first. A career can be a
  hundred works.
- **The VR filter applies**, and the count says how many matched:
  `29 of 29 works queued (VR only, from 2 pages)`.
- **The size preference applies** when each is sent, via the same `pickMagnet()`
  the listings use.
- The crawl stops at the last page, at 40 pages, if a page fails to load, or if
  the pagination ever loops. A page that fails keeps everything found so far
  rather than discarding the lot.

### Preferred size

A single slider, replacing the old `Min` and `Max` boxes. Every stop is a round
number from 1 GB to 50 GB; the default is 5 GB.

Both bounds are derived from it as `preferred ÷ 10` and `preferred × 10`, so the
5 GB stop means "between 512 MB and 50 GB". The readout under the slider spells
the window out, since moving one stop shifts both ends.

The floor is kept tight on purpose. Its job is skipping 200 MB samples, and a
500 MB floor did that; a window centred on 5 GB with a 500 MB–100 GB spread would
have been too wide to be meaningful. Within the window the **largest** real
release wins — among releases that clear the floor, you want the full-quality
one.

If nothing lands inside the window, the largest real release is still used and
the log says so, rather than silently downloading nothing.

> 1.0 stored a `minSize`/`maxSize` pair. Those keys are dropped on first load and
> the slider is positioned to preserve the old **floor**; the ceiling follows the
> ladder. A geometric mean was not used, because a 500 MB–100 GB window centres
> near 240 MB and would have handed back a window far narrower than you had.

### Filters

`All` / `non-VR only` / `VR only`. Non-matching cards are hidden rather than
greyed out; the count in the panel says how many were hidden.

## Download clients

Configure in **Settings** inside the panel. Vendor defaults are shown as
placeholders and are applied whenever a field is left empty:

| Client | Host | Port | Auth |
| --- | --- | --- | --- |
| aria2 | `http://localhost` | 6800 | RPC secret (none) |
| qBittorrent | `http://localhost` | 8080 | `admin` / `adminadmin` |

These are stock-install defaults, not credentials. Only what you type is
persisted, so an empty box always means "use the default".

**Test connection** probes the selected client without saving. **Defaults**
clears every override.

If your client is not on `localhost`, nothing needs doing: the script ships
`@connect *`, so it can reach any download client you can. Just set the host in
Settings.

The narrower alternative — one `@connect` line per client — was tried first and
rejected. `@connect` is read **once, when your manager installs the script**, so
it cannot be filled in at runtime, and a user who has to edit the script to make
it work has a script that does not work. There is no middle ground: a subnet
wildcard such as `@connect 192.168.*` is not a valid value and silently grants
nothing, so it looks configured while blocking every request.

**What `*` costs.** The script may send a privileged request to any host the
browser can reach. In practice it talks only to your download client and to
jav8.vip, and sends no page content anywhere. To narrow it, replace the line
with the hosts you actually run:

```
@connect localhost
@connect 127.0.0.1
@connect 192.168.1.50
```

If a request is ever refused, the panel names the exact host it wanted.

## How it decides

Every rule below was measured against the live site rather than guessed. The
probes are reproducible: `tools/fetch_fixtures.py` re-captures the
fixtures the tests use.

**Which cards get a tick.** `a.work[href^="/v/"]` containing a
`img.work-cover`. The site injects promotional cards with absolute hrefs via
`adworker`, so requiring the `/v/` prefix skips them. Cards in the studio strip
have no cover image and are left alone.

**Magnet sizes** come from `.magnet-size` (`5.37GB`). Parsed as 1024-based, so
`4GiB` and `4GB` agree — torrent sites label GiB as "GB" almost everywhere, and
one consistent basis keeps every comparison self-consistent.

**Adverts.** A meaningful share of magnet entries are adverts. Over 262 real
entries they separate cleanly on three signals:

| Tier | Signal | Treatment |
| --- | --- | --- |
| `AD` | contains `▷`/`▶`, or `夸克`/`無广告`/`旗舰APP` | never auto-selected |
| `SUS` | contains `@` | used only if nothing better exists |
| clean | a plain catalog name | preferred |

`第一會所新片@SIS001@DDH-451` and `ALDN-433.[4K]@R90s` are the `SUS` cases — note
that nothing follows the `@` but a dotted domain, which is why the rule looks for
a bare `@` rather than a domain after it. Across the sample, no clean release
contained an `@` and no advert escaped both rules.

**VR.** Signalled three ways, and they disagree:

| Signal | Recall |
| --- | --- |
| `【VR】` in the title | 17/17 known VR releases |
| `VR` in the code prefix (`MDVR-`, `SAVR-`, `PXVR-`) | 6 more the title missed |
| hand-listed prefix set | only 6 of 26 — **not used** |

Title **or** code pattern is the rule. The code pattern produced zero false
positives across 98 flat releases, so adding it is safe; a curated prefix list
was tried first and abandoned because it silently missed most VR releases.

`第一人称` (first person) appears on plenty of ordinary flat releases and is
**not** a VR signal. Do not add it.

## Tests

```bash
npm test                            # pure + parity, no browser, no network
node test/harness.mjs 8980          # serve the fixtures for a browser
python tools/fetch_fixtures.py      # re-capture the fixtures
```

Harness routes: `/updated`, `/genre/353` (VR), `/actress/18787`,
`/actress/58956` (two pages, for autopagination), `/top-actresses`, `/v/557564`.
Add `?v5=1` to make the qBittorrent stub answer like a 5.x server, and
`?nocookie=1` to simulate a manager that hides `Set-Cookie`.

| File | What it covers |
| --- | --- |
| `test/pure.test.mjs` | size parsing and formatting, VR detection, magnet classification against 262 real names, selection and window behaviour, the slider ladder and its one-off migration from the old Min/Max boxes, host/port composition, the host guard, autopagination traversal (last page, page cap, failed page, loops, duplicates), qBittorrent cookie parsing against real `Set-Cookie` headers from a live 5.2.3, login acceptance across versions, and the failure messages |
| `test/parity.test.mjs` | `spec/site.json` against the constants inlined in the userscript |
| `test/harness.mjs` | serves captured pages with a `GM_*` shim for browser testing |
| `test/load-userscript.mjs` | shared loader that slices the `pure:start`/`pure:end` region out of the userscript |

Both test files read the logic out of the userscript rather than importing a
copy, so there is no second implementation to drift. `parity.test.mjs` exists
because the userscript has to ship as a single file: the selectors, vendor
defaults and detection patterns are inlined in it, and without a check the spec
would quietly start describing behaviour the script no longer has.

`harness.mjs` serves captured pages on one origin plus stub aria2 and qBittorrent
endpoints, so tests exercise real markup and never queue a torrent on your
machine. It applies exactly one substitution to the script:

```
isTargetHost(location.hostname)  ->  isTargetHost("jav8.vip")
```

The harness runs on `localhost`, so the host guard would otherwise return early.
The guard's *logic* is unit tested separately, including the `notjav8.vip` and
`jav8.vip.evil.com` traps — only the hostname lookup is bypassed.

## Relationship to jav-scraper

This project was split out of `jav-scraper`, which is a Python server with its
own web dashboard. The two are independent and can be used separately.

What they genuinely share is *knowledge of the site*, not code — one is
JavaScript, the other Python. That knowledge is written down in
`spec/site.json`: the selectors, the vendor downloader defaults, the VR signals
and the advert markers.

| Fact | Here | In jav-scraper |
| --- | --- | --- |
| Listing card | `SELECTORS.card` | `scraper.py` → `.work` |
| Magnets and sizes | `SELECTORS.magnet*` | `scraper.py` → `.magnet`, `.magnet-size` |
| Vendor downloader defaults | `DEFAULTS.downloaders` | `downloaders.py` → `VENDOR_DEFAULTS` |
| VR detection | `isVr()` — title marker **or** code pattern | `scraper.py` → a plain `"vr" in title` substring test |
| Advert filtering | `classifyMagnet()` | none |

The VR rules differ on purpose, and jav-scraper is the weaker one: a plain
`"vr" in title` test misses the 6 releases in this project's sample that carry
no `【VR】` marker in the magnet title, and would misclassify any release whose
title happens to contain the letters "vr". Porting `isVr()` across is the
obvious first improvement if the two are ever reconciled — the measured numbers
are in the table above and in `spec/site.json`.

## Why a userscript manager is required

aria2 and qBittorrent send no CORS headers, so a `fetch()` from the page cannot
reach them. `GM_xmlhttpRequest` is the privileged cross-origin request that
makes this work at all. Without a userscript manager the panel still renders and
sizes still parse, but sending fails with an explanatory message rather than a
mystery.

### qBittorrent specifics

Four things about qBittorrent are measured against a live **v5.2.3** WebUI rather
than assumed, and each one broke the client silently before:

| Behaviour | Why it matters |
| --- | --- |
| Any request with a cross-site `Origin` or `Referer` gets **401** | A privileged request inherits both from the page. The script sets both to the client's own base URL, which its documentation prescribes. |
| Cookie is `QBT_SID_<port>` on 5.x, `SID` on 4.x | A pattern anchored on `SID` matched nothing, so no `Cookie` was ever sent and nothing said so. |
| Login answers **204 with an empty body** on 5.x, `200 "Ok."` on 4.x | A `Fails.`-only check is dead code on a current server. |
| One login serves the whole page | A batch of ten magnets used to mean ten logins, and qBittorrent bans an IP after five consecutive failures for an hour. |
| Some managers **refuse** any request that sets `Origin`/`Referer` | Indistinguishable from a blocked `@connect`, so the script probes for it and falls back. |

Verified against a live server (address shown as `192.168.1.50`), sending exactly
the headers the script sends:

| Request | Result |
| --- | --- |
| `Origin: http://192.168.1.50:8082` + matching `Referer` | `204` |
| `Origin` only / `Referer` only | `204` |
| neither header | `204` |
| `Origin: https://jav8.vip` (the page's origin) | **`401`** |

### Reading the failure messages

Every failure arrives as a status code, and the same code means different things
depending on where it landed. The script names the cause rather than passing a
bare number through:

| Message | Cause | Fix |
| --- | --- | --- |
| `Could not reach …` with no status | Blocked by `@connect`; the request never left the browser | Add `@connect <host>` — see above |
| `refused the request as cross-site (401/403)` | Manager stripped `Origin`/`Referer` | Uncheck **Use CSRF protection** in the WebUI |
| `refused the login` | Wrong username or password | Check Settings |
| `banned this IP (403)` | Too many consecutive failed logins | Wait, or restart qBittorrent |
| `Stopped after 3 failed logins` | The guard above tripped; nothing further was attempted | Fix the first error, then **Test connection** |
| `could not read this page from jav8.vip` | The *site* was slow or rate-limiting, not the client | Wait and retry — nothing is wrong with your client |

The last one matters: reading the site and talking to the client are independent
steps, and an unlabelled error does not say which broke.

### Managers that refuse the Origin/Referer headers

Chrome treats `Origin` and `Referer` as forbidden header names, and managers
differ in what they do with them: some pass them through, some strip them
silently, and some **refuse the whole request**. A refusal is indistinguishable
from a blocked `@connect` — a network error with no status — so guessing wrong
would send you chasing the wrong fix.

The script discovers which behaviour it is facing instead of asking you to know:
it sends the headers first, and if the request never gets an answer it retries
once without them. If that works it says so and stays in that mode for the page.
**Test connection** reports it as `qBittorrent 5.2.3 (no Origin/Referer)`.

### Why a batch stops after 3 failures

qBittorrent bans an IP for an hour after five consecutive failed logins
(`web_ui_max_auth_fail_count`, `web_ui_ban_duration`). Retrying per magnet would
turn a wrong password into you being locked out of your own client, from your own
machine. So a batch gives up after three and says so, rather than logging in 17
times. **Test connection** clears the counter.

**If it still fails with a 401,** your userscript manager stripped those headers
— Chrome forbids setting them and not every manager passes them through. The
script says so explicitly rather than reporting a bare status. The fix is one
toggle: qBittorrent → Tools → Preferences → Web UI → uncheck **Use CSRF
protection**.

The `Cookie` header is best-effort for the same reason. It is read from the
login response when the manager exposes `Set-Cookie`, and when one does not the
request still goes out without an explicit `Cookie` and the manager's own jar is
relied on. Both paths are covered by the harness (`?nocookie=1` hides the
header; `?v5=1` makes the stub answer like a 5.x server).

Failure messages name the remedy, because every failure here arrives as a bare
status code and `401` means three different things depending on where it landed:
a wrong password, an IP ban from too many failed logins, or the CSRF rejection.

## Limitations

- Cards are decorated once per page load. Routes that render their listing
  client-side get a second attempt after ~1.2 s; anything slower is not covered.
- The magnet list is fetched per selected work, sequentially, so a large
  selection takes a while. This is deliberate — it is gentler on the site.
- Only the single best magnet per work is queued automatically. Every magnet is
  still listed on the work page for a manual override.
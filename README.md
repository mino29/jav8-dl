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
2. Pick a client, a filter and a size window in the panel (top right).
3. **Download selected**. Each work is opened, its magnets are read, one is
   chosen, and it is sent to your client.

On a work page (`/v/123456`) the panel lists every magnet with its parsed size,
sorted largest first. The one that would be chosen is highlighted; adverts are
dimmed and tagged. Click any size to send that specific magnet.

### Size window

`Min` and `Max` are in MB, default `500` and `102400` (= 100 GB). Within that
window the **largest** real release wins — the floor is there to skip 200 MB
samples, and among releases that clear it you want the full-quality one.

If nothing lands inside the window, the largest real release is still used and
the log says so, rather than silently downloading nothing.

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

If your client is not on `localhost`, point the host at whatever your browser can
reach and add it to the `@connect` list in the metadata block — the manager
blocks requests to hosts it has not been granted. Common cases:

```
@connect 192.168.*        # a client on your LAN
@connect host.docker.internal
```

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

| File | What it covers |
| --- | --- |
| `test/pure.test.mjs` | size parsing and formatting, VR detection, magnet classification against 262 real names, selection and window behaviour, host/port composition, the host guard |
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

qBittorrent authenticates with a `SID` cookie. It is read from the response
headers when the manager exposes `Set-Cookie`, and when one does not the request
is still attempted without an explicit `Cookie` and the manager's cookie jar is
relied on. Both paths are covered by the harness (`?nocookie=1` simulates a
manager that hides the header).

## Limitations

- Cards are decorated once per page load. Routes that render their listing
  client-side get a second attempt after ~1.2 s; anything slower is not covered.
- The magnet list is fetched per selected work, sequentially, so a large
  selection takes a while. This is deliberate — it is gentler on the site.
- Only the single best magnet per work is queued automatically. Every magnet is
  still listed on the work page for a manual override.
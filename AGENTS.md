# Working notes for this repository

Single-file userscript for jav8.vip. No dependencies, no build step, no
framework — that is deliberate. A userscript is installed by opening a URL, so
anything that has to be compiled before a user can install it is a liability.

## Layout

| Path | What it is |
| --- | --- |
| `jav8-downloader.user.js` | the deliverable; a user installs exactly this file |
| `spec/site.json` | machine-readable contract for every site assumption |
| `test/pure.test.mjs` | logic tests |
| `test/parity.test.mjs` | spec vs the constants inlined in the userscript |
| `test/harness.mjs` | local server for browser testing |
| `test/load-userscript.mjs` | shared loader used by both test files |
| `test/fixtures/` | captured pages, committed so tests need no network |
| `tools/fetch_fixtures.py` | re-captures the fixtures |

Routes worth knowing about when debugging the harness: `/actress/58956` serves a
two-page career so autopagination can be walked to a real end, and the route
table matches pathname **and** query — matching only the pathname once made
`?page=2` serve page 1 again, and the crawler "successfully" walked two identical
pages.

## Invariants worth preserving

**One copy of the logic.** The userscript must stay a single file, so tests
cannot import it. Instead `load-userscript.mjs` slices the region between
`// pure:start` and `// pure:end` and evaluates it in a VM. Anything inside that
region must stay free of DOM and network access. Do not add a second
implementation under `test/` — that is the failure mode this layout exists to
prevent.

**`spec/site.json` must match the script.** The inlined constants are the ones
that rot: someone tightens a regex, the spec keeps describing the old
behaviour, and the documentation starts lying. `parity.test.mjs` fails on any
disagreement. When you change a selector, default or pattern, change the spec in
the same commit or the test will tell you.

**The vendor defaults are product defaults, not credentials.**
`localhost:6800` for aria2 and `admin`/`adminadmin` for qBittorrent are what a
stock install ships with. Never put a real address or password in the script or
in `spec/site.json` — that would publish it, since this repository is pushed to
a remote.

**Fixtures are captured, not authored.** Refresh them with
`python tools/fetch_fixtures.py` rather than editing them. `.gitattributes`
marks them `-text` so a fixture diff is always a real re-capture.

## Testing

```bash
npm test
```

No browser and no network. If you change how the script touches the DOM, also
run the harness and check it in a browser — the pure tests cannot see a missing
element or an event that never fires:

```bash
npm run harness      # then open http://127.0.0.1:8980/updated
```

The harness stubs aria2 and qBittorrent on purpose. Point the script at a real
client during manual testing if you want to, but never from a test: a stray
request queues a real torrent.

## Bugs found by testing that reading did not

Kept here because they are the kind that come back:

- `preventDefault()` on the tick's click also cancels the checkbox toggle. Only
  `stopPropagation()` is needed — the anchor's default action never runs if the
  event does not reach it.
- `init()` builds the panel and `buildDetailPanel()` then bailed on its own
  "already built" guard, so the magnet list never appeared. Idempotence belongs
  on `buildPanel`, not on its caller.
- `Set-Cookie` is a forbidden header name for a plain fetch and is not surfaced
  by every userscript manager. Do not make a SID mandatory.
- The harness once read the request body as `opts.body` instead of `opts.data`
  and sent empty requests; the real aria2 called it "Parse error" and it looked
  like a userscript bug.
- qBittorrent version numbers hide behaviour changes. It "worked" against a
  stock install while doing nothing at all, because three assumptions were all
  true of 4.x and false of 5.x: the cookie is `QBT_SID_<port>` not `SID`, login
  answers 204 with an empty body not `200 "Ok."`, and any request carrying a
  cross-site `Origin`/`Referer` is refused with a bare 401. Nothing errored.
  When a client is "working for me", reproduce against the user's actual server
  before changing anything.
- The harness's browser `fetch()` **silently drops `Referer` and `Origin`** —
  both are forbidden header names. Verified by having the stub report what it
  received: the page's URL came back, not what the script set. So a green harness
  run does **not** prove the same-origin fix works; only a real userscript manager
  can. Do not tighten the harness into believing otherwise.
- Errors must keep the fact that distinguishes them. Wrapping a failure to add a
  human-readable message threw away `err.transport`, and the header fallback that
  depends on "did this ever reach the server?" then silently never ran. Copy the
  discriminator onto the wrapper; do not pattern-match the message text.
- Anything captured once at a decision point goes stale if an earlier step can
  change it. `withOrigin` was read before the login that *discovers* it, so the
  first call after discovery repeated the request it had just been told to stop
  making. Read it inside the continuation, not before the promise.
- `@connect` is not a firewall rule and has no subnet wildcards. Tampermonkey
  documents it as accepting a domain, `self`, `localhost`, a single IP, or `*`;
  `@connect 192.168.*` is not among them. Where one is not honoured the request
  is refused *before it leaves the browser*, so the only symptom is a network
  error with **no HTTP status** — indistinguishable from an unreachable client.
  Days went into the qBittorrent protocol before anyone checked the one line
  that stopped the request leaving at all. When a privileged request fails with
  no status, suspect permissions before suspecting the protocol.
- The user's real host is a credential-adjacent detail. Reproducing against it
  is right; committing it is not. It ended up in the userscript's doc comment,
  the README and two test files before being caught — use a documentation-range
  address in examples, and grep the whole repo for the real one before declaring
  a task done.
- Carrying a status only inside an error message is not enough. `statusOf()`
  re-parsed the text, so when a lower layer replaced a precise message with a
  vaguer one the higher layer read a stale status and reported the wrong
  problem: "banned for too many logins" became "could not reach the host",
  sending the user to `@connect` for a bad password. Status is now a field, and
  `explained()` stops a precise message being overwritten downstream.
- Never rewrite an existing file with PowerShell `WriteAllText`/`Out-File`/
  `Set-Content` to fix one byte or to run a quick negative test. They default to
  a legacy codepage here and silently destroyed every em dash in this file, and
  on a later occasion mangled `【VR】` into mojibake, both times while looking
  like they had worked. Use the edit tool. If a file must be restored, prefer
  `git checkout-index -f -- <path>`, which takes the byte-exact staged copy.
  Verify afterwards with
  `[Text.Encoding]::UTF8.GetString([IO.File]::ReadAllBytes(...))`.
- The failure mode that matters on a third-party site is not a crash, it is a
  rate-limit: enough requests in a row earn a temporary IP block, which looks
  like the site breaking rather than the script misbehaving. So: send strictly
  sequentially, leave a real gap between items (not just "not parallel" - the
  next request leaving the instant the last one lands is still a burst), ask
  before any single action covers a large batch, and stop early on repeated auth
  failures because the vendor bans the IP. Confirm only above a threshold -
  confirming every time trains people to click through the one dialog that
  matters.
- A browser cache will silently defeat a harness that re-reads the script per
  request. It did: a fixed size preference appeared not to work in the browser
  while the pure logic computed the right answer, because the tab was running a
  cached copy of the script and every assertion still passed. `/__harness__/script.js`
  and the fixture pages are now served `no-store`. When the browser disagrees with
  a test that passes, suspect a stale copy before suspecting the code — and prove
  it with a reload, which is what settled this one.
- Two entry points doing the same traversal will drift. `queueActress()` and
  `downloadActressCareer()` were ~90% identical — same page loader, same filter
  pass, same error prose — differing only in whether they staged or sent, and only
  the less-used copy was ever tested. They are now one `crawlActress()` with the
  caller supplying only what it does with the result.
- A control can be *present, correct and inert*. The size slider set a window ten
  times either side of the preference and then took the largest release inside
  it, so the preference never reached the selection at all — `pickMagnet` was
  never even given it. Every number the panel displayed was right and none of
  them changed the outcome, which reads to a user as a broken control rather than
  as a wrong rule. When a setting exists, write down what it changes and test
  that moving it changes the answer; a test on the default value alone passes
  happily either way.
- Derived state shown next to a control must update with it. The work page
  highlighted the magnet it "would send" once at load, so it kept asserting a
  specific release after the slider moved elsewhere. If a control decides
  something, the display of that decision belongs to the control.
- A userscript only updates when `@version` rises. A forgotten bump produces no
  error and no update, which is indistinguishable from a broken `@updateURL`, so
  it is checked mechanically: `npm run check-bump`, and `npm run verify` for the
  whole pre-publish set (icon freshness, tests, version bump).
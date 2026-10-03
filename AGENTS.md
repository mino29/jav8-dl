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
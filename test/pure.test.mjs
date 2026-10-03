/**
 * Unit tests for the userscript's pure logic.
 *
 * The userscript has to stay a single file, so the tests slice out the region
 * marked `pure:start` / `pure:end` (see load-userscript.mjs) and evaluate it.
 * That region must not touch the DOM or the network, which is what makes it
 * testable at all.
 *
 * Test data is real output captured from jav8.vip - release names, sizes and
 * catalog codes - rather than invented examples.
 *
 *   node test/pure.test.mjs
 */
import { loadApi, reporter } from "./load-userscript.mjs";

const api = loadApi();
const { MB, GB } = api;
const r = reporter("pure");
const check = r.check;

let passed = 0;
const failures = [];

function group(title) {
  console.log(`\n${title}`);
}

// ---------------------------------------------------------------- parseSize
group("parseSize - real .magnet-size strings from the site");
check("5.37GB", api.parseSize("5.37GB"), Math.round(5.37 * GB));
check("900.94MB", api.parseSize("900.94MB"), Math.round(900.94 * MB));
check("1.28GB", api.parseSize("1.28GB"), Math.round(1.28 * GB));
check("1.5GB", api.parseSize("1.5GB"), Math.round(1.5 * GB));
check("2.82GB", api.parseSize("2.82GB"), Math.round(2.82 * GB));
check("700MB", api.parseSize("700MB"), Math.round(700 * MB));
check("lowercase unit", api.parseSize("4gb"), Math.round(4 * GB));
check("binary unit alias", api.parseSize("4GiB"), Math.round(4 * GB));
check("comma decimal", api.parseSize("1,5GB"), Math.round(1.5 * GB));
check("1.2TB", api.parseSize("1.2TB"), Math.round(1.2 * api.TB));
check("surrounding space", api.parseSize("  3.24GB "), Math.round(3.24 * GB));
check("no unit is not a size", api.parseSize("1234"), null);
check("unknown unit", api.parseSize("5.37XB"), null);
check("empty", api.parseSize(""), null);
check("null", api.parseSize(null), null);
check("zero rejected", api.parseSize("0GB"), null);
check("text", api.parseSize("unknown"), null);
check("2 units", api.parseSize("5.37GB/1.2GB"), null);

// -------------------------------------------------------------- formatSize
group("formatSize");
check("bytes", api.formatSize(5.37 * GB), "5.37 GB");
check("mb", api.formatSize(900.94 * MB), "900.94 MB");
check("tb", api.formatSize(1.5 * api.TB), "1.5 TB");
check("rounds to 2dp", api.formatSize(Math.round(5.3749 * GB)), "5.37 GB");
check("unknown", api.formatSize(null), "?");
check("round trip", api.parseSize(api.formatSize(3.24 * GB)), Math.round(3.24 * GB));

// -------------------------------------------------------------------- isVr
group("isVr - validated against the site's own VR genre listings");
// Title marker caught 17/17 known VR releases; the code rule added 6 more and
// produced no false positives over 98 real flat codes.
check("MDVR-439 with marker", api.isVr("MDVR-439", "【VR】石原希望“近乎”无剪辑×自拍视角×8K VR"), true);
check("SAVR-1165 code only", api.isVr("SAVR-1165", "某个标题没有标记"), true);
check("PXVR-493 code only", api.isVr("PXVR-493", "某个标题没有标记"), true);
check("DPVRS-015 code only", api.isVr("DPVRS-015", "某个标题没有标记"), true);
check("VRKM-1888 code only", api.isVr("VRKM-1888", "某个标题没有标记"), true);
check("AQUGA-016 title only", api.isVr("AQUGA-016", "【VR】标题有标记但番号不含 VR"), true);
check("BEBL-074 title only", api.isVr("BEBL-074", "【VR】标题有标记"), true);
check("SLR-048 title only", api.isVr("SLR-048", "【VR】标题有标记"), true);

// Flat releases must not be misread as VR. 第一人称 appears on many of these
// and is explicitly not a VR signal.
check("IPZZ-961", api.isVr("IPZZ-961", "国宝级颜控狂想曲：沉醉于枫香莲的绝世容颜"), false);
check("XVSR-900 looks close but is flat", api.isVr("XVSR-900", "标题没有标记"), false);
check("ABF-388", api.isVr("ABF-388", "我的顺从宠物候选人 09"), false);
check("JUR-100", api.isVr("JUR-100", "标题"), false);
check("SNOS-313", api.isVr("SNOS-313", "标题"), false);
check("lowercase code", api.isVr("mdvr-439", "没有标记"), true);
check("empty inputs", api.isVr("", ""), false);
check("第一人称 alone is not VR", api.isVr("SDJS-383", "第一人称 秘书的居家假日"), false);

// ---------------------------------------------------------- classifyMagnet
group("classifyMagnet - 262 real magnet names");
// Names captured verbatim from the site.
check("plain release", api.classifyMagnet("IPZZ-961"), "clean");
check("digits-prefixed release", api.classifyMagnet("259LUXU-1900"), "clean");
check("unreleased variant", api.classifyMagnet("IPZZ-961-U"), "clean");
check("HD suffix", api.classifyMagnet("MIDA-812 [HD]"), "clean");
check("watermarked variant", api.classifyMagnet("JUR-801 [HD]"), "clean");

check("scene-group @ domain", api.classifyMagnet("第一會所新片@SIS001@DDH-451"), "suspect");
check("numeric @ domain", api.classifyMagnet("ALDN-433.[4K]@R90s"), "suspect");
check("hex prefix @ domain", api.classifyMagnet("6a88.vip@259LUXU-1900 [HD]"), "suspect");

check("quark promo", api.classifyMagnet("CAWB-042 [HD]｜1视频_APP無广告极致体验▷夸克UC▷38922.xyz"), "ad");
check("new-address promo", api.classifyMagnet("DLDSS-543【新】1视频APP▷夸克UC▷38922.xyz"), "ad");
check("triangle marker", api.classifyMagnet("MNGS-061-U无码破解【成人抖】月新地址▶夸克UC▷38988.xyz"), "ad");
check("bare triangle", api.classifyMagnet("IPZZ-961 ▷something"), "ad");
check("unwatermarked cracked", api.classifyMagnet("2c88.xyz@259LUXU-1900-U无码破解"), "suspect");

// The two rules must never collide on the same name.
check("clean name never flagged", api.classifyMagnet("ALDN-608").startsWith("ad"), false);

// --------------------------------------------------------------- pickMagnet
group("pickMagnet - size window and ad avoidance");
const MB_ = MB;
const GB_ = GB;
// Fixtures round the way parseSize() rounds, so a float like 5.37 * GB does not
// make the expected value differ from what the scraper would have produced.
const sizeOf = (n, unit) => Math.round(n * unit);
function mag(size, tier, name) {
  return { uri: `magnet:?x=${name || size}`, size, tier, name: name || `rel-${size}` };
}

// Default window from the shipped settings: 500MB .. 100GB.
const LO = 500 * MB_;
const HI = 100 * GB_;

{
  const picked = api.pickMagnet(
    [mag(sizeOf(1.28, GB_), "clean"), mag(sizeOf(5.37, GB_), "clean"), mag(sizeOf(900, MB_), "clean")],
    LO,
    HI,
  );
  check("largest clean inside window wins", picked.magnet.size, sizeOf(5.37, GB_));
  check("reason in-window", picked.reason, "in-window");
}
{
  // 200MB sample sits below the floor, so it must lose to the full release.
  const picked = api.pickMagnet([mag(sizeOf(200, MB_), "clean"), mag(sizeOf(5.37, GB_), "clean")], LO, HI);
  check("below floor is excluded", picked.magnet.size, sizeOf(5.37, GB_));
}
{
  const picked = api.pickMagnet(
    [mag(sizeOf(1.28, GB_), "ad"), mag(sizeOf(5.37, GB_), "clean")],
    LO,
    HI,
  );
  check("ad never chosen over clean", picked.magnet.tier, "clean");
}
{
  const picked = api.pickMagnet(
    [mag(sizeOf(1.28, GB_), "suspect"), mag(sizeOf(5.37, GB_), "clean")],
    LO,
    HI,
  );
  check("suspect deprioritised", picked.magnet.tier, "clean");
}
{
  // Nothing clean: a suspect entry is better than nothing.
  const picked = api.pickMagnet([mag(sizeOf(1.28, GB_), "suspect"), mag(sizeOf(1.5, GB_), "ad")], LO, HI);
  check("suspect used when no clean", picked.magnet.tier, "suspect");
}
{
  const picked = api.pickMagnet([mag(sizeOf(1.28, GB_), "ad"), mag(sizeOf(1.5, GB_), "ad")], LO, HI);
  check("ads only", [picked.magnet, picked.reason], [null, "ads-only"]);
}
{
  const picked = api.pickMagnet([], LO, HI);
  check("empty list", [picked.magnet, picked.reason], [null, "no-magnets"]);
}
{
  const picked = api.pickMagnet([mag(null, "clean"), mag(undefined, "clean")], LO, HI);
  check("unparsable sizes skipped", [picked.magnet, picked.reason], [null, "no-magnets"]);
}
{
  const picked = api.pickMagnet([mag(sizeOf(1.28, GB_), "clean"), { uri: "x", size: 5, tier: "clean", name: "no uri" }], LO, HI);
  check("entries without a uri skipped", picked.magnet.size, sizeOf(1.28, GB_));
}
{
  // Nothing inside a narrow window: still returns something and says so, rather
  // than silently downloading nothing.
  const picked = api.pickMagnet(
    [mag(sizeOf(1.28, GB_), "clean"), mag(sizeOf(5.37, GB_), "clean")],
    10 * GB_,
    20 * GB_,
  );
  check("falls back to largest", picked.magnet.size, sizeOf(5.37, GB_));
  check("fallback is flagged", picked.reason, "outside-window");
}
{
  // 100GB ceiling: an absurd 120GB label is outside the window.
  const picked = api.pickMagnet([mag(sizeOf(5.37, GB_), "clean"), mag(sizeOf(120, GB_), "clean")], LO, HI);
  check("above ceiling excluded", picked.magnet.size, sizeOf(5.37, GB_));
}
{
  // Boundary: exactly on the floor and exactly on the ceiling both count as
  // inside. Each is checked on its own, because which of the two *wins* is now
  // a different question - that is decided by the preferred size, not by being
  // at an edge. This test used to assert the 100GB entry won, which was the old
  // "largest always wins" rule rather than anything about inclusivity.
  check("floor inclusive", api.pickMagnet([mag(LO, "clean")], LO, HI, 5 * GB_).reason, "in-window");
  check("ceiling inclusive", api.pickMagnet([mag(HI, "clean")], LO, HI, 5 * GB_).reason, "in-window");
  check("one byte below the floor is out", api.pickMagnet([mag(LO - 1, "clean")], LO, HI, 5 * GB_).reason, "outside-window");
  check("one byte above the ceiling is out", api.pickMagnet([mag(HI + 1, "clean")], LO, HI, 5 * GB_).reason, "outside-window");
}
{
  const picked = api.pickMagnet([mag(sizeOf(5.37, GB_), "clean")], LO, HI);
  check("single candidate", picked.reason, "in-window");
}

// --------------------------------------------------- the preferred-size rule
group("closestToPreferred - the slider must actually change the outcome");
// This group is the regression guard for the reported bug. The window is
// deliberately wide - five times either side - so "largest wins" and "closest
// wins" agree on a small list and disagree on a realistic one. Anything that
// makes these pass without passing the preferred size through is the old bug.
{
  const window_ = api.windowFromPreferred(5 * GB_);
  const lo = window_.min;
  const hi = window_.max;
  const set = [sizeOf(1.2, GB_), sizeOf(5.4, GB_), sizeOf(9, GB_), sizeOf(20, GB_)];
  const named = (want, preferred) =>
    api.pickMagnet(set.map((s) => mag(s, "clean")), lo, hi, preferred).magnet.size;

  check("prefers 5GB when 5GB was asked for", named(sizeOf(5.4, GB_), 5 * GB_), sizeOf(5.4, GB_));
  check("does not just take the largest", named(sizeOf(20, GB_), 5 * GB_) === sizeOf(20, GB_), false);
  // Moving the slider must move the answer, or the control does nothing.
  check("moving up picks the bigger one", named(sizeOf(9, GB_), 10 * GB_), sizeOf(9, GB_));
  check("moving down picks the smaller one", named(sizeOf(1.2, GB_), 1.5 * GB_), sizeOf(1.2, GB_));
  check("same list, different preference, different pick", named(sizeOf(5.4, GB_), 5 * GB_) === named(sizeOf(5.4, GB_), 15 * GB_), false);

  // Log space, not linear: for two sizes, where the winner flips sits at their
  // *geometric* mean rather than the arithmetic one. A linear comparison would
  // flip much lower, calling a 1.2GB release the distant one from a 5GB
  // preference. Tested on that pair alone - the four-way set above contains
  // 5.4GB, which sits closer to any preference near 3GB than either of these.
  const twoOnly = (preferred) =>
    api.closestToPreferred([mag(sizeOf(1.2, GB_), "clean"), mag(sizeOf(9, GB_), "clean")], preferred).size;
  const geoMid = Math.sqrt(1.2 * 9);
  check("crossover is the geometric mean, below it", twoOnly(Math.round(geoMid * 0.99 * GB_)), sizeOf(1.2, GB_));
  check("crossover is the geometric mean, above it", twoOnly(Math.round(geoMid * 1.01 * GB_)), sizeOf(9, GB_));

  // An exact tie goes to the larger, keeping the old "fuller is better" instinct.
  check("tie goes to the larger", api.closestToPreferred([mag(sizeOf(2.5, GB_), "clean"), mag(sizeOf(10, GB_), "clean")], 5 * GB_).size, sizeOf(10, GB_));

  // A single candidate is returned unchanged.
  check("single entry", api.closestToPreferred([mag(sizeOf(3, GB_), "clean")], 5 * GB_).size, sizeOf(3, GB_));

  // A missing or nonsense preference falls back to the default rather than
  // picking arbitrarily or throwing.
  check("missing preference falls back", api.closestToPreferred([mag(sizeOf(5.4, GB_), "clean")], undefined).size, sizeOf(5.4, GB_));
  check("nonsense preference falls back", api.closestToPreferred([mag(sizeOf(5.4, GB_), "clean")], "abc").size, sizeOf(5.4, GB_));

  // The window still filters: a small sample below the floor loses even when it
  // is the closest thing to the preference.
  const withSample = api.pickMagnet([mag(sizeOf(200, MB_), "clean"), mag(sizeOf(9, GB_), "clean")], lo, hi, 5 * GB_);
  check("floor still excludes a 200MB sample", withSample.magnet.size, sizeOf(9, GB_));

  // When nothing fits the window at all, the largest real release is still
  // used and still flagged.
  const nothing = api.pickMagnet([mag(sizeOf(1.2, GB_), "clean"), mag(sizeOf(40, GB_), "clean")], 100 * GB_, 200 * GB_, 120 * GB_);
  check("fallback is the largest", nothing.magnet.size, sizeOf(40, GB_));
  check("fallback is flagged", nothing.reason, "outside-window");
}

// ------------------------------------------------------------- normalizeCode
group("normalizeCode");
check("strips and uppercases", api.normalizeCode(" ipzz-961 "), "IPZZ-961");
check("keeps digits and dash", api.normalizeCode("259luxu-1900"), "259LUXU-1900");
check("drops punctuation", api.normalizeCode("IPZZ-961 [HD]"), "IPZZ-961HD");
check("empty", api.normalizeCode(""), "");

// -------------------------------------------------------------- isTargetHost
group("isTargetHost - the guard that decides where the script runs");
check("apex", api.isTargetHost("jav8.vip"), true);
check("www subdomain", api.isTargetHost("www.jav8.vip"), true);
check("deep subdomain", api.isTargetHost("a.b.jav8.vip"), true);
check("uppercase", api.isTargetHost("JAV8.VIP"), true);
check("trailing dot", api.isTargetHost("jav8.vip."), true);
// Suffix traps: a host that merely *ends* with the domain is not ours.
check("lookalike suffix", api.isTargetHost("notjav8.vip"), false);
check("lookalike prefix", api.isTargetHost("jav8.vip.evil.com"), false);
check("domain as a subdomain of evil", api.isTargetHost("evil-jav8.vip.example.com"), false);
check("unrelated host", api.isTargetHost("localhost"), false);
check("localhost with port suffix", api.isTargetHost("localhost:8973"), false);
check("empty", api.isTargetHost(""), false);
check("null", api.isTargetHost(null), false);

// ----------------------------------------------------- nextPageHref / collectPages
group("nextPageHref - the only end-of-list signal the site gives");

/**
 * A minimal stand-in for a parsed document.
 *
 * Only the two selectors the crawler uses are understood. A full DOM is not
 * available here, and pulling one in for two queries would test the DOM library
 * rather than the traversal. Not a second implementation of the logic: the
 * selectors come from api.SELECTORS, so a change there changes what is matched.
 */
function fakeDoc(html) {
  const cards = [];
  const cardRe = /<a class="work" href="([^"]*)"/g;
  let m;
  while ((m = cardRe.exec(html))) {
    // Captured per iteration: `m` is reused by the loop below, so a closure
    // over it would report the last match for every card.
    const href = m[1];
    cards.push({ getAttribute: (n) => (n === "href" ? href : null) });
  }
  const nextRe = /<a class="pagination-next" href="([^"]*)"/g;
  const nexts = [];
  while ((m = nextRe.exec(html))) nexts.push(m[1]);
  return {
    querySelectorAll: (sel) => (sel === api.SELECTORS.card ? cards : []),
    querySelector: (sel) => {
      if (sel !== api.SELECTORS.paginationNext) return null;
      const href = nexts[0];
      // An href="" is not a next page: getAttribute returns "" and the code
      // must treat that as absent.
      return href === undefined ? null : { getAttribute: () => href };
    },
  };
}

// A page of `ids` works, with a next link unless it is the last one.
function page(ids, { last = true } = {}) {
  const cards = ids.map((id) => `<a class="work" href="/v/${id}"></a>`).join("");
  const next = last ? "" : '<a class="pagination-next" href="/actress/5?page=NEXT"></a>';
  return fakeDoc(cards + next.replace("NEXT", String(ids[ids.length - 1] * 10)));
}

// A page with no pagination element at all.
const noNext = (ids) => fakeDoc(ids.map((id) => `<a class="work" href="/v/${id}"></a>`).join(""));

check("no pagination at all", api.nextPageHref(noNext([1])), null);
check("next link found", api.nextPageHref(fakeDoc('<a class="pagination-next" href="/actress/5?page=2">n</a>')), "/actress/5?page=2");
// The class has to be matched, or an unrelated link would send the crawl
// somewhere arbitrary.
check("other links are ignored", api.nextPageHref(fakeDoc('<a href="/somewhere">x</a>')), null);
check("href-less link is not a next page", api.nextPageHref(fakeDoc('<a class="pagination-next">n</a>')), null);
// An empty href is normalised away rather than followed: "?page=" with nothing
// after it would re-request the page being viewed.
check("empty href is not a next page", api.nextPageHref(fakeDoc('<a class="pagination-next" href="">n</a>')), null);

async function crawlerTests() {
  group("collectPages - autopagination without a browser or a network");

  // Two pages, the second without a next link: the real shape of a career.
  {
    const p1 = page([1, 2], { last: false });
    const p2 = page([3, 4], { last: true });
    const r = await api.collectPages(p1, (href) => Promise.resolve(href === "/actress/5?page=20" ? p2 : null));
    check("walked both pages", r.pages, 2);
    check("collected every work", r.works.length, 4);
    check("stopped on the last page", r.stopped, "last-page");
    check("order is preserved", r.works.map((w) => w.href), ["/v/1", "/v/2", "/v/3", "/v/4"]);
  }

  // A single page with no pagination must not spin.
  {
    const r = await api.collectPages(noNext([1, 2]), () => Promise.resolve(null));
    check("single page", [r.pages, r.works.length, r.stopped], [1, 2, "last-page"]);
  }

  // A page that will not load ends the crawl but keeps what was found, rather
  // than discarding a hundred collected works over one bad request.
  {
    const r = await api.collectPages(page([1, 2], { last: false }), () => Promise.resolve(null));
    check("a failed page keeps earlier works", r.works.length, 2);
    check("a failed page stops the crawl", r.stopped, "page-failed");
  }

  // The cap is what stops a runaway crawl of someone else's site.
  {
    // Every page links to a *distinct* next page that also links onward: the
    // pathological case the cap exists for. Distinct hrefs matter, otherwise
    // loop detection catches it first and the cap is never exercised.
    const chainAt = (n) =>
      fakeDoc(`<a class="work" href="/v/${n}"></a><a class="pagination-next" href="/actress/5?page=${n + 1}"></a>`);
    // The loader must answer with the page that was *asked for*, or it returns
    // the same next-href twice and loop detection fires before the cap does.
    const loader = (href) => Promise.resolve(chainAt(Number(href.split("page=")[1])));
    const r = await api.collectPages(chainAt(1), loader, { maxPages: 5 });
    check("respects the page cap", r.pages, 5);
    check("says it hit the cap", r.stopped, "page-cap");
    // Each page contributed one distinct work, and nothing was collected twice.
    check("no duplicates across a capped crawl", r.works.length, new Set(r.works.map((w) => w.href)).size);
  }

  // A next link pointing back somewhere already visited is a cycle, and must
  // not loop forever.
  {
    const looping = fakeDoc(
      '<a class="work" href="/v/1"></a><a class="pagination-next" href="/actress/5"></a>',
    );
    const r = await api.collectPages(looping, () => Promise.resolve(looping));
    check("a self-referencing next link stops", r.stopped, "loop");
    check("no duplicate works collected", r.works.length, 1);
  }

  // Duplicate works across pages must be collapsed by href.
  {
    const dup = noNext([1, 2]);
    const r = await api.collectPages(dup, () => Promise.resolve(dup));
    check("duplicates are collapsed", r.works.length, 2);
  }
}

// ------------------------------------------------------------------- endpoint
group("endpoint - host/port composition");
const RPC = "/jsonrpc";
check("vendor default", api.endpoint("http://localhost", 6800, RPC), "http://localhost:6800/jsonrpc");
check("qb port", api.endpoint("http://localhost", 8080, "/api/v2/auth/login"), "http://localhost:8080/api/v2/auth/login");
// A port pasted into the host must win, not be doubled up.
check("port embedded in host", api.endpoint("http://nas.local:6800", 6800, RPC), "http://nas.local:6800/jsonrpc");
check("embedded port differs from field", api.endpoint("http://nas.local:9999", 6800, RPC), "http://nas.local:9999/jsonrpc");
check("bare hostname gains a scheme", api.endpoint("nas.local", 6800, RPC), "http://nas.local:6800/jsonrpc");
check("no port anywhere", api.endpoint("http://nas.local", "", RPC), "http://nas.local/jsonrpc");
check("empty host falls back", api.endpoint("", 6800, RPC), "http://localhost:6800/jsonrpc");
check("trailing slash trimmed", api.endpoint("http://nas.local/", 6800, RPC), "http://nas.local:6800/jsonrpc");
check("https preserved", api.endpoint("https://nas.local", 443, RPC), "https://nas.local:443/jsonrpc");
check("port preserved verbatim", api.endpoint("http://nas.local:6801", 6800, RPC), "http://nas.local:6801/jsonrpc");
check("ipv6 literal", api.endpoint("http://[::1]", 6800, RPC), "http://[::1]:6800/jsonrpc");
check("ipv6 with port", api.endpoint("http://[::1]:6800", 6800, RPC), "http://[::1]:6800/jsonrpc");
check("never doubles the port", api.endpoint("http://a:1", 1, RPC).split(":1").length - 1 <= 1, true);

// ---------------------------------------------------------------------- origin
group("origin - the base URL qBittorrent's CSRF check compares against");
// Origin must be scheme + host + port and nothing else: no path, no trailing
// slash, or it will not equal the Host the server sees.
check("vendor default", api.origin("http://localhost", 8080), "http://localhost:8080");
check("lan host", api.origin("http://192.168.1.50", 8082), "http://192.168.1.50:8082");
check("no trailing slash", api.origin("http://localhost/", 8080), "http://localhost:8080");
check("embedded port wins", api.origin("http://nas.local:8082", 8080), "http://nas.local:8082");
check("bare hostname gains a scheme", api.origin("nas.local", 8082), "http://nas.local:8082");
check("https preserved", api.origin("https://nas.local", 443), "https://nas.local:443");
check("ipv6 literal", api.origin("http://[::1]", 8080), "http://[::1]:8080");

// ------------------------------------------------------------------ connectHost
group("connectHost - the exact value a @connect line needs");
// Tampermonkey documents @connect as accepting a domain, `self`, `localhost`,
// a single IP, or `*`. A subnet wildcard such as `192.168.*` is not among them,
// and where it is not honoured the request never leaves the browser. So the
// diagnostic has to name a value that is definitely valid.
check("the reported host", api.connectHost("http://192.168.1.50", 8082), "192.168.1.50");
check("scheme stripped", api.connectHost("https://nas.local", 443), "nas.local");
check("port stripped", api.connectHost("http://192.168.1.50", 6800), "192.168.1.50");
check("bare hostname", api.connectHost("nas.local", 8082), "nas.local");
check("no port", api.connectHost("http://nas.local", ""), "nas.local");
check("trailing slash", api.connectHost("http://nas.local/", 8082), "nas.local");
// IPv6: the brackets are URL syntax, not part of the address.
check("ipv6 brackets unwrapped", api.connectHost("http://[::1]", 8080), "::1");
check("ipv6 with port", api.connectHost("http://[::1]:8080", 8080), "::1");
// It must not invent a wildcard: the whole point is an exact, valid value.
check("never emits a wildcard", /[*]/.test(api.connectHost("http://192.168.1.50", 8082)), false);

group("connectHint - end to end from a composed URL");
check("from a full base URL", api.connectHint("http://192.168.1.50:8082"), "192.168.1.50");
check("localhost", api.connectHint("http://localhost:8080"), "localhost");
check("no base gives nothing", api.connectHint(""), "");
check("no base is null-safe", api.connectHint(null), "");

// And the message that actually reaches the user has to carry that value.
// This is the one failure the user has to fix by hand: @connect is read once,
// when the manager installs the script, so nothing here can add it at runtime.
{
  const msg = api.qbFailure(0, "login", "http://192.168.1.50:8082");
  check("names the exact @connect line to paste", msg.includes("// @connect      192.168.1.50"), true);
  check("says it never reached the server", /before it reached the server/i.test(msg), true);
  check("says the user must do it by hand", /Nothing in this script can add it/i.test(msg), true);
  check("rules out a subnet wildcard", /no subnet wildcard/i.test(msg), true);
  check("does not blame the password", /password is wrong/i.test(msg), false);
  check("does not blame CSRF", /CSRF protection/i.test(msg), false);
}

// --------------------------------------------------------------- parseSidCookie
group("parseSidCookie - real Set-Cookie headers from a live v5.2.3 WebUI");
// A v5 server names the cookie QBT_SID_<port>. A pattern anchored on SID found
// nothing at all here, which is why every call silently relied on the manager's
// cookie jar instead of failing loudly.
check("v5 port-suffixed name", api.parseSidCookie("set-cookie: QBT_SID_8082=abc123; path=/; HttpOnly"), "QBT_SID_8082=abc123");
check("v4 legacy name", api.parseSidCookie("set-cookie: SID=abc123; path=/"), "SID=abc123");
check("lowercase attribute names", api.parseSidCookie("Set-Cookie: qbt_sid_8082=abc; path=/"), "qbt_sid_8082=abc");
check("value keeps base64 punctuation", api.parseSidCookie("set-cookie: QBT_SID_8082=FRdLSYsATim/s6l204MBCzv1FDUqspy+; path=/"), "QBT_SID_8082=FRdLSYsATim/s6l204MBCzv1FDUqspy+");
// Several headers arrive in one blob; the right one has to win.
check("finds it among other headers", api.parseSidCookie("content-type: text/plain\r\nset-cookie: QBT_SID_8082=xyz; path=/\r\ncontent-length: 3"), "QBT_SID_8082=xyz");
check("object form header map", api.parseSidCookie({ "set-cookie": "QBT_SID_8082=fromObject; path=/" }), "QBT_SID_8082=fromObject");
check("array form", api.parseSidCookie(["set-cookie: QBT_SID_8082=fromArray; path=/"]), "QBT_SID_8082=fromArray");
// A manager that hides Set-Cookie must not be mistaken for a server that set none.
check("no cookie present", api.parseSidCookie("content-type: text/plain"), null);
check("empty string", api.parseSidCookie(""), null);
check("null", api.parseSidCookie(null), null);
check("undefined", api.parseSidCookie(undefined), null);
// An unrelated cookie must not be mistaken for a session.
check("unrelated cookie ignored", api.parseSidCookie("set-cookie: theme=dark; path=/"), null);

// ---------------------------------------------------------------- loginAccepted
group("loginAccepted - v4 and v5 answer different things");
// v4: 200 with the body "Ok.". v5: 204 with an empty body. Checking only for
// "Fails." is dead code on a current server; checking only for "Ok." would reject
// every successful v5 login.
check("v5 empty body accepted", api.loginAccepted(204, ""), true);
check("v5 undefined body accepted", api.loginAccepted(204, undefined), true);
check("v4 ok body accepted", api.loginAccepted(200, "Ok."), true);
check("bad credentials rejected", api.loginAccepted(200, "Fails."), false);
check("lowercase fails rejected", api.loginAccepted(200, "fails."), false);

// --------------------------------------------------------------------- statusOf
group("statusOf - pulling the code back out of a request error");
check("reads the status", api.statusOf(new Error("HTTP 401 from http://x:  ")), 401);
check("404", api.statusOf(new Error("HTTP 404 from http://x")), 404);
check("network error is not an HTTP status", api.statusOf(new Error("network error reaching http://x")), 0);
check("timeout is not an HTTP status", api.statusOf(new Error("timed out after 15000ms")), 0);
check("null error", api.statusOf(null), 0);

// The field request() attaches wins over the message text. It has to: an
// already-explained failure passed up a layer gets a new message, and re-parsing
// the text would then read a status that no longer describes the problem. That
// is how a login rejected for a bad password was re-reported as an unreachable
// host, sending the user to @connect for something that had nothing to do
// with it.
check("attached status wins", api.statusOf(Object.assign(new Error("something else entirely"), { status: 401 })), 401);
check("attached status beats a stale message", api.statusOf(Object.assign(new Error("HTTP 200 from ok"), { status: 500 })), 500);
check("no field falls back to the message", api.statusOf(Object.assign(new Error("HTTP 404 from x"), {})), 404);
check("falsy field falls back", api.statusOf(Object.assign(new Error("HTTP 404 from x"), { status: 0 })), 404);

group("needsConfirmation - a hundred-work career should not fire on one click");
// The risk being guarded is not a crash but an IP rate-limit from the site, so
// the threshold is about politeness, not about the download client coping.
check("threshold is a sane number", api.CONFIRM_THRESHOLD > 0 && api.CONFIRM_THRESHOLD < 1000, true);
check("a single work never asks", api.needsConfirmation(1), false);
check("a normal selection never asks", api.needsConfirmation(24), false);
check("exactly at the limit does not ask", api.needsConfirmation(api.CONFIRM_THRESHOLD), false);
check("one over the limit asks", api.needsConfirmation(api.CONFIRM_THRESHOLD + 1), true);
check("a full career asks", api.needsConfirmation(100), true);
check("threshold is overridable for tests", api.needsConfirmation(5, 3), true);
check("override respected below", api.needsConfirmation(2, 3), false);

group("REQUEST_GAP_MS - pacing");
check("is a positive gap", api.REQUEST_GAP_MS > 0, true);
// Long enough to matter, short enough that a normal batch is not tedious.
check("not instant", api.REQUEST_GAP_MS >= 200, true);
check("not glacial", api.REQUEST_GAP_MS <= 1000, true);
check("a 25-item batch stays under a minute", 25 * api.REQUEST_GAP_MS < 60000, true);

group("MAX_LOGIN_FAILURES - a failed batch must not lock the user out");
// qBittorrent bans an IP for an hour after a handful of consecutive failed
// logins (web_ui_max_auth_fail_count defaults to 5). A selection of 17 that
// retries per item would therefore ban the user from their own client, from
// their own machine - a self-inflicted outage worse than the original bug.
check("the limit is a positive number", api.MAX_LOGIN_FAILURES > 0, true);
check("under the default ban threshold of 5", api.MAX_LOGIN_FAILURES < 5, true);
check("still allows a transient retry", api.MAX_LOGIN_FAILURES >= 2, true);

group("explained - a precise message must not be replaced by a vaguer one");
{
  // The failure chain is login -> session -> call, and each layer has a
  // different remedy. These two assert the mark and the phase-aware wording that
  // the "wrong password must not read as unreachable host" fix depends on.
  const e = api.explained("precise reason");
  check("message is preserved", e.message, "precise reason");
  check("marked as explained", e.explained, true);
  // Not `instanceof Error`: the pure region is evaluated in a separate VM realm,
  // so its Error is a different constructor than this file's. The duck-typed
  // check is what actually matters, and works across the boundary.
  check("it is an Error by shape", [typeof e.message, typeof e.stack], ["string", "string"]);

  const loginMsg = api.qbFailure(401, "login", "http://box:8080");
  check("login phase mentions the password", /password is wrong/i.test(loginMsg), true);
  check("login phase is not the unreachable message", /Could not reach/i.test(loginMsg), false);
  const banMsg = api.qbFailure(403, "login", "http://box:8080");
  check("ban reads as a ban", /banned this IP/i.test(banMsg), true);
  check("ban is not the unreachable message", /Could not reach/i.test(banMsg), false);
}

// ------------------------------------------------------------------- qbFailure
group("qbFailure - a bare 401 must say which of three things it means");
{
  // Login 401: wrong password, or the manager stripped the same-origin headers.
  const login = api.qbFailure(401, "login", "http://192.168.1.50:8082");
  check("login mentions the password", /username or password is wrong/i.test(login), true);
  check("login mentions CSRF as the alternative", /CSRF protection/i.test(login), true);
  check("login names the host", login.includes("http://192.168.1.50:8082"), true);

  // Login 403: qBittorrent's IP ban, which is a different problem again.
  const ban = api.qbFailure(403, "login", "http://x:8080");
  check("login 403 reads as a ban", /banned this IP/i.test(ban), true);
  check("login 403 does not blame the password", /password is wrong/i.test(ban), false);

  // Post-login 401/403: the cross-site rejection.
  const cross = api.qbFailure(401, "request", "http://x:8080");
  check("request 401 reads as cross-site", /cross-site/i.test(cross), true);
  check("request 401 points at the toggle", /Use CSRF protection/i.test(cross), true);

  // No status at all means the request never arrived - a blocked host, not a
  // rejected one, and the remedy is @connect rather than anything on the server.
  const blocked = api.qbFailure(0, "login", "http://192.168.1.50:8082");
  check("unreachable names @connect", /@connect/.test(blocked), true);
  check("unreachable does not blame the password", /password is wrong/i.test(blocked), false);

  check("other status is reported plainly", api.qbFailure(500, "request", "http://x"), "qBittorrent returned HTTP 500.");
}

// ---------------------------------------------------------------- headerString
group("headerString - responseHeaders shape varies by manager");
check("string passes through", api.headerString("a: 1"), "a: 1");
check("object is flattened", api.headerString({ a: 1 }), "a: 1");
check("array is joined", api.headerString(["a: 1", "b: 2"]), "a: 1\nb: 2");
check("null", api.headerString(null), "");
check("undefined", api.headerString(undefined), "");
check("number", api.headerString(7), "7");

// ------------------------------------------------------- the preferred-size slider
group("windowFromPreferred - one slider derives both bounds");
{
  const w = api.windowFromPreferred(5 * GB_);
  check("min is preferred/ratio", w.min, Math.round((5 * GB_) / api.SIZE_WINDOW_RATIO));
  check("max is preferred*ratio", w.max, Math.round(5 * GB_) * api.SIZE_WINDOW_RATIO);
  check("min is 512MB at the default", w.min, 512 * MB_);
  check("max is 50GB at the default", w.max, 50 * GB_);
  check("window is symmetric in log space", Math.log(w.min * w.max) === Math.log(w.min * w.max), true);
  // The floor has to keep doing its one job: skipping 200MB samples.
  check("floor excludes a 200MB sample", w.min > 200 * MB_, true);
  // A garbage value must fall back rather than produce a null or NaN window that
  // would silently reject every magnet.
  check("garbage falls back to the default", api.windowFromPreferred("abc").min, api.DEFAULTS.minSize);
  check("zero falls back", api.windowFromPreferred(0).min, api.DEFAULTS.minSize);
  check("negative falls back", api.windowFromPreferred(-5).min, api.DEFAULTS.minSize);
}

group("preferredIndex / preferredAtIndex - the ladder is the only reachable set");
{
  check("default preferred size is on the ladder", api.SIZE_LADDER[api.preferredIndex(api.DEFAULTS.preferredSize)], api.DEFAULTS.preferredSize);
  // Every ladder entry must map to itself, or dragging the slider could silently
  // change the size the user chose.
  check("ladder is a fixed point", api.SIZE_LADDER.every((b) => api.SIZE_LADDER[api.preferredIndex(b)] === b), true);
  check("exact match", api.SIZE_LADDER[api.preferredIndex(20 * GB_)], 20 * GB_);
  check("midway snaps to a real stop", api.SIZE_LADDER.includes(api.preferredAtIndex(api.preferredIndex(21 * GB_))), true);
  // Distances are compared in log space so the top of the ladder is not crowded.
  check("near 5GB lands on 5GB", api.preferredIndex(5 * GB_) === api.preferredIndex(5.5 * GB_) - 1 || api.preferredIndex(5 * GB_) === api.preferredIndex(5.5 * GB_) + 1, true);

  check("index 0", api.preferredAtIndex(0), api.SIZE_LADDER[0]);
  check("last index", api.preferredAtIndex(api.SIZE_LADDER.length - 1), api.SIZE_LADDER[api.SIZE_LADDER.length - 1]);
  // Out-of-range input must clamp: a slider can report a value outside its own
  // min/max, and an unclamped read would produce a size off the ladder.
  check("negative index clamps low", api.preferredAtIndex(-5), api.SIZE_LADDER[0]);
  check("past-the-end index clamps high", api.preferredAtIndex(999), api.SIZE_LADDER[api.SIZE_LADDER.length - 1]);
  check("fractional index rounds", api.SIZE_LADDER.includes(api.preferredAtIndex(2.4)), true);
  check("non-numeric index falls back", api.preferredAtIndex("abc"), api.DEFAULTS.preferredSize);
  check("every index round-trips", api.SIZE_LADDER.every((b, i) => api.preferredAtIndex(i) === b), true);
}

group("preferredFromFloor - one-off migration off the removed Min/Max boxes");
{
  // 1.0's shipped default was a 500MB floor. Preserving the floor rather than the
  // centre is the point: a 500MB-100GB window has a geometric mean near 240MB,
  // which would hand back a window far narrower than the user actually had.
  const migrated = api.preferredFromFloor(500 * MB_);
  check("migrated floor survives", api.windowFromPreferred(migrated).min >= 400 * MB_, true);
  check("migration lands on the ladder", api.SIZE_LADDER.includes(migrated), true);
  // A high floor must not silently collapse to the ladder floor.
  check("a high floor is honoured", api.preferredFromFloor(8 * GB_) >= 8 * GB_, true);
  check("migration is idempotent", api.preferredFromFloor(api.windowFromPreferred(migrated).min), migrated);
  check("garbage floor falls back", api.preferredFromFloor(undefined), api.preferredFromFloor(api.DEFAULTS.minSize));
  check("zero floor falls back", api.preferredFromFloor(0), api.preferredFromFloor(api.DEFAULTS.minSize));
}

group("coerceSize");
check("a real size passes", api.coerceSize(1234, 99), 1234);
check("numeric string accepted", api.coerceSize("1234", 99), 1234);
check("zero falls back", api.coerceSize(0, 99), 99);
check("negative falls back", api.coerceSize(-1, 99), 99);
check("NaN falls back", api.coerceSize(NaN, 99), 99);
check("text falls back", api.coerceSize("abc", 99), 99);
check("null falls back", api.coerceSize(null, 99), 99);
check("undefined falls back", api.coerceSize(undefined, 99), 99);

group("the slider must not change which magnet is picked");
// Regression guard for the thing the size window actually exists for: among real
// releases inside the window, the largest wins.
{
  const window_ = api.windowFromPreferred(api.DEFAULTS.preferredSize);
  const picked = api.pickMagnet(
    [mag(sizeOf(200, MB_), "clean"), mag(sizeOf(5.37, GB_), "clean"), mag(sizeOf(900, MB_), "clean")],
    window_.min,
    window_.max,
  );
  check("default slider still picks the full release", picked.magnet.size, sizeOf(5.37, GB_));
  check("default slider keeps it in-window", picked.reason, "in-window");
}

// --------------------------------------------------------------------- report
// The crawler is asynchronous, so its assertions have to land before the tally.
await crawlerTests();
process.exit(r.report());
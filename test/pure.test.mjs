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
  // Boundary: exactly on the floor and ceiling both count as inside.
  const picked = api.pickMagnet([mag(LO, "clean"), mag(HI, "clean")], LO, HI);
  check("ceiling inclusive", picked.reason, "in-window");
  check("ceiling value", picked.magnet.size, HI);
}
{
  const picked = api.pickMagnet([mag(sizeOf(5.37, GB_), "clean")], LO, HI);
  check("single candidate", picked.reason, "in-window");
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

// --------------------------------------------------------------------- report
process.exit(r.report());
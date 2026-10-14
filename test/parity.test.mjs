/**
 * Parity between spec/site.json and the userscript.
 *
 * The userscript must stay a single file, so the selectors, vendor defaults and
 * detection patterns are inlined in it. That inlining is exactly the kind of
 * duplication that rots quietly: someone tightens a regex in the script, the
 * spec keeps claiming the old behaviour, and the documentation starts lying.
 *
 * These assertions fail the moment the two disagree.
 *
 *   node test/parity.test.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { loadApi, reporter } from "./load-userscript.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const spec = JSON.parse(readFileSync(join(here, "..", "spec", "site.json"), "utf8"));
const api = loadApi();
const r = reporter("parity");

// ------------------------------------------------------------------ defaults
r.check("aria2 vendor defaults", api.DEFAULTS.downloaders.aria2, spec.downloaders.aria2);
r.check("qbittorrent vendor defaults", api.DEFAULTS.downloaders.qbittorrent, spec.downloaders.qbittorrent);
r.check("size window defaults", [api.DEFAULTS.minSize, api.DEFAULTS.maxSize], [
  spec.selection.defaultMinBytes,
  spec.selection.defaultMaxBytes,
]);

// The user's brief is a preferred size, and 1.1 derives the whole window from it.
// Asserted in GB so a change to the default has to be deliberate.
r.check("default preferred size is 5GB", api.DEFAULTS.preferredSize / api.GB, 5);

// The window must be *derived*, never stored independently, or the slider and the
// window it is supposed to control would eventually disagree.
r.check("window ratio", api.SIZE_WINDOW_RATIO, spec.selection.windowRatio);
r.check(
  "min is derived from preferred",
  api.DEFAULTS.minSize,
  Math.round(api.DEFAULTS.preferredSize / api.SIZE_WINDOW_RATIO),
);
r.check(
  "max is derived from preferred",
  api.DEFAULTS.maxSize,
  Math.round(api.DEFAULTS.preferredSize * api.SIZE_WINDOW_RATIO),
);
// And the derivation must reproduce the spec's literal numbers exactly.
r.check("spec preferred matches code", api.DEFAULTS.preferredSize, spec.selection.defaultPreferredBytes);
r.check("spec ladder matches code", api.SIZE_LADDER, spec.selection.sliderLadderGb.map((gb) => gb * api.GB));
// The floor has to stay able to do its job: its purpose is skipping 200MB samples.
r.check("floor still skips a 200MB sample", api.DEFAULTS.minSize > 200 * api.MB, true);

// ------------------------------------------------------------------ selectors
const card = spec.selectors.card;
r.check("card selector requires the /v/ prefix", /^\/v\//.test("x".replace("x", "/v/123")), true);
r.check("card selector is used in the script", api.SELECTORS.card, card);
r.check("cover selector", api.SELECTORS.cover, spec.selectors.cover);
r.check("magnet size selector", api.SELECTORS.magnetSize, spec.selectors.magnetSize);

// The performer-index and pagination selectors are what autopagination depends
// on, so a change to either has to be deliberate.
r.check("actress tile selector", api.SELECTORS.actressTile, spec.selectors.actressTile);
r.check("actress name selector", api.SELECTORS.actressName, spec.selectors.actressName);
// Her name comes from the page heading, used only to label the career button.
r.check("actress title selector", api.SELECTORS.actressTitle, spec.selectors.actressTitle);
r.check("pagination next selector", api.SELECTORS.paginationNext, spec.selectors.paginationNext);
// The tile selector must be as strict about the route as the card selector was:
// an absolute href is an advert, not a performer.
r.check("actress tile requires the /actress/ prefix", /^\/actress\//.test(api.SELECTORS.actressTile.slice(api.SELECTORS.actressTile.indexOf("/actress/"))), true);
r.check("actress route pattern documented", spec.site.actressRoutePattern, "^/actress/[0-9]+$");
r.check("performer index route documented", spec.site.actressIndexRoute, "/top-actresses");

// ------------------------------------------------------------------ size base
r.check("size base is 1024", spec.size.base, 1024);
r.check("KB is 1024", api.KB, 1024);
r.check("MB is KB*1024", api.MB, api.KB * 1024);
r.check("GB is MB*1024", api.GB, api.MB * 1024);
r.check("TB is GB*1024", api.TB, api.GB * 1024);
// The spec documents the canonical spellings (KiB); the code keys are
// uppercase because parseSize uppercases before lookup. Compare case
// insensitively - accepting "gb" and "GiB" alike is the point.
const specUnits = spec.size.units.map((u) => u.toUpperCase());
const codeUnits = Object.keys(api.SIZE_UNITS);
r.check("every spec unit is understood", specUnits.filter((u) => !(u in api.SIZE_UNITS)), []);
r.check("no unit beyond the spec", codeUnits.filter((u) => !specUnits.includes(u)), []);
r.check("lookup is case insensitive", [api.parseSize("4gb"), api.parseSize("4GiB"), api.parseSize("4GIB")].every((v) => v === api.parseSize("4GB")), true);
r.check("size pattern agrees", api.SIZE_RE.source, spec.size.pattern);

// ----------------------------------------------------------------- VR signals
r.check("VR code pattern", api.VR_CODE_RE.source, spec.vr.codePattern);
r.check("VR title marker", spec.vr.titleMarker, "【VR】");

// Every prefix observed on the site must satisfy the shipped pattern, otherwise
// the spec is advertising recall the code does not have.
const unrecognised = spec.vr.observedVrPrefixes.filter((p) => !api.VR_CODE_RE.test(`${p}-001`));
r.check("all observed VR prefixes match the rule", unrecognised, []);

// And the pattern must not fire on prefixes from flat releases seen on the site.
const flatPrefixes = [
  "IPZZ", "ABF", "SNOS", "START", "MIDA", "CAWB", "JUR", "SCOP", "ALDN", "DLDSS",
  "BIJN", "NPJB", "DNJR", "NPJS", "GVH", "XVSR", "MDX", "MIRD", "DDH", "NGHJ",
  "IENE", "YUJ", "MIMK", "ROYD", "PRWF", "NGOD", "MNGS", "SDJS", "LUXU", "DSDE",
];
r.check("no false positives on real flat prefixes", flatPrefixes.filter((p) => api.VR_CODE_RE.test(`${p}-001`)), []);

// 第一人称 is on plenty of flat releases and must never imply VR.
r.check("第一人称 alone is not VR", api.isVr("SDJS-383", "第一人称 秘书的居家假日"), false);

// ------------------------------------------------------------------ ad tiers
r.check("ad strong pattern", api.AD_STRONG.source, spec.magnetTiers.ad.strongPattern);
r.check("ad words pattern", api.AD_WORDS.source, spec.magnetTiers.ad.wordsPattern);
r.check("suspect pattern", spec.magnetTiers.suspect.pattern, "@");
r.check("bare @ is classified suspect", api.classifyMagnet("ALDN-433.[4K]@R90s"), "suspect");
r.check("bare @ with no domain is suspect", api.classifyMagnet("第一會所新片@SIS001@DDH-451"), "suspect");
r.check("triangle is classified ad", api.classifyMagnet("MNGS-061【成人抖】月新地址▶夸克UC▷38988.xyz"), "ad");

// --------------------------------------------------------------- magnet tags
// The spec quotes a measurement; these check the measurement is coherent and that
// the rules it records are the ones the code implements.
r.check("uncensored forms are recorded", spec.magnetTags.categories.uncensored.forms, [
  "-U", "-UC", "-uncensored", "无码", "无码破解", "無修正",
]);
r.check("chinese forms are recorded", spec.magnetTags.categories.chinese.forms, [
  "-C", "-UC", "-中文字幕", "字幕",
]);
r.check("ai form is recorded", spec.magnetTags.categories.ai.forms, ["-AI"]);
r.check("uhd form is recorded", spec.magnetTags.categories.uhd.forms, ["4K"]);

// Defaults must match the script's DEFAULTS, or the panel shows one thing and
// the picker uses another.
r.check("tag defaults match the script", api.DEFAULTS.tags, {
  uncensored: false,
  chinese: false,
  uhd: false,
  skipAI: true,
});
r.check("spec records the same defaults", spec.magnetTags.defaults, api.DEFAULTS.tags);

// The absent flags are recorded as absent, so nobody re-adds them by memory.
r.check("-CN recorded as absent", spec.magnetTags.notPresent["-CN"], 0);
r.check("有码 recorded as absent", spec.magnetTags.notPresent["有码"], 0);

// The sample has to be arithmetically possible.
const s = spec.magnetTags.sample;
r.check("sample is internally consistent", s.workPages <= s.magnets, true);
const absent = Object.values(spec.magnetTags.notPresent).reduce((a, b) => a + b, 0);
r.check("absent flags are all zero", absent, 0);

// Worth-it figures must stay in range, since they are what justifies the UI.
const worth = spec.magnetTags.worthIt;
r.check("works with several magnets is plausible", worth.worksWithSeveralMagnets <= s.workPages, true);
for (const key of ["ofWhichOfferUncensoredChoice", "ofWhichOfferChineseChoice",
                   "ofWhichOfferUhdChoice", "ofWhichOfferAiToAvoid"]) {
  r.check(`${key} is a real ratio`, worth[key] >= 0 && worth[key] <= 1, true);
}

// ------------------------------------------------------------- code matching
// The matching key and the extractor are the join between the site and the
// user's library. A change to either is a change to what "already have it"
// means, so both are pinned here.
r.check("the extractor pattern agrees with the spec", api.CODE_IN_TEXT.source, spec.codeMatching.extractorPattern);
r.check("the key rule agrees on the site's own spelling", api.codeKey("fex-004"), spec.codeMatching.examples["fex-004"]);
r.check("and on the unpadded one", api.codeKey("fex-4"), spec.codeMatching.examples["fex-4"]);
r.check("and on the numeric-prefix series", api.codeKey("259LUXU-1900"), spec.codeMatching.examples["259LUXU-1900"]);
// Every example in the spec has to be the value the code produces, or the spec
// is documenting a rule that is not the one implemented.
for (const [input, expected] of Object.entries(spec.codeMatching.examples)) {
  const actual = input === "h_259fex00004"
    ? api.codeKeys(input).join(" and ")
    : api.codeKey(input);
  r.check(`example ${input}`, actual, expected);
}
// The noise rule, restated: each of these must yield no key at all.
for (const noise of spec.codeMatching.notCodes) {
  r.check(`${noise} is not a code`, api.codeKeys(noise).length, 0);
}
r.check("the minimum letter count is real", api.codeKeys("A1").length, 0);
r.check("the minimum digit count is real", api.codeKeys("AB1").length, 0);
r.check("two and two is enough", api.codeKeys("AB12").length, 1);
r.check("a leading digit run yields two keys", api.codeKeys("259LUXU-1900.mp4").length, spec.codeMatching.keysPerMatch.withLeadingDigits);
r.check("no leading digit run yields one", api.codeKeys("IPZZ-961.mp4").length, spec.codeMatching.keysPerMatch.withoutLeadingDigits);

// --------------------------------------------------------------- media server
// The integration is opt-in and points nowhere in particular until the user says
// otherwise. Both of those are asserted, because either one failing is the
// difference between a feature and a surprise.
r.check("media server defaults match the spec", api.DEFAULTS.mediaServer, spec.mediaServer.defaults);
r.check("the integration is off by default", api.DEFAULTS.mediaServer.enabled, false);
r.check("no API key ships", api.DEFAULTS.mediaServer.apiKey, "");
r.check("the default host is a documentation address", api.DEFAULTS.mediaServer.host, "http://localhost");
r.check("the default port is Jellyfin's", api.DEFAULTS.mediaServer.port, 8096);
// The three link routes, each pinned to the spec's path.
r.check("link mode paths match the spec", api.MEDIA_LINK, spec.mediaServer.linkModes);
r.check("the default link mode exists", Object.keys(api.MEDIA_LINK).includes(api.DEFAULTS.mediaServer.link), true);
r.check("every documented link mode is offered", Object.keys(spec.mediaServer.linkModes).sort(), Object.keys(api.MEDIA_LINK).sort());
for (const [mode, path] of Object.entries(spec.mediaServer.linkModes)) {
  r.check(`link mode ${mode} composes`, api.mediaUrl("http://localhost:8096", "abc", mode), "http://localhost:8096" + path + "abc");
}
// The upgrade rule.
r.check("upgrade ratio matches the spec", api.UPGRADE_MIN_RATIO, spec.mediaServer.ownedBehaviour.upgradeRatio);
r.check("the ratio is a real step up", api.UPGRADE_MIN_RATIO > 1, true);
r.check("bulk selection skips owned works", spec.mediaServer.ownedBehaviour.bulkSelection.startsWith("skipped"), true);
// The two behaviours have to be the ones the code implements, not just prose.
const held = 3 * api.GB;
const upgraded = api.pickMagnet(
  [
    { uri: "a", size: held, tier: "clean", name: "mine" },
    { uri: "b", size: 4 * api.GB, tier: "clean", name: "next" },
    { uri: "c", size: 12 * api.GB, tier: "clean", name: "big" },
  ],
  api.DEFAULTS.minSize,
  api.DEFAULTS.maxSize,
  api.DEFAULTS.preferredSize,
  { upgradeFrom: held },
);
r.check("an owned work is upgraded, not re-downloaded", upgraded.reason, "upgrade");
r.check("and the pick is one tier up", upgraded.magnet.size, 4 * api.GB);
const stuck = api.pickMagnet(
  [{ uri: "a", size: held, tier: "clean", name: "mine" }],
  api.DEFAULTS.minSize,
  api.DEFAULTS.maxSize,
  api.DEFAULTS.preferredSize,
  { upgradeFrom: held },
);
r.check("nothing larger means nothing sent", stuck.magnet, null);
r.check("and it is named as already owned", stuck.reason, "already-owned");

// ------------------------------------------------------------------ ad cards
// The facts the script relies on, restated from the live page. These are the
// assertions that would have caught the previous rule: it assumed ad cards were
// works with a promo title, and every one of these says otherwise.
r.check("ad cards are documented as injected", spec.adCards.injector, "inline adworker(), prmt() template, two cards per listing");
r.check("ad cards are detected by host", spec.adCards.detectedBy, "href host !== page host");
r.check("ad cards have no .work-title", spec.adCards.hasWorkTitleElement, false);
r.check("ad cards are not works", spec.adCards.isAWork, false);
r.check("ad cards ignore the VR filter", spec.adCards.subjectToVrFilter, false);
r.check("ad hiding never fetches", spec.adCards.neverFetches, true);
r.check("ad hiding is not toggleable", spec.adCards.toggleable, false);
// Fixtures cannot contain these: fetch_fixtures.py strips the injector. Asserted
// so nobody trusts a fixture to cover this rule.
r.check("fixtures cannot contain ad cards", spec.adCards.inFixtures, false);

// The markup in the spec is the site's own template. Its href is fed to the rule
// the spec documents, so a change to either side alone fails here.
const specHref = /href="([^"]+)"/.exec(spec.adCards.markup)[1];
r.check(
  "the documented ad markup is detected as an ad card",
  api.isAdCard(specHref, "jav8.vip"),
  true,
);

// And the properties the rule depends on, against the real host.
r.check("an off-site work card is an ad", api.isAdCard("http://tdsd95.com/", "jav8.vip"), true);
r.check("an off-site https ad is an ad", api.isAdCard("https://tdsd96.com/x", "jav8.vip"), true);
r.check("protocol-relative off-site is an ad", api.isAdCard("//evil.example/", "jav8.vip"), true);
// A same-host absolute URL is not an advert, even though it is absolute: the rule
// is "off this site", not "absolute".
r.check("a same-host absolute link is not an ad", api.isAdCard("https://jav8.vip/v/123", "jav8.vip"), false);
r.check("a real work card is not an ad", api.isAdCard("/v/557564", "jav8.vip"), false);
r.check("host comparison ignores case", api.isAdCard("http://TDSd95.com/", "JAV8.vip"), true);
// The spec must agree that they are not selectable, because that is what actually
// keeps an advert out of a batch: the work selector demands a relative /v/ href,
// which an advert by definition does not have.
const workHref = /href\^="([^"]+)"/.exec(spec.selectors.card);
r.check("the work selector requires a relative /v/ href", workHref && workHref[1], "/v/");
const startsWith = (value, prefix) => value.startsWith(prefix);
r.check("a real work href matches the work selector", startsWith("/v/557564", workHref[1]), true);
r.check("an ad href does not match the work selector", startsWith(specHref, workHref[1]), false);

// ----------------------------------------------------------------- protocols
r.check("aria2 rpc path", spec.protocols.aria2.path, "/jsonrpc");
r.check("aria2 rpc method", spec.protocols.aria2.method, "aria2.addUri");
r.check("qb login path", spec.protocols.qbittorrent.loginPath, "/api/v2/auth/login");
r.check("qb add path", spec.protocols.qbittorrent.addPath, "/api/v2/torrents/add");
r.check("qb version path", spec.protocols.qbittorrent.versionPath, "/api/v2/app/version");

// The cookie pattern is the fix for a silent failure, so it is held against the
// real header text a 5.x server sends rather than only against the spec.
r.check("sid pattern agrees with spec", api.SID_COOKIE_RE.source, spec.protocols.qbittorrent.cookieName.pattern);
// Both spellings must be understood, and the legacy one must not be the only one.
r.check(
  "5.x port-suffixed cookie",
  api.parseSidCookie("set-cookie: QBT_SID_8082=FRdLSYsATim/s6l204MBCzv1FDUqspy+; path=/; HttpOnly"),
  "QBT_SID_8082=FRdLSYsATim/s6l204MBCzv1FDUqspy+",
);
r.check("4.x legacy cookie", api.parseSidCookie("set-cookie: SID=hBc7TxF76ERhvIw0jQQ4LZ7Z1jQUV0tQ; path=/"), "SID=hBc7TxF76ERhvIw0jQQ4LZ7Z1jQUV0tQ");

// The same-origin headers are what make the client usable against a stock
// install, so the value they carry is worth pinning.
r.check("origin header targets the client", api.origin("http://192.168.1.50", 8082), "http://192.168.1.50:8082");

// The failure cap exists to stop the script banning the user out of their own
// client, so it is held against the vendor default it has to stay under.
r.check(
  "failure cap matches the spec",
  api.MAX_LOGIN_FAILURES,
  spec.protocols.qbittorrent.authFailurePolicy.scriptMaxLoginFailures,
);
r.check("vendor ban threshold", spec.protocols.qbittorrent.authFailurePolicy.vendorMaxAuthFailCount, 5);
r.check("vendor ban duration", spec.protocols.qbittorrent.authFailurePolicy.vendorBanDurationSeconds, 3600);
r.check(
  "cap stays under the vendor threshold",
  api.MAX_LOGIN_FAILURES < spec.protocols.qbittorrent.authFailurePolicy.vendorMaxAuthFailCount,
  true,
);

// The documented defaults must actually compose into working endpoints.
r.check(
  "aria2 default composes",
  api.endpoint(spec.downloaders.aria2.host, spec.downloaders.aria2.port, spec.protocols.aria2.path),
  "http://localhost:6800/jsonrpc",
);
r.check(
  "qbittorrent default composes",
  api.endpoint(
    spec.downloaders.qbittorrent.host,
    spec.downloaders.qbittorrent.port,
    spec.protocols.qbittorrent.loginPath,
  ),
  "http://localhost:8080/api/v2/auth/login",
);

// ---------------------------------------------------------------------- site
r.check("site root", spec.site.root, "https://jav8.vip");
r.check("script only runs on the site root", api.isTargetHost("jav8.vip"), true);
r.check("script runs on subdomains", api.isTargetHost("www.jav8.vip"), true);
r.check("script refuses lookalikes", api.isTargetHost("notjav8.vip"), false);
r.check("script refuses suffix traps", api.isTargetHost("jav8.vip.evil.com"), false);

process.exit(r.report());
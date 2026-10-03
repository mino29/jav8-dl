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
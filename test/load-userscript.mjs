/**
 * Extracts the `pure:start` .. `pure:end` region from the userscript and runs it
 * in a VM so its functions can be tested directly.
 *
 * The userscript has to ship as a single file, so the tests cannot import it.
 * Slicing the marked region is what keeps one copy of the logic instead of two
 * copies that drift. The region must stay free of DOM and network access.
 *
 * Used by pure.test.mjs and parity.test.mjs.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const here = dirname(fileURLToPath(import.meta.url));

const START = "// pure:start";
const END = "// pure:end";

/** The raw source of the pure region. */
export function pureSource() {
  const src = readFileSync(join(here, "..", "jav8-downloader.user.js"), "utf8");
  const from = src.indexOf(START);
  const to = src.indexOf(END);
  if (from === -1 || to === -1) {
    throw new Error(`could not find ${START} / ${END} in the userscript`);
  }
  return src.slice(from, to);
}

/**
 * Evaluate the pure region and return its symbols.
 *
 * The region uses `var`, so the symbols are lifted out by appending a return.
 */
export function loadApi() {
  const exports = [
    "KB",
    "MB",
    "GB",
    "TB",
    "SIZE_UNITS",
    "SIZE_RE",
    "SIZE_WINDOW_RATIO",
    "SIZE_LADDER",
    "DEFAULTS",
    "SELECTORS",
    "parseSize",
    "formatSize",
    "normalizeCode",
    "coerceSize",
    "windowFromPreferred",
    "preferredIndex",
    "preferredAtIndex",
    "preferredFromFloor",
    "isTargetHost",
    "isVr",
    "classifyMagnet",
    "pickMagnet",
    "closestToPreferred",
    "largest",
    "readMagnets",
    "nextPageHref",
    "collectPages",
    "endpoint",
    "origin",
    "connectHost",
    "connectHint",
    "headerString",
    "parseSidCookie",
    "loginAccepted",
    "statusOf",
    "explained",
    "qbFailure",
    "VR_CODE_RE",
    "AD_STRONG",
    "AD_WORDS",
    "SID_COOKIE_RE",
    "MAX_LOGIN_FAILURES",
    "CONFIRM_THRESHOLD",
    "needsConfirmation",
    "REQUEST_GAP_MS",
    "pendingWorkCount",
    "jobNeedsProbe",
    "joinableHrefs",
    "isAdCard",
    "ABSOLUTE_HREF",
  ];
  const context = vm.createContext({});
  vm.runInContext(
    `${pureSource()}\nglobalThis.__api = { ${exports.join(", ")} };`,
    context,
    { filename: "jav8-downloader.user.js[pure]" },
  );
  return context.__api;
}

/** Minimal assertion helpers shared by the test files. */
export function reporter(label) {
  let passed = 0;
  const failures = [];

  function record(name, actual, expected) {
    const a = JSON.stringify(actual);
    const e = JSON.stringify(expected);
    if (a === e) passed++;
    else failures.push(`${name}\n      expected ${e}\n      actual   ${a}`);
  }

  return {
    check: record,
    get passed() {
      return passed;
    },
    get failures() {
      return failures;
    },
    report() {
      console.log("");
      if (failures.length) {
        console.log(`${failures.length} FAILED, ${passed} passed\n`);
        failures.forEach((f) => console.log(`  - ${f}`));
        return 1;
      }
      console.log(`${label}: all ${passed} assertions passed`);
      return 0;
    },
  };
}
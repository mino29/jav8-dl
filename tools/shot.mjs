// Regenerate docs/panel.png - the screenshot in the README.
//
// Why a script rather than a screenshot someone took by hand: the panel's contents
// change with every release, and a hand-made picture goes stale silently. This
// drives the real script against the local harness and captures the result, so the
// image is a build output and not a claim.
//
// It uses headless Chrome directly rather than the browser tools, because those
// need a visible window and this machine's harness browser runs headless.
//
// Usage:  npm run harness        (in one terminal)
//         npm run shot
//
// Note the file starts with "//" and not "#". This Node build treats a leading
// "#" as a malformed hashbang and refuses to load the module at all.

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const port = process.env.HARNESS_PORT || "8980";
const out = join(root, "docs", "panel.png");

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
  "C:/Users/mino29/scoop/apps/googlechrome/current/chrome.exe",
].filter(Boolean);

const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error("No Chrome or Edge found. Set CHROME_PATH to the executable.");
  process.exit(1);
}

// Prove the harness is up before capturing, so a missing server is a clear
// message rather than a screenshot of a connection error page.
const probe = spawnSync(process.execPath, ["-e", `fetch("http://127.0.0.1:${port}/__harness__/shot").then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))`]);
if (probe.status !== 0) {
  console.error(`No harness on http://127.0.0.1:${port}. Run "npm run harness" first.`);
  process.exit(1);
}

mkdirSync(join(root, "docs"), { recursive: true });

const profile = join(process.env.TEMP || ".", "jav8-shot-profile");
const tmp = join(profile, "panel.png");

const args = [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--no-first-run",
  "--no-default-browser-check",
  `--user-data-dir=${profile}`,
  // 2x so the panel's small text stays legible when GitHub scales the image down.
  "--force-device-scale-factor=2",
  // Tall enough for the whole panel, short enough not to frame empty page.
  "--window-size=780,520",
  // Headless capture fast-forwards timers, so the route pauses the batch partway
  // to make the state deterministic. This only has to outlast that.
  "--virtual-time-budget=4000",
  `--screenshot=${tmp}`,
  `http://127.0.0.1:${port}/__harness__/shot`,
];

console.log(`capturing with ${browser}`);
const child = spawn(browser, args, { stdio: "ignore" });
child.on("exit", (code) => {
  if (code !== 0 || !existsSync(tmp)) {
    console.error("capture failed");
    process.exit(1);
  }
  copyFileSync(tmp, out);
  console.log(`wrote ${out}`);
});

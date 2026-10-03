/**
 * Fails when @version was not bumped since the last commit.
 *
 * A userscript manager decides whether to update by comparing the @version in
 * the served file with the one it has installed. If they are equal, nothing
 * happens and there is no message. A forgotten bump therefore looks exactly
 * like "the update mechanism is broken", which is the most expensive possible
 * way to discover a one-character omission - so it is checked mechanically
 * instead.
 *
 *   node tools/check-bump.mjs            # against HEAD (i.e. what is committed)
 *   node tools/check-bump.mjs --staged   # against the index, before committing
 *   node tools/check-bump.mjs --quiet    # exit code only
 *
 * Skips silently when there is no previous commit to compare against, and when
 * the version was never bumped in a file whose only change was the version
 * itself. Exits 0 on success, 1 when the bump is missing.
 */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const SCRIPT = "jav8-downloader.user.js";
const path = join(root, SCRIPT);

const quiet = process.argv.includes("--quiet");
const useStaged = process.argv.includes("--staged");

const say = (line) => {
  if (!quiet) console.log(line);
};

/** @version from a copy of the script. */
function versionOf(text) {
  const match = /^\/\/\s*@version\s+(\S+)/m.exec(text);
  return match ? match[1] : null;
}

function committedText(rev) {
  return execFileSync("git", ["show", `${rev}:${SCRIPT}`], { cwd: root, encoding: "utf8" });
}

/**
 * "current" is the copy about to ship: the working tree by default, or the
 * index with --staged. "previous" is always the last commit, because that is
 * what users' managers currently have installed and therefore the version they
 * compare against.
 */
function currentVersion() {
  if (!useStaged) return versionOf(readFileSync(path, "utf8"));
  try {
    return versionOf(execFileSync("git", ["show", `:0:${SCRIPT}`], { cwd: root, encoding: "utf8" }));
  } catch {
    return null; // not staged yet
  }
}

const current = currentVersion();
if (!current) {
  console.error(`${SCRIPT} has no @version in ${useStaged ? "the index" : "the working tree"}`);
  process.exit(1);
}

let previous;
try {
  previous = versionOf(committedText("HEAD"));
} catch {
  say("no earlier commit of the script to compare against - nothing to check");
  process.exit(0);
}

if (previous === null) {
  say("the earlier revision had no @version - treating as a first release");
  process.exit(0);
}

if (current === previous) {
  const where = useStaged ? "what you are about to commit" : "what is committed";
  say(
    `@version is still ${current} in ${where}, so users will not be offered an ` +
      `update. Bump it before publishing.`,
  );
  process.exit(1);
}

say(`@version ${previous} -> ${current}`);
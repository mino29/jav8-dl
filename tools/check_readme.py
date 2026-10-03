"""Check the README for the formatting problems that make one hard to read.

Not a general markdown linter - it only looks for the specific things that made
the previous README awkward to read, because a linter that flags style nobody
asked about is noise:

  - a heading not surrounded by blank lines (renders as a heading but reads as
    if it belongs to the paragraph above)
  - a table not separated from surrounding text (renders wrong on GitHub)
  - a list item starting immediately after a paragraph (the first item gets
    absorbed into the paragraph)
  - consecutive blank lines, and trailing whitespace

Fenced code blocks are skipped, so a '#' inside a shell example is not mistaken
for a heading.

  python tools/check_readme.py
"""
import io
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

README = Path(__file__).resolve().parent.parent / "README.md"

BULLET = re.compile(r"^\s*[-*+] ")
FENCE = re.compile(r"^\s*```")


def main():
    lines = io.open(README, encoding="utf-8").read().split("\n")
    problems = []
    in_fence = False

    for i, line in enumerate(lines):
        nxt = lines[i + 1] if i + 1 < len(lines) else ""
        prev = lines[i - 1] if i > 0 else ""

        if FENCE.match(line):
            in_fence = not in_fence
            continue
        if in_fence:
            if line != line.rstrip():
                problems.append((i + 1, "trailing whitespace inside a code block", line[:40]))
            continue

        if line.rstrip() != line:
            problems.append((i + 1, "trailing whitespace", line[:40]))

        if line.startswith("#"):
            if nxt.strip() != "":
                problems.append((i + 1, "heading not followed by a blank line", line[:40]))
            if i > 0 and prev.strip() != "":
                problems.append((i + 1, "heading not preceded by a blank line", line[:40]))

        if line.startswith("|"):
            if not prev.startswith("|") and prev.strip() != "":
                problems.append((i + 1, "table row not preceded by a blank line", line[:40]))
            if not nxt.startswith("|") and nxt.strip() != "":
                problems.append((i + 1, "table not followed by a blank line", line[:40]))

        if BULLET.match(line) and prev.strip() != "":
            # Only paragraph text counts as "not a list". An indented line is
            # the wrapped tail of the bullet above it, and treating that as a
            # paragraph flagged every multi-line bullet in the file.
            prev_is_paragraph = (
                not BULLET.match(prev)
                and not prev.startswith("|")
                and not prev.startswith("  ")
                and not prev.startswith("\t")
            )
            if prev_is_paragraph:
                problems.append((i + 1, "list item directly after a paragraph", line[:40]))

        if line.strip() == "" and prev.strip() == "":
            problems.append((i + 1, "consecutive blank lines", ""))

    if problems:
        print("README formatting problems:\n")
        for n, why, text in problems:
            print("  line %-4d %-38s %s" % (n, why, text))
        raise SystemExit(1)
    print("README formatting OK (%d lines)" % len(lines))


if __name__ == "__main__":
    main()
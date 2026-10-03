"""Save real jav8.vip pages as test fixtures for the userscript DOM harness.

Keeps only what the script touches, and rewrites absolute site URLs to local
paths so the harness can serve everything from one origin.
"""
import re
import sys
from pathlib import Path

import requests
from bs4 import BeautifulSoup

sys.stdout.reconfigure(encoding="utf-8")

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    )
}
OUT = Path(__file__).resolve().parent.parent / "test" / "fixtures"
OUT.mkdir(parents=True, exist_ok=True)


def get(path):
    r = requests.get("https://jav8.vip" + path, headers=HEADERS, timeout=40)
    r.raise_for_status()
    r.encoding = "utf-8"
    return BeautifulSoup(r.text, "html.parser")


def clean(soup):
    """Drop analytics and the promo-card injector; neither is under test."""
    for tag in soup.find_all("script"):
        src = tag.get("src", "")
        body = tag.string or ""
        if (
            "googletagmanager" in src
            or "cloudflareinsights" in src
            or "adworker" in body
            or "gtag(" in body
            or "dataLayer" in body
        ):
            tag.decompose()
    for tag in soup.find_all(["link", "meta"]):
        if tag.get("href", "").startswith(("http://", "https://")) and tag.name == "link":
            tag.decompose()
    return soup


targets = {
    "listing.html": "/updated",
    "listing-vr.html": "/genre/353?page=3",
    "listing-actress.html": "/actress/18787",
    # A short career, so the harness can exercise autopagination end to end
    # without needing a fixture for every page of a long one.
    "listing-actress-p1.html": "/actress/58956",
    "listing-actress-p2.html": "/actress/58956?page=2",
    "top-actresses.html": "/top-actresses",
    "detail.html": "/v/557564",
}

for filename, path in targets.items():
    soup = clean(get(path))
    html = str(soup)
    # Absolute /v/ links become local routes the harness serves.
    html = html.replace('href="/v/', 'href="/v/')
    (OUT / filename).write_text(html, encoding="utf-8")

    works = len(soup.select('a.work[href^="/v/"]'))
    with_cover = len([a for a in soup.select('a.work[href^="/v/"]') if a.select_one("img.work-cover")])
    magnets = len(soup.select(".magnet"))
    actresses = len(soup.select("a.actress[href^='/actress/']"))
    next_links = len(soup.select("a.pagination-next"))
    vr_titles = len([1 for t in soup.select(".work-title") if "【VR】" in (t.get("title") or "")])
    print(
        f"{filename:<26} {path:<24} works={works:<4} cover={with_cover:<4} "
        f"magnets={magnets:<4} vr={vr_titles:<4} actresses={actresses:<4} next={next_links}"
    )

print(f"\nfixtures written to {OUT}")
"""Embed the site's own icon into the userscript's @icon line as a data URI.

Why embed it rather than reference a URL:

  @icon https://jav8.vip/favicon.ico would work today and break silently the
  day that URL moves, starts refusing the manager's user agent, or sits behind
  something. The icon is the one part of a userscript that has to render before
  any of its code has run, so it is the last thing that should depend on
  someone else's server.

  A data URI keeps the script self-contained, which is the premise of the whole
  project: it is installed by opening a URL, and it has no build step.

The icon is taken from the page's own declared <link rel="...icon">, which is
the icon the site actually shows - jav8.vip/favicon.ico is a different, older
multi-size .ico whose frames are raw DIB rather than PNG. Converting those would
mean hand-writing a BMP decoder and an AND-mask decoder to produce a worse
result, so the declared PNG is used instead and the .ico is only a last resort
for the case where it happens to contain a PNG frame.

No third-party dependency: the verification below re-parses the PNG's own
chunks, so a corrupt or truncated result is caught here rather than by a user's
userscript manager at install time.

  python tools/embed_icon.py                # fetch and rewrite @icon
  python tools/embed_icon.py --check        # verify it matches, write nothing
  python tools/embed_icon.py --write x.png  # also save the image to look at
"""
import base64
import re
import struct
import sys
import urllib.request
import zlib
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")

ROOT = Path(__file__).resolve().parent.parent
SCRIPT = ROOT / "jav8-downloader.user.js"
PAGE = "https://jav8.vip/"
FALLBACK_ICO = "https://jav8.vip/favicon.ico"

# A manager's icon slot is small. Anything above this is wasted bytes in a file
# every user downloads; anything much below it looks muddy in the list row.
MAX_EDGE = 128

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)

LINK_ICON_RE = re.compile(
    r"""<link[^>]*rel=["'][^"']*icon[^"']*["'][^>]*>""", re.IGNORECASE
)
HREF_RE = re.compile(r"""href=["']([^"']+)["']""", re.IGNORECASE)
ICON_LINE_RE = re.compile(r"^// @icon\s+.*$", re.MULTILINE)


def get(url, referer=None):
    headers = {"User-Agent": UA}
    if referer:
        headers["Referer"] = referer
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=30) as r:
        return r.read()


def declared_icon_url():
    """The icon the site actually shows, from its own link tag."""
    html = get(PAGE).decode("utf-8", "replace")
    for tag in LINK_ICON_RE.findall(html):
        href = HREF_RE.search(tag)
        if not href:
            continue
        url = href.group(1)
        if url.startswith("//"):
            url = "https:" + url
        elif url.startswith("/"):
            url = PAGE.rstrip("/") + url
        if url.startswith("http"):
            return url
    return None


def png_from_ico(data):
    """First PNG frame inside an .ico, or None if every frame is raw DIB."""
    reserved, kind, count = struct.unpack("<HHH", data[:6])
    if reserved != 0 or kind != 1:
        return None
    for i in range(count):
        entry = data[6 + 16 * i : 6 + 16 * (i + 1)]
        size, offset = struct.unpack("<II", entry[8:16])
        frame = data[offset : offset + size]
        if frame[:4] == b"\x89PNG":
            return frame
    return None


def verify(png):
    """Walk the chunks and check CRCs and the decompressed length.

    Deliberately paranoid: the only consumer of these bytes is a manager's
    icon renderer, and it will not tell the user which line went wrong.
    """
    if png[:8] != b"\x89PNG\r\n\x1a\n":
        raise ValueError("not a PNG")
    width, height, depth, colour = struct.unpack(">IIBB", png[16:26])
    if width != height:
        raise ValueError("icon is %dx%d, not square" % (width, height))
    if width > MAX_EDGE:
        raise ValueError("icon is %dpx, above the %dpx ceiling" % (width, MAX_EDGE))
    if depth != 8 or colour not in (2, 6):
        raise ValueError("unsupported PNG depth/colour %d/%d" % (depth, colour))
    idat = b""
    i = 8
    while i < len(png):
        length = struct.unpack(">I", png[i : i + 4])[0]
        tag = png[i + 4 : i + 8]
        body = png[i + 8 : i + 8 + length]
        crc = struct.unpack(">I", png[i + 8 + length : i + 12 + length])[0]
        if (zlib.crc32(tag + body) & 0xFFFFFFFF) != crc:
            raise ValueError("bad CRC in %s" % tag.decode())
        if tag == b"IDAT":
            idat += body
        i += 12 + length
    raw = zlib.decompress(idat)
    channels = 4 if colour == 6 else 3
    if len(raw) != height * (1 + width * channels):
        raise ValueError("pixel data is %d bytes, expected %d" % (len(raw), height * (1 + width * channels)))
    return width, height


def embedded_png(text):
    """The PNG currently in the @icon line, or None if it is not a data URI."""
    match = ICON_LINE_RE.search(text)
    if not match:
        return None
    value = match.group(0).split(None, 2)[-1]
    if not value.startswith("data:image/png;base64,"):
        return None
    try:
        return base64.b64decode(value.split(",", 1)[1], validate=True)
    except Exception:  # noqa: BLE001 - malformed base64 is a real finding, reported below
        return False  # distinguishable from "absent"


def check_offline(text):
    """Validate what is embedded, without touching the network.

    Deliberately does not require the network: this runs as part of
    `npm run verify`, and a check that fails because a CDN was slow would train
    people to ignore it. Structural validity is the part that can be trusted
    offline; staleness is reported separately and never fails the build.
    """
    png = embedded_png(text)
    if png is None:
        print("no embedded PNG in @icon - run `python tools/embed_icon.py`")
        return False
    if png is False:
        print("@icon is not decodable base64")
        return False
    width, height = verify(png)
    print("@icon is a valid %dx%d PNG (%d bytes)" % (width, height, len(png)))
    return True


def main():
    args = sys.argv[1:]
    check_only = "--check" in args
    save = args[args.index("--write") + 1] if "--write" in args else None

    text = SCRIPT.read_text(encoding="utf-8")
    if not ICON_LINE_RE.search(text):
        raise SystemExit("no @icon line found - add one to the metadata block first")

    if check_only:
        if not check_offline(text):
            raise SystemExit(1)
        # Opportunistic: if the site answers, say whether it still matches.
        try:
            fresh, _ = fetch_source()
            current = embedded_png(text)
            if fresh != current:
                print("note: the site's icon has changed - run "
                      "`python tools/embed_icon.py` to refresh it")
        except Exception as err:  # noqa: BLE001
            print("note: could not reach the site to compare (%s)" % err)
        return

    png, source = fetch_source()
    width, height = verify(png)
    if save:
        Path(save).write_bytes(png)
        print("wrote %s (%dx%d)" % (save, width, height))

    b64 = base64.b64encode(png).decode("ascii")
    line = "// @icon          data:image/png;base64," + b64
    new_text = ICON_LINE_RE.sub(lambda _: line, text, count=1)

    if new_text == text:
        print("icon already current (%s, %dx%d, %d bytes png)" % (source, width, height, len(png)))
        return
    SCRIPT.write_text(new_text, encoding="utf-8", newline="\n")
    print(
        "embedded %s at %dx%d (%d bytes png, %d bytes uri)"
        % (source, width, height, len(png), len(line))
    )


def fetch_source():
    """The site's own icon, preferring the PNG it declares in its markup."""
    url = declared_icon_url()
    if url:
        # The CDN refuses requests without a Referer, which a plain download of
        # the icon will not send.
        try:
            candidate = get(url, referer=PAGE)
            if candidate[:4] == b"\x89PNG":
                return candidate, url
        except Exception as err:  # noqa: BLE001 - any failure just means "try the next source"
            print("declared icon %s unusable (%s)" % (url, err), file=sys.stderr)
    frame = png_from_ico(get(FALLBACK_ICO))
    if frame is None:
        raise SystemExit(
            "no usable PNG: the declared icon was unreachable and %s has no PNG "
            "frame (its frames are raw DIB). Save an icon by hand and pass it in."
            % FALLBACK_ICO
        )
    return frame, FALLBACK_ICO


if __name__ == "__main__":
    main()
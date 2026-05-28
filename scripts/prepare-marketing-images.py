"""Priprava marketing slik: anonimizacija portala + tematske fotografije (Unsplash)."""

from __future__ import annotations

import time
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "marketing"
PORTAL_SRC = ROOT / "scripts" / "portal-screenshot-source.png"
FONT_PATH = Path(r"C:\Windows\Fonts\segoeui.ttf")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"

STOCK: list[tuple[str, str]] = [
    ("hero.jpg", "photo-1486406146926-c627a92ad1ab"),
    ("cctv.jpg", "photo-1549109926-58f039549485"),
    ("alarm.jpg", "photo-1767741683084-08ac01518c8c"),
    ("pozar.jpg", "photo-1585367437379-e0b71bb18156"),
    ("domofon.jpg", "photo-1600585154340-be6161a56a0c"),
    ("mreza.jpg", "photo-159304/network-cable-ethernet-computer-159304"),
    ("wifi.jpg", "photo-1519389950473-47ba0277781c"),
    ("ostalo.jpg", "photo-1558494949-ef010cbdcc31"),
    ("domov-kaj-nudimo.jpg", "photo-1496368077930-c1e31b4e5b44"),
    ("kontakt.jpg", "photo-1516321318423-f06f85e504b3"),
]

PORTAL_OUTPUTS = (
    "portal.jpg",
    "produkti.jpg",
    "domov-zakaj.jpg",
    "domov-podpora.jpg",
    "servis.jpg",
)


def download_unsplash(filename: str, photo_id: str, width: int = 1400) -> None:
    url = f"https://images.unsplash.com/{photo_id}?ixlib=rb-4.0.3&auto=format&fit=crop&w={width}&q=82"
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as resp:
        data = resp.read()
    if len(data) < 5000 or data[:15].startswith(b"<"):
        raise RuntimeError(f"Neveljaven prenos: {filename} ({len(data)} B)")
    (OUT / filename).write_bytes(data)


def anonymize_portal(src: Path) -> Image.Image:
    im = Image.open(src).convert("RGB")
    w, _ = im.size
    draw = ImageDraw.Draw(im)
    try:
        font = ImageFont.truetype(str(FONT_PATH), 12)
    except OSError:
        font = ImageFont.load_default()

    def blur_box(box: tuple[int, int, int, int], radius: int = 10) -> None:
        im.paste(im.crop(box).filter(ImageFilter.GaussianBlur(radius=radius)), box)

    for i in range(8):
        x0 = 232 + i * 118
        if x0 + 110 > w:
            break
        box = (x0, 118, x0 + 110, 138)
        blur_box(box)
        draw.rectangle(box, fill=(248, 250, 252))
        draw.text((x0 + 5, 121), f"Objekt {i + 1}", fill=(30, 41, 59), font=font)

    for i in range(2):
        x0 = 232 + i * 118
        box = (x0, 168, x0 + 110, 228)
        blur_box(box, 12)
        draw.rectangle(box, fill=(254, 242, 242))
        draw.text((x0 + 5, 185), "Kamera offline", fill=(153, 27, 27), font=font)

    box = (248, 278, 390, 298)
    blur_box(box)
    draw.rectangle(box, fill=(248, 250, 252))
    draw.text((252, 281), "Objekt 1", fill=(30, 41, 59), font=font)

    pw, ph = im.size
    return im.resize((pw * 2, ph * 2), Image.Resampling.LANCZOS)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    if not PORTAL_SRC.exists():
        raise SystemExit(f"Manjka vir portala: {PORTAL_SRC}")

    portal = anonymize_portal(PORTAL_SRC)
    for name in PORTAL_OUTPUTS:
        portal.save(OUT / name, "JPEG", quality=88, optimize=True)
        print(f"portal -> {name}")

    for filename, photo_id in STOCK:
        width = 2400 if filename == "hero.jpg" else 1400
        time.sleep(2)
        download_unsplash(filename, photo_id, width)
        print(f"stock -> {filename}")

    print("Končano.")


if __name__ == "__main__":
    main()

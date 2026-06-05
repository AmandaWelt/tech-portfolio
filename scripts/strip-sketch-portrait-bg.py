"""Knock out near-white/tan paper from sketch-portrait.png for multiply blend on parchment.

Re-run after replacing public/sketch-portrait.png:
  python scripts/strip-sketch-portrait-bg.py
"""
from __future__ import annotations

import math
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
TARGET = ROOT / "public" / "sketch-portrait.png"
TIGHT = 28
SOFT = 50


def dist(rgb: tuple[int, int, int], bg: tuple[int, int, int]) -> float:
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(rgb, bg)))


def strip_background(path: Path) -> None:
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    sample_pts = [
        (12, 12),
        (w - 13, 12),
        (12, h - 13),
        (w - 13, h - 13),
        (w // 2, 12),
        (w // 2, h - 13),
    ]
    samples = [im.getpixel(xy)[:3] for xy in sample_pts]
    bg = tuple(sum(c[i] for c in samples) // len(samples) for i in range(3))
    print(f"Background reference RGB: {bg}")

    out: list[tuple[int, int, int, int]] = []
    for p in im.getdata():
        r, g, b, a = p
        rgb = (r, g, b)

        # Export corners are often pure white
        if r > 245 and g > 245 and b > 245:
            out.append((r, g, b, 0))
            continue

        d = dist(rgb, bg)
        if d < TIGHT:
            out.append((r, g, b, 0))
        elif d < SOFT:
            alpha = int(255 * (d - TIGHT) / (SOFT - TIGHT))
            out.append((r, g, b, alpha))
        else:
            out.append((r, g, b, a))

    # Erase resize artifact: white strip on the right edge of the canvas
    edge = max(18, int(w * 0.025))
    for y in range(h):
        for x in range(w - edge, w):
            i = y * w + x
            out[i] = (out[i][0], out[i][1], out[i][2], 0)

    result = Image.new("RGBA", im.size)
    result.putdata(out)
    result.save(path, optimize=True)
    transparent = sum(1 for p in out if p[3] < 20)
    print(f"Saved {path.name} — {100 * transparent / len(out):.1f}% transparent pixels")


if __name__ == "__main__":
    if not TARGET.exists():
        raise SystemExit(f"Missing {TARGET}")
    strip_background(TARGET)

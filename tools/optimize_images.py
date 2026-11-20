"""Image set masters (*.png) -> web copies in public/images/colophon/*.webp (cropped to the slot's aspect, max 2x slot size).

Usage: python tools/optimize_images.py [set_dir]   (default: art/colophon)
"""
import os, sys
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from images import IMAGES

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SET = os.path.abspath(sys.argv[1]) if len(sys.argv) > 1 else f'{ROOT}/art/colophon'
for it in IMAGES:
    master = f"{SET}/{it['out']}"
    if not os.path.exists(master):
        continue
    w, h = Image.open(f"{ROOT}/public/images/{it['src']}").size
    img = Image.open(master)
    img = img.convert('RGBA' if img.mode in ('RGBA', 'LA', 'P') else 'RGB')
    s = max(w / img.width, h / img.height)
    cw, ch = round(w / s), round(h / s)
    x, y = (img.width - cw) // 2, (img.height - ch) // 2
    img = img.crop((x, y, x + cw, y + ch))
    tw = min(img.width, round(w * 1.5))
    img = img.resize((tw, round(tw * h / w)), Image.LANCZOS)
    out = f"{ROOT}/public/images/colophon/{os.path.splitext(it['out'])[0]}.webp"
    img.save(out, 'WEBP', quality=75, method=6)
    print(f"{it['out']}: {img.size} {os.path.getsize(out) // 1024} KB")

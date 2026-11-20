"""Side-by-side section comparison: python sbs.py ref.png clone.png out_dir 'y,h;y,h;...' 'y,h;...'"""
import sys, os
from PIL import Image, ImageChops
ref, clone, out = Image.open(sys.argv[1]).convert('RGB'), Image.open(sys.argv[2]).convert('RGB'), sys.argv[3]
R = [tuple(map(int, x.split(','))) for x in sys.argv[4].split(';')]
C = [tuple(map(int, x.split(','))) for x in sys.argv[5].split(';')]
os.makedirs(out, exist_ok=True)
W = ref.width
for i, ((ry, rh), (cy, ch)) in enumerate(zip(R, C)):
    h = max(rh, ch)
    a = ref.crop((0, ry, W, ry + h)); b = clone.crop((0, cy, W, cy + h))
    d = ImageChops.difference(a, b).convert('L').point(lambda v: 255 if v > 40 else 0)
    mism = sum(d.histogram()[255:]) / (W * h) * 100
    canvas = Image.new('RGB', (W * 3 + 40, h), (255, 0, 255))
    canvas.paste(a, (0, 0)); canvas.paste(b, (W + 20, 0)); canvas.paste(Image.merge('RGB', (d, d, d)), (2 * W + 40, 0))
    canvas.save(f'{out}/sec-{i:02d}.png')
    print(i, f'{mism:.2f}%', rh, ch)

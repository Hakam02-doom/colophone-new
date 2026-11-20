import sys, os, glob
from PIL import Image, ImageChops
ref, clone, out = sys.argv[1:4]
os.makedirs(out, exist_ok=True)
rows = []
for f in sorted(glob.glob(f'{ref}/*.png')):
    n = os.path.basename(f)
    if not os.path.exists(f'{clone}/{n}'): continue
    a, b = Image.open(f).convert('RGB'), Image.open(f'{clone}/{n}').convert('RGB')
    d = ImageChops.difference(a, b).convert('L').point(lambda v: 255 if v > 40 else 0)
    m = sum(d.histogram()[255:]) / (a.width * a.height) * 100
    rows.append((n, m))
    if m > 1.0:
        c = Image.new('RGB', (a.width * 2 + 10, a.height), (255, 0, 255)); c.paste(a, (0, 0)); c.paste(b, (a.width + 10, 0))
        c.resize((c.width // 2, c.height // 2)).save(f'{out}/{n}')
print(' '.join(f'{n[:-4]}:{m:.1f}' for n, m in rows))

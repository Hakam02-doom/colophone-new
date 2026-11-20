"""Write prompt-book/README.md, prompt-book/prompts.html (for the PDF) and numbered look-and-feel references."""
import base64, html, io, os, shutil, sys
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from images import IMAGES, STYLE

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
BOOK = f'{ROOT}/prompt-book'
USED = {
    'works-': 'Work gallery (scrolling photo rows)', 'blog-': 'Blog section, featured post photo',
    'safety-team': 'Safety section photo', 'step-': 'How it works, step icon',
    'safety-card': 'Guarantees card illustration', 'cta-': 'Closing section, product screenshot',
    'receipts-': 'Features card 01 (Receipts) diagram', 'releases-': 'Features card 02 (Releases) diagram',
}
CONTEXT = "Context: this is for Colophon, an open-source CMS that records what went live, when and where readers saw it."
HOW = ("For each image: attach the look-and-feel reference, paste the prompt, generate, and save the result to "
       "public/images/colophon/ under the 'Save as' name. Any resolution works at the same aspect ratio (larger is better). "
       "Then run: python3 tools/gen.py && npm run build. Each image is cropped to its slot and swapped in; "
       "images not made yet keep the current picture.")

shutil.rmtree(f'{BOOK}/refs', ignore_errors=True)
os.makedirs(f'{BOOK}/refs', exist_ok=True)
rows, md, cards = [], [], []
for n, it in enumerate(IMAGES, 1):
    src = f"{ROOT}/public/images/{it['src']}"
    im = Image.open(src); w, h = im.size
    ref = f"{n:02d}-{it['out']}"
    shutil.copy(src, f'{BOOK}/refs/{ref}')
    used = next(v for k, v in USED.items() if it['out'].startswith(k))
    prompt = (f"Aspect ratio {w / h:.2f}:1 ({w}x{h}px or larger). {STYLE}\n\nBrief: {it['prompt']}\n\n{CONTEXT}")
    rows.append((n, it, w, h, used))
    md += ['', f"## {n}. {it['title']}", '', f"- **Save as:** `public/images/colophon/{it['out']}`",
           f"- **Look-and-feel reference:** `prompt-book/refs/{ref}`", f"- **Size / aspect:** {w}×{h} px, {w / h:.2f}:1",
           f"- **Used in:** {used}", '', '```text', prompt, '```']
    th = im.convert('RGBA'); bg = Image.new('RGBA', th.size, (235, 235, 235, 255)); bg.alpha_composite(th)
    th = bg.convert('RGB'); th.thumbnail((360, 220)); buf = io.BytesIO(); th.save(buf, 'JPEG', quality=82)
    cards.append(f'''<section class="card"><div class="head"><span class="num">{n:02d}</span><h2>{html.escape(it['title'])}</h2></div>
<div class="meta"><img src="data:image/jpeg;base64,{base64.b64encode(buf.getvalue()).decode()}"><dl>
<dt>Save as</dt><dd><code>public/images/colophon/{it['out']}</code></dd>
<dt>Aspect</dt><dd>{w / h:.2f}:1 &nbsp;·&nbsp; {w}×{h} px or larger</dd>
<dt>Used in</dt><dd>{used}</dd>
<dt>Reference</dt><dd><code>prompt-book/refs/{ref}</code> <span class="muted">(look and feel only)</span></dd></dl></div>
<pre>{html.escape(prompt)}</pre></section>''')

table = ['| # | Image | Save as | Aspect | Used in |', '|---|---|---|---|---|'] + [
    f"| {n} | {it['title']} | `{it['out']}` | {w / h:.2f}:1 | {used} |" for n, it, w, h, used in rows]
open(f'{BOOK}/README.md', 'w').write('\n'.join(['# Colophon image prompt book', '', HOW, ''] + table + md) + '\n')

idx = ''.join(f"<tr><td>{n:02d}</td><td>{html.escape(it['title'])}</td><td><code>{it['out']}</code></td><td>{w / h:.2f}:1</td><td>{used}</td></tr>" for n, it, w, h, used in rows)
font = f"{ROOT}/public/fonts/GrgcKwrN6d3Uz8EwcLHZxwEfC4.woff2"
mono = f"{ROOT}/public/fonts/or3nQ6H-1_WfwkMZI_qYFrcdmg.woff2"
mark = 'M87 0H232L292 60L232 120L194 82H130L87 125V185L130 228H194L232 190L292 250L232 310H87L0 223V87Z'
open(f'{BOOK}/prompts.html', 'w').write(f'''<!doctype html><html><head><meta charset="utf-8"><title>Colophon image prompt book</title><style>
@font-face{{font-family:I;src:url("file://{font}")}} @font-face{{font-family:M;src:url("file://{mono}")}}
@page{{size:A4;margin:16mm 14mm}} *{{box-sizing:border-box}} body{{font-family:I,sans-serif;color:#25252d;font-size:10.5pt;margin:0}}
.cover{{page-break-after:always;padding-top:6mm}} .logo{{display:flex;align-items:center;gap:10px;font-weight:600;font-size:20pt;letter-spacing:-.02em}}
h1{{font-size:30pt;letter-spacing:-.03em;margin:12mm 0 4mm;font-weight:500}} .lede{{font-size:12pt;color:#585858;max-width:150mm;line-height:1.5}}
table{{border-collapse:collapse;width:100%;margin-top:10mm;font-size:9pt}} td,th{{text-align:left;border-bottom:1px solid #e3e3e3;padding:5px 6px}} th{{color:#8e8e8e;font-weight:500}}
code{{font-family:M,monospace;font-size:8.5pt}} .card{{page-break-inside:avoid;border:1px solid #d9d9d9;padding:14px 16px;margin:0 0 10mm}}
.head{{display:flex;align-items:baseline;gap:10px}} .num{{font-family:M,monospace;color:#8e8e8e}} h2{{margin:0 0 10px;font-size:15pt;font-weight:500;letter-spacing:-.02em}}
.meta{{display:flex;gap:14px;align-items:flex-start}} .meta img{{width:150px;border:1px solid #e3e3e3}} dl{{margin:0;display:grid;grid-template-columns:70px 1fr;gap:4px 8px;font-size:9pt}}
dt{{color:#8e8e8e}} dd{{margin:0}} .muted{{color:#8e8e8e}} pre{{white-space:pre-wrap;font-family:M,monospace;font-size:8.6pt;line-height:1.5;background:#f6f6f6;padding:10px 12px;margin:12px 0 0}}
</style></head><body><div class="cover"><div class="logo"><svg viewBox="0 0 292 310" width="22" height="23"><path fill="#25252d" d="{mark}"/></svg>Colophon</div>
<h1>Image prompt book</h1><p class="lede">{len(IMAGES)} new images for the Colophon site. Each is an original scene; the current site image is attached only for its look and feel: palette, light, style.</p>
<p class="lede">{html.escape(HOW)}</p><table><tr><th>#</th><th>Image</th><th>Save as</th><th>Aspect</th><th>Used in</th></tr>{idx}</table></div>
{''.join(cards)}</body></html>''')
print(f'{len(IMAGES)} prompts -> {BOOK}')

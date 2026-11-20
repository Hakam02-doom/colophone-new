"""Build Colophon logo SVGs (mark + Inter 600 wordmark as outlines) sized to the slots of the original logos."""
import os
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = os.path.join(os.path.dirname(__file__), '..')
FONT = os.path.join(ROOT, 'public/fonts/yDtI2UI8XcEg1W2je9XPN3Noo.woff2')  # Inter 600, latin
MARK = 'M87 0H232L292 60L232 120L194 82H130L87 125V185L130 228H194L232 190L292 250L232 310H87L0 223V87Z'
MARK_W, MARK_H = 292, 310

import io
tt = TTFont(FONT)
gs = tt.getGlyphSet()
upem = tt['head'].unitsPerEm
raw = io.BytesIO(); tt.flavor = None; tt.save(raw)  # HarfBuzz needs plain sfnt, not WOFF2
hbfont = hb.Font(hb.Face(hb.Blob(raw.getvalue())))

def wordmark(text, size, x0, baseline, tracking_em=-0.02):
    buf = hb.Buffer(); buf.add_str(text); buf.guess_segment_properties()
    hb.shape(hbfont, buf, {'kern': True, 'liga': True})
    s = size / upem
    pen = SVGPathPen(gs)
    x = x0
    order = tt.getGlyphOrder()
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        name = order[info.codepoint]
        gs[name].draw(TransformPen(pen, (s, 0, 0, -s, x + pos.x_offset * s, baseline - pos.y_offset * s)))
        x += pos.x_advance * s + tracking_em * size
    return pen.getCommands(), x - tracking_em * size

def mark_path(x, y, h):
    k = h / MARK_H
    return f'<path transform="translate({x:.3f} {y:.3f}) scale({k:.5f})" d="{MARK}"/>'

def lockup(canvas_w, canvas_h, top, height, fill, extra=''):
    """Colophon's own lockup: mark 20px tall, 8px gap, wordmark 17px Inter 600 (-0.02em), centred on the mark."""
    k = height / 20.0
    size = 17 * k
    mw = MARK_W / MARK_H * height
    cap = 0.727 * size
    baseline = top + height / 2 + cap / 2
    d, end = wordmark('Colophon', size, mw + 8 * k, baseline)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{canvas_w}" height="{canvas_h}" fill="none">'
            f'<g fill="{fill}"{extra}>{mark_path(0, top, height)}<path d="{d}"/></g></svg>'), end

out = os.path.join(ROOT, 'public/images')
# navbar: 119x16 canvas, left aligned, lockup uses the full height
svg, end = lockup(119, 16, 0, 16, '#25252D')
open(f'{out}/colophon-logo-nav.svg', 'w').write(svg); print('nav width', round(end, 1))
# footer: 455x62 canvas, white at 65%, lockup uses the full height
svg, end = lockup(455, 62, 0, 62, '#fff', ' opacity=".65"')
open(f'{out}/colophon-logo-footer.svg', 'w').write(svg); print('footer width', round(end, 1))
# hero card mark: original white "M" fills a 105x94 canvas; centre the mark at full height
h = 94; w = MARK_W / MARK_H * h
open(f'{out}/colophon-mark-white.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" width="105" height="94" fill="none"><g fill="#fff">{mark_path((105 - w) / 2, 0, h)}</g></svg>')

# "Ways to connect" tiles for the logo strip: grey wordmarks on a square canvas (the strip fits them into 68x68)
for slug, label in (('rest', 'REST'), ('graphql', 'GraphQL'), ('typescript-sdk', 'TypeScript SDK'), ('cli', 'CLI'), ('mcp-server', 'MCP server')):
    size = 15
    d, end = wordmark(label, size, 0, 0)
    w = end
    cap = 0.727 * size
    box = max(w, 40) + 8
    x0 = (box - w) / 2
    d, _ = wordmark(label, size, x0, box / 2 + cap / 2)
    open(f'{out}/connect-{slug}.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" width="{box:.1f}" height="{box:.1f}" viewBox="0 0 {box:.1f} {box:.1f}" fill="none"><path fill="#3a3a3a" d="{d}"/></svg>')

"""Generate React sections + CSS from Framer live-DOM dumps at each breakpoint.
Base breakpoint is 1200-1439 (dump at 1300). Others become media-query overrides."""
import json, re, sys, os, collections, html
sys.path.insert(0, os.path.dirname(__file__))
from ann import ANN, TARGETS
import site_copy

DUMP = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', '.reanimate', 'site', 'dumps')
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(__file__), '..', 'src', 'sections')
BPS = [('1300', None), ('1440', '(min-width: 1440px) and (max-width: 1919.98px)'),
       ('1920', '(min-width: 1920px) and (max-width: 2599.98px)'), ('2600', '(min-width: 2600px)'),
       ('1000', '(min-width: 810px) and (max-width: 1199.98px)'), ('390', '(max-width: 809.98px)')]
trees = {w: json.load(open(f'{DUMP}/j-{w}.json')) for w, _ in BPS}
def flatten(n):
    if 'kids' not in n: return n
    out = []
    for c in n['kids']:
        if 'tag' in c and 'ssr-variant' in c.get('cls', '').split():
            for cc in c.get('kids', []): out.append(flatten(cc))
        else: out.append(flatten(c) if 'tag' in c else c)
    n['kids'] = out
    return n
for _w in trees: flatten(trees[_w])

SECTIONS = ['Hero', 'TrustedPartners', 'Statement', 'Stats', 'Works', 'Worldwide', 'Process', 'Security', 'Blogs', 'Cta', 'Footer']
PREFIX = ['hero', 'trusted', 'statement', 'stats', 'works', 'worldwide', 'process', 'security', 'blogs', 'cta', 'footer']

TEXT_TAGS = {'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'br'}
DROP_PROPS = re.compile(r'^(box-sizing|will-change|text-wrap-mode|white-space-collapse|-webkit-text-stroke|border-image|text-decoration-skip-ink|text-decoration-style|backface-visibility|--font-selector|outline|text-wrap-style|transition-behavior|--extracted|--framer|-webkit-backface|user-select$|-webkit-user-drag|touch-action$)')
FONT_KEYS = ['font-family', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing', 'color', 'text-transform', 'text-align', 'white-space', 'text-decoration-line', 'text-decoration-color', 'text-underline-offset', 'text-decoration-thickness', 'font-variation-settings', 'font-feature-settings', 'word-break', 'overflow-wrap']
FONT_DEFAULTS = {'font-style': 'normal', 'text-transform': 'none', 'text-align': 'start', 'white-space': 'normal', 'text-decoration-line': 'none', 'font-variation-settings': 'normal', 'font-feature-settings': 'normal', 'word-break': 'normal', 'overflow-wrap': 'normal', 'letter-spacing': 'normal'}

def normalize(n, parent_font=None):
    css = dict(n.get('css', {}))
    is_text = n['tag'] in TEXT_TAGS or n['tag'] == 'a'
    out = {}
    for k, v in css.items():
        if DROP_PROPS.match(k): continue
        if 'var(' in v and k not in ('text-shadow',): continue
        if v == '': continue
        out[k] = v
    def comp4(prefix, suffix='', name=None):
        ks = [f'{prefix}-top{suffix}', f'{prefix}-right{suffix}', f'{prefix}-bottom{suffix}', f'{prefix}-left{suffix}']
        if all(k in out for k in ks):
            vals = [out.pop(k) for k in ks]
            if all(x in ('0px', '0') for x in vals): return
            out[name or prefix] = vals[0] if len(set(vals)) == 1 else ' '.join(vals)
    comp4('padding'); comp4('margin')
    rk = ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius']
    if all(k in out for k in rk):
        vals = [out.pop(k) for k in rk]
        if not all(x in ('0px', '0') for x in vals): out['border-radius'] = vals[0] if len(set(vals)) == 1 else ' '.join(vals)
    bw = [f'border-{s}-width' for s in ('top', 'right', 'bottom', 'left')]
    if all(k in out for k in bw):
        ws = [out.pop(k) for k in bw]
        sts = [out.pop(f'border-{s}-style', 'none') for s in ('top', 'right', 'bottom', 'left')]
        cs = [out.pop(f'border-{s}-color', 'currentcolor') for s in ('top', 'right', 'bottom', 'left')]
        if not all(s == 'none' for s in sts):
            if len(set(ws)) == 1 and len(set(sts)) == 1 and len(set(cs)) == 1: out['border'] = f'{ws[0]} {sts[0]} {cs[0]}'
            else:
                for i, s in enumerate(('top', 'right', 'bottom', 'left')):
                    if sts[i] != 'none': out[f'border-{s}'] = f'{ws[i]} {sts[i]} {cs[i]}'
    for s in ('top', 'right', 'bottom', 'left'):
        for p in ('style', 'color'): out.pop(f'border-{s}-{p}', None)
    if 'row-gap' in out and 'column-gap' in out:
        r, c = out.pop('row-gap'), out.pop('column-gap')
        if not (r in ('0px', 'normal') and c in ('0px', 'normal')): out['gap'] = r if r == c else f'{r} {c}'
    if 'overflow-x' in out and 'overflow-y' in out:
        x, y = out.pop('overflow-x'), out.pop('overflow-y')
        if not (x == 'visible' and y == 'visible'): out['overflow'] = x if x == y else f'{x} {y}'
    if all(k in out for k in ('flex-grow', 'flex-shrink', 'flex-basis')):
        g, s, b = out.pop('flex-grow'), out.pop('flex-shrink'), out.pop('flex-basis')
        out['flex'] = 'none' if (g, s, b) == ('0', '0', 'auto') else f'{g} {s} {b}'
    bgk = ['background-image', 'background-position-x', 'background-position-y', 'background-size', 'background-repeat', 'background-attachment', 'background-origin', 'background-clip']
    if 'background-image' in out:
        img = out.pop('background-image')
        px, py = out.pop('background-position-x', '0%'), out.pop('background-position-y', '0%')
        size, rep = out.pop('background-size', 'auto'), out.pop('background-repeat', 'repeat')
        for k in bgk: out.pop(k, None)
        if img != 'none':
            out['background-image'] = img
            if (px, py) != ('0%', '0%'): out['background-position'] = f'{px} {py}'
            if size != 'auto': out['background-size'] = size
            if rep != 'repeat': out['background-repeat'] = rep
    else:
        for k in bgk: out.pop(k, None)
    if out.get('align-content') in ('normal',): out.pop('align-content')
    for k, dflt in (('transform', 'none'), ('opacity', '1'), ('filter', 'none'), ('z-index', 'auto'), ('flex-wrap', 'nowrap'), ('transform-origin', '50% 50% 0px'), ('object-position', 'center center'), ('object-position', '50% 50%')):
        if out.get(k) == dflt: out.pop(k)
    if out.get('display') == 'flex' and out.get('flex-direction') == 'row': out.pop('flex-direction')
    if n['tag'] in ('li',) and 'transform' in out: out.pop('transform')
    # text: use computed font styles
    if 'font' in n and (is_text or n['tag'] == 'a'):
        f = n['font']
        for k in FONT_KEYS:
            v = f.get(k)
            if v is None or v == '': continue
            if parent_font is not None and parent_font.get(k) == v and k not in ('font-family',): continue
            if parent_font is None and FONT_DEFAULTS.get(k) == v: continue
            if k == 'text-decoration-color' and f.get('text-decoration-line') == 'none': continue
            if k in ('text-underline-offset', 'text-decoration-thickness') and f.get('text-decoration-line') == 'none': continue
            out[k] = v
        for k in list(out):
            if k == 'display' and out[k] == 'revert': out.pop(k)
    return out

# ---------- union tree ----------
def index(tree):
    idx = {}
    def walk(n, parent):
        if 'tag' not in n: return
        idx[n['key']] = (n, parent)
        for c in n.get('kids', []): walk(c, n['key'])
    walk(tree, None)
    return idx
idxs = {w: index(t) for w, t in trees.items()}

import copy
union = copy.deepcopy(trees['1300'])
uidx = index(union)
for w, _ in BPS[1:]:
    def merge(n, un):
        ukids = un.setdefault('kids', [])
        ukeys = [c.get('key') for c in ukids]
        last_pos = -1
        for c in n.get('kids', []):
            if 'tag' not in c: continue
            if c['key'] in ukeys:
                last_pos = ukeys.index(c['key'])
                merge(c, ukids[last_pos])
            else:
                cc = copy.deepcopy(c)
                ukids.insert(last_pos + 1, cc); ukeys.insert(last_pos + 1, c['key']); last_pos += 1
    merge(trees[w], union)
uidx = index(union)

# ---------- naming ----------
GENERIC = re.compile(r'^(frame|group|rectangle|vector|container|ellipse|image|null|variant|default|desktop|label|line|list)\b', re.I)
SLUG_RENAMES = {'mtracker': 'receipts', 'msubs': 'releases', 'mediatech': 'colophon'}
def slug(s):
    s = re.sub(r'[^a-zA-Z0-9]+', '-', s).strip('-').lower()
    for a, b in SLUG_RENAMES.items(): s = s.replace(a, b)
    return s[:28].strip('-')
def kind(n):
    t = n['tag']
    if t == 'img': return 'img'
    if t == 'svg': return 'svg'
    if t in TEXT_TAGS: return t
    if t == 'a': return 'link'
    if t in ('ul', 'li', 'iframe', 'input', 'button', 'form'): return t
    if 'container' in n.get('cls', ''): return 'slot'
    return 'box'

svgs = {}
def svg_id(markup):
    pass
    if markup not in svgs: svgs[markup] = f'svg{len(svgs)+1}'
    return svgs[markup]

def jsx_text(t):
    t = t.replace('\u00a0', '\u00a0')
    return '{' + json.dumps(t, ensure_ascii=False) + '}'

def char_split(n):
    """Return the joined text if node subtree is a per-char split (or line tokenized) text."""
    leaves = []; ok = True
    def walk(x):
        nonlocal ok
        if 'text' in x: leaves.append(x['text']); return
        if x['tag'] not in TEXT_TAGS and x['tag'] != 'div': ok = False; return
        for c in x.get('kids', []): walk(c)
    for c in n.get('kids', []): walk(c)
    spans = sum(1 for _ in re.finditer(r'"tag": "span"', json.dumps(n)))
    if ok and spans >= 4 and len(leaves) >= 4 and sum(len(l) <= 2 for l in leaves) >= 0.6 * len(leaves):
        return ''.join(leaves)
    return None

def emit_section(si, sec):
    pre = PREFIX[si]
    names = collections.Counter(); cls_of_fr = {}
    rules = []  # (cls, {bp: props})
    def node_css(key):
        res = {}
        for w, _ in BPS:
            hit = idxs[w].get(key)
            if hit is None: res[w] = None; continue
            n, pk = hit
            pf = None
            if pk and idxs[w][pk][0].get('font'):
                pf = idxs[w][pk][0]['font']
            res[w] = normalize(n, pf)
        return res
    def new_class(n):
        nm = n.get('name') or ''
        base = slug(nm) if nm and not GENERIC.match(nm) and len(nm) < 40 else kind(n)
        if not base: base = kind(n)
        names[base] += 1
        c = f'{pre}-{base}' + (f'-{names[base]}' if names[base] > 1 else '')
        return c
    lines = []
    used = set(); bp_only = set(); tag_label_next = [None]; parent_is_tag = [False]
    run_cls = {}
    css_stack = []; parent_css = [None]
    def rec(n, depth, in_text=False):
        ind = '  ' * depth
        if 'text' in n:
            lines.append(ind + jsx_text(n['text'])); return
        key = n['key']; tag = n['tag']
        fr = next((x for x in n.get('cls', '').split() if x.startswith('framer-') and x not in ('framer-text',) and not x.startswith('framer-v-')), None)
        css = node_css(key)
        parent_css[0] = css_stack[-1] if css_stack else None
        if fr and fr in cls_of_fr and cls_of_fr[fr][1] == css: c = cls_of_fr[fr][0]
        else:
            c = new_class(n); rules.append((c, css, parent_css[0]))
            if fr: cls_of_fr[fr] = (c, css)
        attrs = [f'className="{c}"']
        if n.get('name'): attrs.append(f'data-name={json.dumps(n["name"])}')
        frs = []
        for w, _ in BPS:
            hit = idxs[w].get(key)
            for x in ((hit[0].get('cls', '') if hit else '') + ' ' + n.get('cls', '')).split():
                if x.startswith('framer-') and x not in frs: frs.append(x)
        for x in frs:
            if x in TARGETS: attrs.append(f'data-fx="{TARGETS[x]}"')
        ann = next((ANN[x] for x in frs if x in ANN), None)
        if ann and ann['kind'] == 'addclass':
            attrs[0] = attrs[0][:-1] + ' ' + ann['name'] + '"'; ann = None
        if ann and ann['kind'] == 'addattr':
            attrs.append(ann['attr']); ann = None
        if ann: used.add(ann['kind'])
        if ann and ann['kind'] == 'ticker':
            ul = next((k for k in n.get('kids', []) if k.get('tag') == 'ul'), None)
            items = [li for li in (ul or {}).get('kids', []) if 'ticker-item' in li.get('cls', '')]
            rev = ' reverse' if ann.get('reverse') else ''
            lines.append(f'{ind}<Ticker {attrs[0]}{rev}>')
            lines.append(f'{ind}  {{[')
            css_stack.append(css)
            for li in items:
                for k in li.get('kids', []):
                    if 'tag' in k:
                        rec(k, depth + 2); lines[-1] += ','
            css_stack.pop()
            lines.append(f'{ind}  ]}}')
            lines.append(f'{ind}</Ticker>'); return
        if ann and ann['kind'] == 'logos':
            srcs = []
            def wsrc(x):
                if x.get('tag') == 'img':
                    m = re.search(r'/images/([^?]+)', x.get('srcAttr') or x.get('src') or '')
                    if m and f'/images/{m.group(1)}' not in srcs: srcs.append(f'/images/{m.group(1)}')
                for c in x.get('kids', []):
                    if 'tag' in c: wsrc(c)
            wsrc(n)
            lines.append(f'{ind}<div {" ".join(attrs)}>')
            lines.append(f'{ind}  <LogoMarquee logos={{{json.dumps(srcs)}}} />')
            lines.append(f'{ind}</div>'); return
        if ann and ann['kind'] == 'statement':
            inner = n.get('kids', [{}])[0]
            icss = node_css(inner['key']); ic = new_class(inner); rules.append((ic, icss, css))
            txt = ''.join(x['text'] for x in json_leaves(inner)).replace('\u00a0', ' ')
            txt = re.sub(r'\s+', ' ', txt).strip()
            lines.append(f'{ind}<div {" ".join(attrs)}>')
            lines.append(f'{ind}  <ScrollRevealText className="{ic}" text={json.dumps(txt, ensure_ascii=False)} />')
            lines.append(f'{ind}</div>'); return
        if tag == 'img':
            src = n.get('srcAttr') or n.get('src') or ''
            m = re.search(r'/images/([^?]+)', src)
            attrs.append(f'src="/images/{m.group(1)}"' if m else f'src={json.dumps(src)}')
            attrs.append(f'alt={json.dumps(n.get("alt") or "")}')
            attrs.append('draggable={false}')
            lines.append(f'{ind}<img {" ".join(attrs)} />'); return
        if tag == 'svg':
            sid = svg_id(n['svg'])
            lines.append(f'{ind}<Svg {attrs[0]} id="{sid}" />'); return
        if tag == 'iframe':
            emb = 'signal-band' if si == 0 else 'orbit-globe'
            lines.append(f'{ind}<Embed {attrs[0]} src="/embeds/{emb}.html" />'); return
        if tag == 'a' and n.get('href'): attrs.append(f'href={json.dumps(n["href"])}')
        if tag == 'input' and 'scale(0)' in n.get('css', {}).get('transform', ''):
            return
        if tag == 'input':
            for a in ('placeholder', 'type'):
                if n.get('attrs', {}).get(a): attrs.append(f'{a}={json.dumps(n["attrs"][a])}')
            lines.append(f'{ind}<input {" ".join(attrs)} />'); return
        if n.get('attrs', {}).get('data-border'): attrs.append('data-border="true"')
        kids = [k for k in n.get('kids', [])]
        # rolling text
        rkid = kids[0] if len(kids) == 1 and 'tag' in kids[0] and 'rolling-text-inner' in kids[0].get('cls', '') else None
        if rkid is not None:
            txt = ''.join(x.get('text', '') for x in json_leaves(rkid)).replace('\u00a0', ' ')
            spans = [x for x in rkid.get('kids', []) if 'tag' in x]
            f = (spans[0] if spans else rkid).get('font') or rkid.get('font') or {}
            fam = f.get('font-family', 'Inter')
            size = float(f.get('font-size', '16px').rstrip('px'))
            col = f.get('color', 'rgb(0, 0, 0)')
            wgt = f.get('font-weight', '400')
            extra = ''
            for w, _ in BPS[1:]:
                pass
            for w, _ in BPS:
                hit = idxs[w].get(rkid['key'])
                if hit and css.get(w) is not None:
                    sp2 = [x for x in hit[0].get('kids', []) if 'tag' in x]
                    f2 = (sp2[0] if sp2 else hit[0]).get('font') or {}
                    if f2.get('font-size'):
                        css[w] = dict(css[w]); css[w]['--rt-size'] = f2['font-size']
            lines.append(f'{ind}<RollingText {attrs[0]} text={json.dumps(txt, ensure_ascii=False)} color="{col}" fontFamily={{{json.dumps(fam)}}} fontWeight={{{wgt}}} />'); return
        if tag in TEXT_TAGS - {'span', 'br', 'strong', 'em'} or (tag == 'div' and kids and all(k.get('tag') == 'span' for k in kids if 'tag' in k)):
            src = next((idxs[w][key][0] for w, _ in BPS if key in idxs[w]), n)
            sp = char_split(src)
            if sp is not None:
                n = src; kids = src.get('kids', [])
                def build_parts(nn):
                    runs = []
                    def wl(x, cur):
                        if 'text' in x:
                            if x['text'] == '': return
                            runs.append([x['text'], cur]); return
                        if x['tag'] == 'br': runs.append(['\n', cur]); return
                        nc = x if x.get('font') else cur
                        for c in x.get('kids', []): wl(c, nc)
                    for c in nn.get('kids', []): wl(c, nn if nn.get('font') else None)
                    merged = []
                    for t, fn in runs:
                        fk = json.dumps({k: (fn or {}).get('font', {}).get(k) for k in FONT_KEYS if k not in ('white-space',)}, sort_keys=True)
                        if merged and merged[-1][2] == fk: merged[-1][0] += t
                        else: merged.append([t, fn, fk])
                    cont_fk = json.dumps({k: nn.get('font', {}).get(k) for k in FONT_KEYS if k not in ('white-space',)}, sort_keys=True) if nn.get('font') else None
                    parts = []
                    for t, fn, fk in merged:
                        if fn is None or fk == cont_fk or fn is nn:
                            parts.append(jsx_text(t)); continue
                        rk = ('run', fk)
                        if rk not in run_cls:
                            rc = f'{pre}-run' + (f'-{len(run_cls)+1}' if run_cls else '')
                            rcss = {}
                            for w, _ in BPS:
                                hit = idxs[w].get(fn['key'])
                                if hit is None: rcss[w] = None; continue
                                full = normalize(hit[0], None)
                                rcss[w] = {k: v for k, v in full.items() if k in FONT_KEYS and k != 'white-space'}
                            run_cls[rk] = rc; rules.append((rc, rcss, 'RUN'))
                        parts.append(f'<span className="{run_cls[rk]}">{jsx_text(t)}</span>')
                    return ''.join(parts)
                variants = []
                for w, _ in BPS:
                    hit = idxs[w].get(key)
                    if not hit: continue
                    txt_w = ''.join(x['text'] for x in json_leaves(hit[0]))
                    for v in variants:
                        if v[0] == txt_w: v[1].append(w); break
                    else: variants.append([txt_w, [w], hit[0]])
                if len(variants) <= 1:
                    inner = build_parts(n)
                else:
                    inner = ''
                    for txt_w, ws, nn in variants:
                        vc = 'bp-only-' + '-'.join(ws)
                        bp_only.add(tuple(ws))
                        inner += f'<span className="{vc}">{build_parts(nn)}</span>'
                parts = [inner]
                lines.append(f'{ind}<{tag} {" ".join(attrs)}>{"".join(parts)}</{tag}>'); return
        if tag == 'br': lines.append(f'{ind}<br />'); return
        jt = 'a' if tag == 'a' else tag
        if ann and ann['kind'] == 'comp':
            attrs = attrs[:1] + ([ann['props']] if ann.get('props') else []) + attrs[1:]
            jt = ann['comp']
        elif ann and ann['kind'] in ('reveal', 'text', 'press'):
            k = ann['kind']
            extra = [f'as="{jt}"']
            if k == 'reveal':
                extra += [f'from={{{ann["frm"]}}}', f'to={{{ann["to"]}}}', f'transition={{{ann["transition"]}}}']
                if ann.get('onLoad'): extra.append('playOnMount')
                if ann.get('once') is False: extra.append('once={false}')
                if ann.get('amount') is not None: extra.append(f'amount={{{ann["amount"]}}}')
                if ann.get('offsetTop'): extra.append(f'offsetTop={{{ann["offsetTop"]}}}')
                if ann.get('tt') == 'centerX': extra.append('transformTemplate={centerX}'); used.add('centerX')
                if ann.get('target'): extra.append(f'target="{ann["target"]}"')
                jt = 'Reveal'
            elif k == 'text':
                extra += [f'tokenization="{ann["tok"]}"', f'transition={{{ann["transition"]}}}']
                if ann.get('target'): extra.append(f'target="{ann["target"]}"')
                jt = 'TextFx'
            else:
                jt = 'Press'
            attrs = attrs[:1] + extra + attrs[1:]
            if ann.get('tagLabel'):
                tag_label_next[0] = ann
        elif tag_label_next[0] is not None and tag in ('div',) and not any(x.get('tag') == 'img' for x in kids if 'tag' in x) and parent_is_tag[0]:
            a2 = tag_label_next[0]; tag_label_next[0] = None
            attrs = attrs[:1] + ['as="div"', f'from={{{'{ opacity: 0 }'}}}', f'to={{{'{ opacity: 1 }'}}}', f'transition={{{a2["transition"]}}}', f'target="{a2["target"]}"'] + attrs[1:]
            jt = 'Reveal'; used.add('reveal')
        if not kids:
            lines.append(f'{ind}<{jt} {" ".join(attrs)} />'); return
        if all('text' in k for k in kids):
            if jt[0].isupper():
                lines.append(f'{ind}<{jt} {" ".join(attrs)}>{"".join(jsx_text(k["text"]) for k in kids)}</{jt}>'); return
            lines.append(f'{ind}<{jt} {" ".join(attrs)}>{"".join(jsx_text(k["text"]) for k in kids)}</{jt}>'); return
        lines.append(f'{ind}<{jt} {" ".join(attrs)}>')
        css_stack.append(css)
        prev = parent_is_tag[0]; parent_is_tag[0] = bool(ann and ann.get('tagLabel'))
        for k in kids: rec(k, depth + 1)
        parent_is_tag[0] = prev
        css_stack.pop()
        lines.append(f'{ind}</{jt}>')
    rec(sec, 2)
    # css
    out = []
    def fmt(c, props, imp=False):
        if not props: return None
        body = ''.join(f'  {k}: {v};\n' for k, v in props.items())
        return f'.{c} {{\n{body}}}\n'
    base = []; media = collections.defaultdict(list)
    for c, css, pcss in rules:
        b = css['1300']
        if b is not None:
            r = fmt(c, b)
            if r: base.append(r)
        for w, mq in BPS[1:]:
            v = css[w]
            if pcss == 'RUN':
                if v is None: continue
                if b is None:
                    r = fmt(c, v)
                    if r: media[w].append(r)
                    continue
            parent_absent = pcss not in (None, 'RUN') and pcss[w] is None
            parent_absent_base = pcss not in (None, 'RUN') and pcss['1300'] is None
            if v is None:
                if b is not None and not parent_absent: media[w].append(f'.{c} {{\n  display: none;\n}}\n')
                continue
            if b is None:
                v = dict(v)
                if not parent_absent_base and 'display' not in v: v['display'] = 'revert'
                r = fmt(c, v)
                if r: media[w].append(r)
                continue
            diff = {k: val for k, val in v.items() if b.get(k) != val}
            for k in b:
                if k not in v: diff[k] = 'revert'
            r = fmt(c, diff)
            if r: media[w].append(r)
        if b is None and pcss != 'RUN' and not (pcss is not None and pcss['1300'] is None):
            base.append(f'.{c} {{\n  display: none;\n}}\n')
    css_txt = ''.join(base)
    for w, mq in BPS[1:]:
        if media[w]: css_txt += f'\n@media {mq} {{\n' + ''.join('  ' + l + '\n' for blk in media[w] for l in blk.rstrip().split('\n')) + '}\n'
    for ws in sorted(bp_only):
        c = 'bp-only-' + '-'.join(ws)
        css_txt += f'\n.{c} {{\n  display: {"contents" if "1300" in ws else "none"};\n}}\n'
        for w, mq in BPS[1:]:
            css_txt += f'@media {mq} {{\n  .{c} {{\n    display: {"contents" if w in ws else "none"};\n  }}\n}}\n'
    return lines, css_txt, used

def json_leaves(n):
    res = []
    def w(x):
        if 'text' in x: res.append(x); return
        for c in x.get('kids', []): w(c)
    w(n); return res

os.makedirs(OUT, exist_ok=True)
tops = [k for k in union['kids'] if 'tag' in k]
print('top-level', len(tops), [t.get('name') or t['cls'][:20] for t in tops])
# root css
for si, sec in enumerate(tops[:len(SECTIONS)]):
    lines, css, used = emit_section(si, sec)
    name = SECTIONS[si]
    body = site_copy.apply(name, '\n'.join(lines))
    imps = []
    for comp, mod in (('RollingText', 'RollingText'), ('Svg', 'Svg'), ('Embed', 'Embed'), ('Ticker', 'Ticker'), ('LogoMarquee', 'LogoMarquee'), ('ScrollRevealText', 'ScrollRevealText'), ('TextFx', 'TextFx'), ('Press', 'Press')):
        if f'<{comp} ' in body or f'<{comp}>' in body: imps.append(f'import {{ {comp} }} from "../components/{mod}";')
    pn = [x for x in ('PhoneNavRoot', 'MenuIcon', 'MenuLine') if f'<{x} ' in body]
    if pn: imps.append(f'import {{ {", ".join(pn)} }} from "../components/PhoneNav";')
    rv = [x for x in ('Reveal', 'tween', 'spring', 'centerX') if (f'<{x} ' in body if x == 'Reveal' else f'{x}(' in body or f'{{{x}}}' in body)]
    if rv: imps.append(f'import {{ {", ".join(rv)} }} from "../components/Reveal";')
    tsx = '\n'.join(imps) + f'\nimport "./{name}.css";\n\nexport function {name}() {{\n  return (\n' + body + '\n  );\n}\n'
    open(f'{OUT}/{name}.tsx', 'w').write(tsx)
    open(f'{OUT}/{name}.css', 'w').write(css)
    print(name, len(lines), len(css))
with open(f'{OUT}/../components/svgs.ts', 'w') as f:
    f.write('export const svgs: Record<string, string> = {\n')
    for m, i in svgs.items(): f.write(f'  {i}: {json.dumps(m)},\n')
    f.write('};\n')
# root rule per bp
for w, _ in BPS:
    print(w, normalize(trees[w]))

"""Motion annotations keyed by Framer class names (stable across breakpoints)."""
T = lambda d, delay=0: f'tween({d}{", " + str(delay) if delay else ""})'
S = lambda d, b=0, delay=0: f'spring({d}, {b}{", " + str(delay) if delay else ""})'

TARGETS = {
    'framer-1svfibt': 'trusted', 'framer-d63p6j': 'stats', 'framer-1ays01': 'works', 'framer-zpacfk': 'process',
    'framer-ruslke': 'process-1', 'framer-1oz1l64': 'process-2', 'framer-1cnv0zq': 'process-3', 'framer-pogbse': 'process-4',
    'framer-83d2su': 'security', 'framer-1uc2gbp': 'blogs', 'framer-9uv51o': 'cta', 'framer-2cshwo': 'footer',
    'framer-4unkuj': 'security-card', 'framer-zw1fh9': 'worldwide-stack', 'framer-73fjml': 'worldwide-side',
}

FADE = ('{ opacity: 0 }', '{ opacity: 1 }')
ANN = {}
def reveal(cls, target, transition, frm=FADE[0], to=FADE[1], **kw): ANN[cls] = dict(kind='reveal', target=target, transition=transition, frm=frm, to=to, **kw)
def text(cls, target, tok, transition, start=0): ANN[cls] = dict(kind='text', target=target, tok=tok, transition=transition, start=start)

# hero (on load)
reveal('framer-b3msnl', None, T(0.5), '{ opacity: 0.001 }', '{ opacity: 1 }', onLoad=True)
reveal('framer-1r7ps83', None, T(0.5, 1.5), '{ opacity: 0.001, y: 60 }', '{ opacity: 1, y: 0 }', onLoad=True)
reveal('framer-9quixi', None, T(0.5, 1.5), '{ opacity: 0.001 }', '{ opacity: 1 }', onLoad=True)
reveal('framer-963u50-container', None, T(0.4, 2), '{ opacity: 0.001, y: -70 }', '{ opacity: 1, y: 0 }', onLoad=True, tt='centerX')

# style appear (opacity 0 -> 1)
for c, t, tr in [('framer-hhkc8g', 'trusted', T(0.4)), ('framer-1wgap8b', 'trusted', T(0.4)), ('framer-1akejin', 'works', T(0.4)),
                 ('framer-ai8g0t', 'process', T(0.4)), ('framer-4mxjks', 'process-1', T(1)), ('framer-1mse8wk', 'process-2', T(1)),
                 ('framer-1ax5dxh', 'process-3', T(1)), ('framer-yx3p5u', 'process-4', T(1)), ('framer-19rc08y', 'security', T(0.4)),
                 ('framer-182ah5h', 'blogs', T(0.4)), ('framer-1fies1v', 'blogs', T(0.8))]:
    reveal(c, t, tr)

# tag pills: width 1px -> auto, label fades in
TAGS = {'framer-vPGVC': ('trusted', 'framer-1me00d4'), 'framer-efbA2': ('works', 'framer-s2wruc'), 'framer-523me': ('process', None),
        'framer-gJo3J': ('security', None), 'framer-xn6Em': ('blogs', None)}
for c, (t, lab) in TAGS.items():
    reveal(c, t, S(0.4, 0.2), '{ width: 1 }', '{ width: "auto" }', tagLabel=True)

# stats rows: each component flips to its "Variant 2" on a mount timer (1s / 2s), then runs its own transition
STAT = [('framer-1mfvk3s', 'framer-1jmiwnl', 'framer-14s7n20', T(1, 1), '"0%"', '"100%"'),
        ('framer-3wk4bk', 'framer-194ep0x', 'framer-1ghz6ar', T(0.4, 2), '"5%"', '"70%"'),
        ('framer-gitj7', 'framer-twrjsq', 'framer-145lvog', T(0.4, 1), '"0%"', '"100%"')]
for box, bar, lab, tr, w0, w1 in STAT:
    reveal(box, None, tr, onLoad=True)
    reveal(lab, None, tr, onLoad=True)
    reveal(bar, None, tr, f'{{ width: {w0} }}', f'{{ width: {w1} }}', onLoad=True)

# text effects
Am, Om, Rm, Bm = T(0.4), T(1), T(0.8), T(1)
TXT = {
    'framer-mtsoxf': ('stats', 'line', T(1), 0.075),
    **{c: (None, 'line', T(0.4), 0.05) for c in ('framer-9rk5sw', 'framer-w7p7ow', 'framer-1fj6l3n', 'framer-1izim73')},
    'framer-st11wb': ('works', 'line', T(0.4), 0.075),
    'framer-en8ez6': ('process', 'line', S(0.4, 0), 0.075),
    'framer-1d299a6': ('process-1', 'line', T(1), 0.075), 'framer-1pni4a0': ('process-1', 'line', T(1), 0.075), 'framer-19ywdhe': ('process-1', 'line', T(0.8), 0.075),
    'framer-18tr9l5': ('process-2', 'line', T(1), 0.05), 'framer-kzwplw': ('process-2', 'line', T(1), 0.075), 'framer-z9gjit': ('process-2', 'line', T(0.8), 0.075),
    'framer-aea903': ('process-3', 'character', T(1), 0.05), 'framer-1582q9o': ('process-3', 'line', T(1), 0.075), 'framer-gpfdlj': ('process-3', 'line', T(0.8), 0.075),
    'framer-112pwjr': ('process-4', 'line', T(1), 0.075), 'framer-13vadn9': ('process-4', 'line', T(1), 0.075), 'framer-1gwt58v': ('process-4', 'line', T(0.8), 0.075),
    **{c: ('security-card', 'line', T(0.4), 0.075) for c in ('framer-u11nn6', 'framer-xwv494', 'framer-1n0498i', 'framer-16mqf9m', 'framer-a7px1q')},
    'framer-1j7smuw': (None, 'line', T(0.4), 0.075),
    **{c: ('blogs', 'line', T(0.4), 0.075) for c in ('framer-ng9gnn', 'framer-2j1uny', 'framer-34ya7r', 'framer-1o803uc', 'framer-1o93g92', 'framer-8ga83a', 'framer-1o8wk4y')},
    'framer-1m9lcts': ('cta', 'line', T(0.4), 0.075), 'framer-meg0t7': (None, 'line', T(0.4), 0.075),
    'framer-1hhugxb': ('footer', 'line', T(0.4), 0.075),
    **{c: ('footer', 'line', T(0.4), 0.075) for c in ('framer-ut9otg', 'framer-rgrhiq', 'framer-lt72d4', 'framer-11nhs58', 'framer-2v939q', 'framer-1geimtn', 'framer-1bjhbpk')},
}
for c, (t, tok, tr, stag) in TXT.items():
    base = tr[:-1] + f', 0)' if False else tr
    ANN[c] = dict(kind='text', target=t, tok=tok, transition=f'{{ ...{tr}, delay: {stag} }}', start=0)

ANN['framer-19yhoii'] = dict(kind='ticker', reverse=False)
ANN['framer-17djlks'] = dict(kind='ticker', reverse=True)
ANN['framer-12nxvvc'] = dict(kind='ticker', reverse=False)
ANN['framer-1y8gr1x-container'] = dict(kind='logos')
ANN['framer-13mk1zu-container'] = dict(kind='statement')
for c in ('framer-53yxih-container', 'framer-43szhg-container'):
    ANN[c] = dict(kind='press')

# worldwide sticky text: variant 1 -> 2 while the scroll stack is in view (+250px top margin)
reveal('framer-1pqki9f', 'worldwide-stack', S(0.4, 0.2), '{ opacity: 1 }', '{ opacity: 0 }', once=False, amount=0, offsetTop=250)
reveal('framer-w0o5bk', 'worldwide-stack', S(0.4, 0.2), '{ opacity: 0 }', '{ opacity: 1 }', once=False, amount=0, offsetTop=250)
ANN['framer-6hwxk7'] = dict(kind='text', target='worldwide-side', tok='line', transition=f'{{ ...{T(0.4)}, delay: 0.075 }}', start=0)

# phone navbar
ANN['framer-v-kwsqfn'] = dict(kind='comp', comp='PhoneNavRoot', mod='PhoneNav')
ANN['framer-VrXPJ'] = dict(kind='comp', comp='MenuIcon', mod='PhoneNav')
ANN['framer-gkr0kf'] = dict(kind='comp', comp='MenuLine', mod='PhoneNav', props='closed={0} opened={135}')
ANN['framer-31rs84'] = dict(kind='comp', comp='MenuLine', mod='PhoneNav', props='closed={90} opened={225}')

# stable hooks for hand-written CSS
ANN['framer-12llvep'] = dict(kind='addclass', name='form-field')
ANN['framer-1l9sjon'] = dict(kind='addattr', attr='onSubmit={(e) => e.preventDefault()}')
ANN['framer-fCc4s'] = dict(kind='addattr', attr='type="submit"')
for c in ('framer-108c0gu', 'framer-1d4vxtp', 'framer-19uwnpc', 'framer-1hp51g0'):
    ANN[c] = dict(kind='addclass', name='step-media')

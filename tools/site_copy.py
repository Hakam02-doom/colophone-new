"""Site copy: maps each original (Mediatech) string to Colophon copy, per section, in DOM order.

A value that is a str applies to every occurrence; a list applies item i to occurrence i
(the last item repeats). Source: https://colophon.404human.dev/ (home, /features/, /blog/).
"""
import json, os, re
from images import IMAGES as GENERATED

NAV = {'Solutions': 'Features', 'Insights': 'Docs', 'Resources': 'Blog', 'Blog': 'Build log', 'Let’s Talk': 'Get started'}

COPY = {
    'Hero': {
        'Pack of digital media': 'Open-source CMS',
        'A dedicated partner for every  media signal': 'Know exactly what went live.',
        'One accountable partner for media intelligence, localization and trust & safety AI speed with human sign-off, 24/7 across US, Canada and UK markets.':
            'Colophon is an open-source CMS. Write, review and ship your site’s articles, then see what went live, when, and where readers saw it.',
        'Explore Mtracker': 'Get started',
        **NAV,
    },
    'TrustedPartners': {'Trusted Partners': 'Ways to connect'},
    'Statement': {
        'The specialized media-services market is massively fragmented. We set out to be the partner who does more than get the job done - AI brings speed, humans bring context.':
            'Printed books end with a colophon: a short note on how, when and by whom the book was made. Colophon gives a website that same kind of record.',
    },
    'Stats': {
        'Some stats we can proud': 'Colophon by the numbers',
        '1.2B+': '19', 'Videos moderated every month': 'Field types, checked on save',
        '80+': '5', 'Languages,live and on demand': 'Ways to connect, REST to MCP',
        '15M+': '5', 'Closed-caption in seconds': 'Demo sites in the repository',
    },
    'Works': {
        'Works': 'Why Colophon',
        'Intelligence you can trust, outcomes that matter.': 'Every release recorded, every change reviewed.',
        'Live Shows': 'Review', 'Mtracker': 'Publish',
    },
    'Worldwide': {
        'Worldwide': 'Features',
        'One control room for all your ': 'Every publish ends with ',
        'media coverage, signals, and sentiment': 'a receipt of what went live',
        'Mtracker 01': 'Receipts 01', 'MSubs 02': 'Releases 02',
        'Multi-source mointoring cross channel coverage': ['See what went live and what each connection did', 'Every publish is a numbered release of the site'],
        'Qualitative & Quantitative Insights AI + human validation': ['Verified only once a site check sees it', 'A rollback is reviewed like any other publish'],
        'Market & Audience intelligence, Demographics': ['Published, pending or verified, never guessed', 'Read any past release by its number'],
        'Learn More': ['How receipts work', 'How rollback works'],
    },
    'Process': {
        'Worldwide': 'How it works',
        'Built to strengthen ': 'From first draft ', 'your global presence': 'to\u00a0printed receipt',
        'Connect your sources': 'Write a post',
        'Plug in feeds, channels and your knowledge base broadcast, digital, social and internal.': [
            'Draft your site’s articles with 19 field types and references that can’t dangle.',
            'Reviewers approve each change. Scripts and AI agents can draft, never approve.'],
        'Live analysis starts': 'Send it for review',
        'Be smart in the room': ['Publish it', 'Get a receipt'],
        'Use live real data about your media pipeline and take action': [
            'A publish lands once and completely, or not at all.',
            'See what went live, when, and where readers saw it.'],
    },
    'Security': {
        'Security': 'Safety', 'Complaince': 'Guarantees',
        'Security built into ': 'Built so you ', 'every angle': 'lose\u00a0nothing',
        'ISO 27001': 'Crash-safe saves', 'HIPAA Complaint': 'Field-level roles', '99.999% Uptime': 'Append-only audit log',
    },
    'Blogs': {
        'Blogs': 'Blog',
        'Make your content ': 'Notes on publishing ', 'connected': 'you\u00a0can check',
        'June 11, 2025 ': ['17 November 2026 ', '16 November 2026 '],
        'GEO for PR measurement in simple terms': ['Headless CMS glossary: terms in plain words', 'Give AI agents CMS access, not the publish button'],
        'Indian media intelligence is not a data problem. It’s a signal problem.': 'What happens to your draft when the CMS crashes',
        'Learn': 'Read', 'More': 'post',
        'View all blogs': 'More posts',
    },
    'Cta': {
        'Scale\u00a0media\u00a0operations': 'Publishing\u00a0you\u00a0can',
        'without\u00a0growing\u00a0': 'check\u00a0every\u00a0',
        'your\u00a0team.': 'release.',
        'Scale\u00a0media\u00a0operations without\u00a0growing\u00a0': 'Publishing\u00a0you\u00a0can check\u00a0every\u00a0',
        'Connect for our sales team to get better clarity about the outcomes ': 'Colophon is still being built, in public. Follow the build log or read the source. ',
        'Let’s talk': 'Get started', 'Request demo': 'See the source',
    },
    'Footer': {
        'Give\u00a0every\u00a0media\u00a0signal\u00a0a human-in-command\u00a0': 'A record of what went live, when and where ', 'guide.': 'readers saw it.',
        'Links': 'Build', 'Contact us': 'Docs', 'Linked in': 'Blog', 'Terms and Conditions': 'Build log', 'Privacy Policy': 'Source code',
        'India': 'Product', '+91 910000000': 'Features', 'brand-name@gmail.com': ['Quick start', 'Open an issue'],
        '+(+12) 910000000': 'GitHub',
        'Submit': 'Subscribe', 'Follow us on': 'Social media',
        '© 2026 Copyrights reserved at MeidaTech pvt ltd': '© 2026 Colophon · Made with Rust and Svelte',
    },
}

# labels Framer split into per-letter spans: replace the whole paragraph (class names are generator output)
STRUCT = {
    'Works': {'works-p-2': ('works-span-2', 'Write'), 'works-p-5': ('works-span-9', 'Receipt')},
    'Footer': {'footer-p-11': ('footer-span', 'Project')},
}

# "Ways to connect" tiles (built by tools/make_logos.py); listed twice so the strip still fills 2600px screens
LOGOS = [f'/images/connect-{s}.svg' for s in ('rest', 'graphql', 'typescript-sdk', 'cli', 'mcp-server')] * 2


IMAGES = {
    'SZWjeRriUSdgtnCgi2ccfMMFA.svg': ('colophon-logo-nav.svg', 'Colophon'),
    'pac1ufR1O5hxY5wHoznVuLocn9k.svg': ('colophon-logo-footer.svg', 'Colophon'),
    'zpdHMT9DKtwf1E5gxhnqFfZCnvw.svg': ('colophon-mark-white.svg', ''),
}


def lit(s):
    return json.dumps(s, ensure_ascii=False)


def apply(section, body):
    table = COPY.get(section, {})
    if table:
        keys = sorted(table, key=len, reverse=True)
        pat = re.compile(r'(\{|text=)(' + '|'.join(re.escape(lit(k)) for k in keys) + r')(\}?)')
        counts = {}
        def sub(m):
            old = json.loads(m.group(2)); new = table[old]
            news = new if isinstance(new, list) else [new]
            i = counts.get(old, 0); counts[old] = i + 1
            return m.group(1) + lit(news[min(i, len(news) - 1)]) + m.group(3)
        body = pat.sub(sub, body)  # one pass, so a replacement is never re-replaced
    for cls, (span, text) in STRUCT.get(section, {}).items():
        body, n = re.subn(r'(<p className="%s">)[\s\S]*?(</p>)' % re.escape(cls), lambda m: f'{m.group(1)}<span className="{span}">{{{lit(text)}}}</span>{m.group(2)}', body)
        assert n, f'{section}: {cls} not found'
    for g in GENERATED:  # swap in generated Colophon images once their web copy exists
        web = os.path.splitext(g['out'])[0] + '.webp'
        if os.path.exists(os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'colophon', web)):
            body = body.replace(f'src="/images/{g["src"]}"', f'src="/images/colophon/{web}"')
    for old, (new, alt) in IMAGES.items():
        body = body.replace(f'src="/images/{old}" alt=""', f'src="/images/{new}" alt="{alt}"')
    body = re.sub(r'<LogoMarquee logos=\{\[[^\]]*\]\} />', '<LogoMarquee logos={%s} />' % json.dumps(LOGOS), body)
    # data-name is debug metadata copied from Framer layer names; drop the ones that carry old copy
    body = re.sub(r' data-name="(?!Link - |Menu"|Nav Link|Line 0|Label"|Default"|Desktop)[^"]*"', '', body)
    return body

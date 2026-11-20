# Mediatech clone

Pixel-faithful React clone of https://altruistic-structure-710194.framer.app/ (Vite + React 19 + TypeScript + Motion).

## Commands
- `npm run dev` — dev server
- `npm run build` — typecheck (`tsc -b`) + production build
- `npm run preview` — serve the production build
- `npx tsc -p .` — typecheck only

## Structure
- `src/sections/*.tsx|.css` — one component + stylesheet per page section. **Generated** by `tools/gen.py`; edit `tools/ann.py` (motion annotations keyed by Framer class) or the generator, then regenerate, rather than hand-editing.
- `src/components/` — hand-written primitives: `Reveal` (appear/variant effects), `TextFx` (Framer text appear), `RollingText` (hover letter roll), `Ticker`, `LogoMarquee`, `ScrollRevealText` (statement), `PhoneNav` (mobile menu), `Press`, `Embed`, `Svg` (+ generated `svgs.ts`).
- `src/styles/` — fonts, Framer resets, hand-written interaction CSS (footer links, submit, email field).
- `public/embeds/` — the site's own Signal Band and Orbit Globe embeds (self-contained HTML).
- Breakpoints (desktop-first base = 1200–1439): 1440–1919, 1920–2599, ≥2600, 810–1199, <810.

## Regenerating sections
1. Dump the reference DOM at each breakpoint (needs Playwright; run from the reanimate skill's `scripts/` dir):
   `bun dumpjson.ts <url> .reanimate/site/dumps/j-<w>.json <w>` for w in 1300 1440 1920 2600 1000 390.
2. `python tools/gen.py` (needs Python 3; reads `.reanimate/site/dumps`, writes `src/sections`).

## Verification
`tools/verify/*.ts` (full-page section diff, position-locked scroll steps, hover/timeline probes) and `tools/sbs.py` / `tools/stepcmp.py` (need Pillow). Evidence lives in `.reanimate/site/` (gitignored).

## Branding and copy (Colophon)
- Copy: `tools/site_copy.py` maps each original string to Colophon copy (per section, in DOM order), applied by `tools/gen.py`. Keep non-breaking-space tokens ≤ 12 characters: Framer's text effect lets longer tokens break mid-word.
- Logos: `python tools/make_logos.py` builds `public/images/colophon-*.svg` and the `connect-*.svg` tiles (Inter 600 outlines + Colophon mark).
- Images: `tools/images.py` lists each original image, its replacement file and prompt. `python tools/gen_images.py` generates them via the ChatGPT app's Codex CLI (`image_generation`), crops to the original size into `public/images/colophon/`; `gen.py` swaps a src only once its file exists.

## Deploy
- GitHub: https://github.com/Hakam02-doom/colophone-new (private). Vercel project `colophone-new` (https://colophone-new.vercel.app) is connected to it; pushes to `main` deploy to production.
- Vercel blocks deployments whose commit author isn't linked to a Git account, so commits must use an email on the GitHub account (e.g. `211719248+Hakam02-doom@users.noreply.github.com`).

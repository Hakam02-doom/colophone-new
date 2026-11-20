"""Generate the Colophon images with the Codex CLI's image tool, then crop/resize to each original's exact size.

Usage: python tools/gen_images.py [--only out1,out2] [--jobs 4] [--model gpt-5.6-terra]
Skips images that already exist in public/images/colophon/.
"""
import argparse, os, subprocess, sys, concurrent.futures as cf
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from images import IMAGES, STYLE

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC, OUT, WORK = f'{ROOT}/public/images', f'{ROOT}/art/colophon', f'{ROOT}/.reanimate/gen'
CODEX = os.environ.get('CODEX_BIN', '/Applications/ChatGPT.app/Contents/Resources/codex-cli/bin/codex')


def cover(img, w, h):
    s = max(w / img.width, h / img.height)
    img = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
    x, y = (img.width - w) // 2, (img.height - h) // 2
    return img.crop((x, y, x + w, y + h))


def run(item, model):
    dst = f"{OUT}/{item['out']}"
    if os.path.exists(dst):
        return item['out'], 'exists'
    ref = Image.open(f"{SRC}/{item['src']}")
    w, h = ref.size
    raw = f"{WORK}/raw-{item['out']}"
    prompt = (f"Use your image generation tool to create exactly ONE new image and save it as ./raw-{item['out']} "
              f"in the current directory, then reply with just the path.\n\nThe attached image is the reference "
              f"({w}x{h}px, aspect {w / h:.3f}:1). {STYLE}\n\nBrief: {item['prompt']}\n\n"
              "Context: this is for Colophon, an open-source CMS that records what went live, when and where readers saw it.")
    r = subprocess.run([CODEX, 'exec', '-m', model, '--skip-git-repo-check', '--sandbox', 'workspace-write', '-C', WORK,
                        '-i', f"{SRC}/{item['src']}", '-'], input=prompt, text=True, capture_output=True, timeout=900)
    if not os.path.exists(raw):
        return item['out'], 'FAILED: ' + (r.stdout + r.stderr).strip().splitlines()[-1][:200]
    img = Image.open(raw)
    img = cover(img.convert('RGBA' if ref.mode in ('RGBA', 'LA', 'P') else 'RGB'), w, h)
    img.save(dst, optimize=True)
    return item['out'], f'ok {w}x{h}'


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--only'); ap.add_argument('--jobs', type=int, default=4); ap.add_argument('--model', default='gpt-5.6-terra')
    a = ap.parse_args()
    os.makedirs(OUT, exist_ok=True); os.makedirs(WORK, exist_ok=True)
    todo = [i for i in IMAGES if not a.only or i['out'] in a.only.split(',')]
    with cf.ThreadPoolExecutor(a.jobs) as ex:
        for name, status in ex.map(lambda i: run(i, a.model), todo):
            print(f'{name}: {status}', flush=True)
    print('Now run: python tools/optimize_images.py && python tools/gen.py && npm run build')

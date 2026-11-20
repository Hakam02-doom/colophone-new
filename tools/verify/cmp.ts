import { chromium } from "playwright";
import { $ } from "bun";
const [outDir, ...ws] = process.argv.slice(2);
const b = await chromium.launch();
const R = "/Users/hakam/mediatech-clone/.reanimate/site";
for (const w of ws.map(Number)) {
  const rects: any = {};
  for (const [nm, url, sel, file] of [["ref", "https://altruistic-structure-710194.framer.app/", "[data-framer-root] > *", `${R}/ref/full-${w}.png`], ["clone", (process.env.CLONE_URL ?? "http://localhost:5291/"), ".page > *", `${outDir}/full-${w}.png`]] as const) {
    const exists = await Bun.file(`${R}/ref/rects-${w}.json`).exists();
    if (nm === "ref" && exists && await Bun.file(file).exists()) { rects.ref = await Bun.file(`${R}/ref/rects-${w}.json`).json(); continue; }
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto(url, { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 400) { await p.evaluate(y => window.scrollTo(0, y), y); await p.waitForTimeout(250); }
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1500);
    rects[nm] = await p.evaluate((sel) => Array.from(document.querySelectorAll(sel)).map(e => { const r = e.getBoundingClientRect(); return [Math.round(r.top + scrollY), Math.round(r.height)]; }), sel);
    await p.screenshot({ path: file, fullPage: true });
    if (nm === "ref") await Bun.write(`${R}/ref/rects-${w}.json`, JSON.stringify(rects.ref));
    await p.close();
  }
  const f = (a: number[][]) => a.map(x => x.join(",")).join(";");
  console.log(`== ${w}`);
  console.log(await $`/tmp/fr/venv/bin/python /Users/hakam/mediatech-clone/tools/sbs.py ${R}/ref/full-${w}.png ${outDir}/full-${w}.png ${outDir}/sbs-${w} ${f(rects.ref)} ${f(rects.clone)}`.text());
}
await b.close();

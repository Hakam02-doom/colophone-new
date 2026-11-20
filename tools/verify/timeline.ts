import { chromium } from "playwright";
const [url, ...sels] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.addInitScript((sels) => {
  const t0 = performance.now(); (window as any).__tl = [];
  const tick = () => { const row = [Math.round(performance.now() - t0)]; for (const s of sels) { const e = Array.from(document.querySelectorAll(s)).find(x => x.getClientRects().length) as HTMLElement; row.push(e ? +(+getComputedStyle(e).opacity).toFixed(2) * 100 + Math.round(e.getBoundingClientRect().width) / 1000 : -1); } (window as any).__tl.push(row); if (performance.now() - t0 < 7000) setTimeout(tick, 100); };
  tick();
}, sels);
await p.goto(url); await p.waitForTimeout(7500);
const tl = await p.evaluate(() => (window as any).__tl);
console.log(tl.filter((_: any, i: number) => i % 3 === 0).map((r: number[]) => r.join(",")).join("  "));
await b.close();

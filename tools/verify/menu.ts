import { chromium } from "playwright";
const [url, out] = process.argv.slice(2);
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto(url, { waitUntil: "networkidle" }); await p.waitForTimeout(3500);
await p.screenshot({ path: `${out}-closed.png` });
const box = await p.evaluate(() => { const el = Array.from(document.querySelectorAll('[data-framer-name="Menu"], [data-name="Menu"]')).find(e => e.getClientRects().length) as HTMLElement; const r = el.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
await p.mouse.click(box[0], box[1]);
for (const t of [100, 200, 300, 450, 700, 1200]) { await p.waitForTimeout(t === 100 ? 100 : t - [100, 200, 300, 450, 700, 1200][[100, 200, 300, 450, 700, 1200].indexOf(t) - 1]); await p.screenshot({ path: `${out}-open-${t}.png` }); }
const html = await p.evaluate(() => { const n = Array.from(document.querySelectorAll('[data-framer-name="Phone"], [data-framer-name="Phone Open"], [data-framer-name="Phone Closed"]')).filter(e => e.getClientRects().length); return n.map(e => e.outerHTML.length + ' ' + e.getAttribute('data-framer-name')).join('\n'); });
console.log(html);
await b.close();

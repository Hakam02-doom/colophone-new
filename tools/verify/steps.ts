import { chromium } from "playwright";
const [url, out, w = "1440", step = "450"] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: +w < 800 ? 844 : 900 } });
await p.goto(url, { waitUntil: "networkidle" }); await p.waitForTimeout(4000);
const H = await p.evaluate(() => document.documentElement.scrollHeight);
let i = 0;
for (let y = 0; y < H - (+w < 800 ? 844 : 900); y += +step, i++) {
  await p.evaluate(y => window.scrollTo(0, y), y);
  await p.waitForTimeout(150); await p.screenshot({ path: `${out}/a-${String(i).padStart(2, "0")}.png` });
  await p.waitForTimeout(1450); await p.screenshot({ path: `${out}/b-${String(i).padStart(2, "0")}.png` });
}
console.log(i);
await b.close();

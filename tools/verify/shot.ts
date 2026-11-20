import { chromium } from "playwright";
const url = process.argv[2], out = process.argv[3];
const widths = (process.argv[4]||"1440,810,390").split(",").map(Number);
const b = await chromium.launch();
for (const w of widths) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  const H = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += 400) { await p.evaluate(y => window.scrollTo(0, y), y); await p.waitForTimeout(250); }
  await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1500);
  await p.screenshot({ path: `${out}/full-${w}.png`, fullPage: true });
  console.log(w, H);
  await p.close();
}
await b.close();

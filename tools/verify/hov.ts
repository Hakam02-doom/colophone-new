import { chromium } from "playwright";
const [url, sel] = process.argv.slice(2);
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url, { waitUntil: "networkidle" }); await p.waitForTimeout(3500);
const el = (await p.$$(sel)).find(async e => await e.isVisible());
const vis = []; for (const e of await p.$$(sel)) if (await e.isVisible()) vis.push(e);
await vis[0].hover(); 
const T0 = Date.now(); for (let k = 0; k < 20; k++) { await p.waitForTimeout(30); const t = Date.now() - T0; console.log(t, await vis[0].evaluate(e => Array.from(e.querySelectorAll("p span, p > span")).slice(0, 3).map(s => getComputedStyle(s).transform).join(" | "))); }
await b.close();

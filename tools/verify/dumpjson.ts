import { chromium } from "playwright";
const url = process.argv[2], out = process.argv[3], w = +process.argv[4];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: w, height: 900 } });
await p.goto(url, { waitUntil: "networkidle" });
await p.waitForTimeout(1200);
const H = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < H; y += 300) { await p.evaluate(y => window.scrollTo(0, y), y); await p.waitForTimeout(120); }
await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(3000);
const data = await p.evaluate(() => {
  const rules: CSSStyleRule[] = [];
  const walk = (list: CSSRuleList) => { for (const r of Array.from(list)) {
    if (r instanceof CSSStyleRule) rules.push(r);
    else if (r instanceof CSSMediaRule) { if (matchMedia(r.conditionText).matches) walk(r.cssRules); }
    else if ((r as any).cssRules) walk((r as any).cssRules);
  } };
  for (const s of Array.from(document.styleSheets)) { try { walk(s.cssRules); } catch {} }
  const IGN = /^(-webkit-font-smoothing|-moz-|text-rendering|font-feature|font-variation|font-kerning|-webkit-user|corner-|transition-behavior|--framer-will|--framer-font-family-preview|--text-truncation|--framer-text-wrap|unicode|outline-|-webkit-tap|--framer-link|--framer-blockquote|--framer-code|--framer-font|--framer-letter|--framer-line|--framer-paragraph|--framer-text|--framer-list|--framer-table|--framer-input|--framer-image|--framer-heading)/;
  const spec = (sel: string) => {
    const s = sel.replace(/::?[a-z-]+\([^)]*\)/g, m => m.startsWith("::") ? " x" : ".p").replace(/"[^"]*"/g, "");
    const a = (s.match(/#[\w-]+/g) || []).length;
    const b = (s.match(/\.[\w-]+|\[[^\]]+\]|:(?!:)[\w-]+/g) || []).length;
    const c = (s.replace(/\[[^\]]+\]/g, "").match(/(^|[\s>+~(])[a-zA-Z][\w-]*/g) || []).length;
    return a * 1e6 + b * 1e3 + c;
  };
  const splitSel = (t: string) => { const out: string[] = []; let d = 0, cur = ""; for (const ch of t) { if (ch === "(" || ch === "[") d++; if (ch === ")" || ch === "]") d--; if (ch === "," && d === 0) { out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out.map(x => x.trim()); };
  const KEYWORD = ["position","display","flex-direction","flex-wrap","justify-content","align-items","align-self","align-content","z-index","object-fit","overflow-x","overflow-y","box-sizing","visibility","pointer-events","cursor","mix-blend-mode","isolation","order"];
  const authored = (el: Element) => {
    const o: Record<string,string> = {};
    const matched: [number, number, CSSStyleRule][] = [];
    rules.forEach((r, i) => { let best = -1; for (const part of splitSel(r.selectorText)) { try { if (el.matches(part)) best = Math.max(best, spec(part)); } catch {} } if (best >= 0) matched.push([best, i, r]); });
    matched.sort((x, y) => x[0] - y[0] || x[1] - y[1]);
    for (const [, , r] of matched) for (let i = 0; i < r.style.length; i++) { const k = r.style[i]; if (!IGN.test(k)) o[k] = r.style.getPropertyValue(k).trim(); }
    const st = (el as HTMLElement).style; if (st) for (let i = 0; i < st.length; i++) { const k = st[i]; if (!IGN.test(k)) o[k] = st.getPropertyValue(k).trim(); }
    const cs = getComputedStyle(el);
    for (const k of KEYWORD) if (k in o || ["position","display","z-index","overflow-x","overflow-y"].includes(k)) { const v = cs.getPropertyValue(k); if (v) o[k] = v; }
    return o;
  };
  const TXT = ["P","H1","H2","H3","H4","H5","H6","SPAN","STRONG","EM","BR","A"];
  const TPROPS = ["font-family","font-size","font-weight","font-style","line-height","letter-spacing","color","text-transform","text-align","white-space","text-decoration-line","text-decoration-color","text-decoration-thickness","text-underline-offset","font-variation-settings","font-feature-settings","word-break","overflow-wrap","text-wrap"];
  const svgOuter = (svg: Element) => {
    const c = svg.cloneNode(true) as Element;
    c.querySelectorAll("use").forEach(u => { const href = u.getAttribute("href") || u.getAttribute("xlink:href"); if (href && href.startsWith("#")) { const ref = document.getElementById(href.slice(1)); if (ref) { const g = document.createElementNS("http://www.w3.org/2000/svg", "g"); for (const at of Array.from(ref.attributes)) if (!["id","width","height","viewBox","xmlns","style","class"].includes(at.name)) g.setAttribute(at.name, at.value); for (const ch of Array.from(ref.childNodes)) g.appendChild(ch.cloneNode(true)); const vb = ref.getAttribute("viewBox"); if (vb && !c.getAttribute("viewBox")) c.setAttribute("viewBox", vb); u.replaceWith(g); } } });
    return c.outerHTML;
  };
  const rec = (el: Element, keyPath: string): any => {
    const cs = getComputedStyle(el);
    if (cs.display === "none") return null;
    if (["SCRIPT","STYLE","LINK","NOSCRIPT"].includes(el.tagName)) return null;
    const r = el.getBoundingClientRect();
    const n: any = { tag: el.tagName.toLowerCase(), key: keyPath, cls: typeof el.className === "string" ? el.className : "", name: el.getAttribute("data-framer-name") || undefined, rect: [Math.round(r.x*10)/10, Math.round((r.y + scrollY)*10)/10, Math.round(r.width*10)/10, Math.round(r.height*10)/10] };
    const isText = TXT.includes(el.tagName) && el.tagName !== "A";
    n.css = authored(el);
    if (isText || el.tagName === "A" || el.querySelector(":scope > br") ) { n.font = {}; for (const k of TPROPS) n.font[k] = cs.getPropertyValue(k); }
    if (el.tagName === "IMG") { n.src = (el as HTMLImageElement).currentSrc || el.getAttribute("src"); n.alt = el.getAttribute("alt"); n.srcAttr = el.getAttribute("src"); }
    if (el.tagName === "A") n.href = el.getAttribute("href");
    if (el.tagName === "IFRAME") n.iframe = true;
    for (const a of ["data-border","data-framer-appear-id","aria-label","placeholder","type","role","data-framer-component-type"]) if (el.getAttribute(a) != null) (n.attrs ??= {})[a] = el.getAttribute(a);
    if (el.tagName.toLowerCase() === "svg") { n.svg = svgOuter(el); return n; }
    if (el.tagName === "IFRAME") return n;
    const kids: any[] = []; const cnt: Record<string, number> = {};
    for (const c of Array.from(el.childNodes)) {
      if (c.nodeType === 3) { const t = c.textContent!; if (t.replace(/[ \n\t\r]/g, "").length || (t.length && kids.length)) kids.push({ text: t }); continue; }
      if (c.nodeType !== 1) continue;
      const ce = c as Element;
      const k0 = (typeof ce.className === "string" && ce.className.split(" ").find(x => x.startsWith("framer-") && x !== "framer-text")) || ce.tagName.toLowerCase();
      cnt[k0] = (cnt[k0] || 0) + 1;
      const kid = rec(ce, keyPath + "/" + k0 + (cnt[k0] > 1 ? "#" + cnt[k0] : ""));
      if (kid) kids.push(kid);
    }
    if (kids.length) n.kids = kids;
    return n;
  };
  return rec(document.querySelector("[data-framer-root]")!, "root");
});
await Bun.write(out, JSON.stringify(data));
console.log(w, JSON.stringify(data).length);
await b.close();

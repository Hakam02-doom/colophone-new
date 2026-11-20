import { useEffect, useMemo, useRef, type CSSProperties } from "react";

type Props = {
  text: string;
  className?: string;
  style?: CSSProperties;
  colorHidden?: string;
  colorRevealed?: string;
  /** stagger between characters, in units of one 0.7 reveal window */
  stagger?: number;
  xOffset?: number;
  yOffset?: number;
  /** reveal starts when the element top crosses this % of the viewport… */
  offsetStart?: number;
  /** …and completes at this % */
  offsetEnd?: number;
};

/** Port of the scroll-scrubbed text reveal used for the statement paragraph ("Typewriter" preset, character mode). */
export function ScrollRevealText({ text, className, style, colorHidden = "rgb(156, 163, 175)", colorRevealed = "rgb(17, 17, 18)", stagger = 0.4, xOffset = 0, yOffset = 0, offsetStart = 80, offsetEnd = 20 }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const spans = useRef<(HTMLSpanElement | null)[]>([]);

  const { chars, groups, units } = useMemo(() => {
    const chars: { char: string; unit: number; isSpace: boolean }[] = [];
    let unit = 0;
    for (const part of text.split(/(\s+)/)) {
      const space = /^\s+$/.test(part);
      for (const ch of Array.from(part)) chars.push({ char: ch, unit: space ? -1 : unit++, isSpace: space });
    }
    const groups: { type: "word" | "space"; idx: number[] }[] = [];
    let cur: { type: "word"; idx: number[] } | null = null;
    chars.forEach((c, i) => {
      if (c.isSpace) {
        if (cur) groups.push(cur), (cur = null);
        groups.push({ type: "space", idx: [i] });
      } else (cur ??= { type: "word", idx: [] }).idx.push(i);
    });
    if (cur) groups.push(cur);
    return { chars, groups, units: unit };
  }, [text]);

  useEffect(() => {
    const el = root.current;
    if (!el || !units) return;
    const win = 0.7;
    const total = win + (units - 1) * stagger;
    const paint = (p: number) => {
      const t = p * total;
      spans.current.forEach((node, i) => {
        const c = chars[i];
        if (!node || !c || c.isSpace) return;
        const a = units <= 1 ? p : Math.max(0, Math.min(1, (t - c.unit * stagger) / win));
        node.style.opacity = `${0.3 + a * 0.7}`;
        node.style.transform = `translateX(${(-xOffset + xOffset * a).toFixed(1)}px) translateY(${(yOffset * (1 - a)).toFixed(1)}px)`;
        node.style.color = `color-mix(in srgb, ${colorRevealed} ${Math.round(a * 100)}%, ${colorHidden})`;
      });
    };
    const s = offsetStart / 100, e = offsetEnd / 100;
    let visible = false, queued = false, raf = 0;
    const update = () => {
      const vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      const range = (s - e) * vh;
      if (range <= 0) return;
      paint(Math.max(0, Math.min(1, (s * vh - r.top) / range)));
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update();
    }, { rootMargin: "200px" });
    io.observe(el);
    const onScroll = () => {
      if (!visible || queued) return;
      queued = true;
      raf = requestAnimationFrame(() => {
        update();
        queued = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [chars, units, stagger, xOffset, yOffset, offsetStart, offsetEnd, colorHidden, colorRevealed]);

  return (
    <div ref={root} className={className} style={{ display: "inline-block", ...style }}>
      {groups.map((g, gi) =>
        g.type === "word" ? (
          <span key={gi} data-wg={gi} style={{ whiteSpace: "nowrap", display: "inline" }}>
            {g.idx.map((i) => (
              <span key={i} ref={(n) => void (spans.current[i] = n)} style={{ display: "inline-block", willChange: "transform, opacity, color, filter" }}>
                {chars[i].char}
              </span>
            ))}
          </span>
        ) : (
          g.idx.map((i) => (
            <span key={i} style={{ display: "inline-block" }}>
              {chars[i].char === " " ? "\u00a0" : chars[i].char}
            </span>
          ))
        ),
      )}
    </div>
  );
}

import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  className?: string;
  /** px per second */
  velocity?: number;
  gap?: number;
  reverse?: boolean;
  /** speed (in % of velocity) while hovered */
  hoverModifier?: number;
  draggable?: boolean;
  children: ReactNode[];
};

/** Horizontal infinite ticker matching Framer's ticker effect (clip overflow, start aligned, clones appended to fill). */
export function Ticker({ className, velocity = 90, gap = 16, reverse = false, hoverModifier = 50, draggable = true, children }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [period, setPeriod] = useState(0);
  const [clones, setClones] = useState(1);
  const x = useMotionValue(0);
  const hover = useRef(false);
  const drag = useRef<{ x: number; start: number; v: number; t: number } | null>(null);
  const momentum = useRef(0);

  useLayoutEffect(() => {
    const measure = () => {
      const ul = list.current, w = wrap.current;
      if (!ul || !w) return;
      const items = Array.from(ul.children).slice(0, children.length) as HTMLElement[];
      if (!items.length) return;
      const p = items.reduce((s, el) => s + el.getBoundingClientRect().width, 0) + gap * items.length;
      setPeriod(p);
      setClones(Math.max(1, Math.ceil((w.parentElement?.getBoundingClientRect().width ?? p) / p) + 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [children.length, gap]);

  useAnimationFrame((_, dt) => {
    if (!period || drag.current) return;
    const speed = (velocity * (hover.current ? hoverModifier / 100 : 1)) / 1000;
    let next = x.get() + (reverse ? speed : -speed) * dt + momentum.current * dt;
    momentum.current *= Math.pow(0.95, dt / 16);
    if (Math.abs(momentum.current) < 0.001) momentum.current = 0;
    next = ((next % period) - period) % period;
    x.set(next);
  });

  const items: ReactNode[] = [];
  for (let c = 0; c <= clones; c++)
    children.forEach((child, i) =>
      items.push(
        <li key={`${c}-${i}`} aria-hidden={c > 0 || undefined} style={{ flexShrink: 0 }}>
          {child}
        </li>,
      ),
    );

  return (
    <div
      ref={wrap}
      className={className}
      style={{ overflow: "clip", userSelect: "none", touchAction: "pan-y" }}
      onPointerEnter={() => (hover.current = true)}
      onPointerLeave={() => (hover.current = false)}
      onPointerDown={(e) => {
        if (!draggable) return;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        drag.current = { x: e.clientX, start: x.get(), v: 0, t: performance.now() };
        momentum.current = 0;
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d) return;
        const now = performance.now();
        const prev = x.get();
        const next = d.start + (e.clientX - d.x);
        d.v = (next - prev) / Math.max(1, now - d.t);
        d.t = now;
        x.set(period ? ((next % period) - period) % period : next);
        d.start = x.get() - (e.clientX - d.x);
      }}
      onPointerUp={() => {
        if (drag.current) momentum.current = drag.current.v;
        drag.current = null;
      }}
    >
      <motion.ul
        ref={list}
        style={{ x, display: "flex", listStyle: "none", padding: 0, margin: 0, gap, flexDirection: "row", alignItems: "flex-start", width: "max-content", willChange: "transform" }}
      >
        {items}
      </motion.ul>
    </div>
  );
}

import { motion, type Transition } from "motion/react";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";

type Props = {
  text: string;
  className?: string;
  color: string;
  fontFamily: string;
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: string;
  textTransform?: CSSProperties["textTransform"];
  stagger?: number;
  reverse?: boolean;
  transition?: Transition;
  hovered?: boolean;
};

const DEFAULT_TRANSITION: Transition = { type: "spring", duration: 0.4, bounce: 0, delay: 0 };

/** Port of Framer's "Rolling Text": every letter rolls up one line on hover, a text-shadow copy rolls in from below. */
export function RollingText({
  text,
  className,
  color,
  fontFamily,
  fontSize,
  fontWeight = 400,
  lineHeight = "1.2em",
  textTransform = "none",
  stagger = 35,
  reverse = false,
  transition = DEFAULT_TRANSITION,
  hovered,
}: Props) {
  const [hover, setHover] = useState(false);
  const active = hovered ?? hover;
  const pRef = useRef<HTMLParagraphElement>(null);
  const [linePx, setLinePx] = useState(0);
  useLayoutEffect(() => {
    const measure = () => {
      const el = pRef.current;
      if (!el) return;
      const size = parseFloat(getComputedStyle(el).fontSize) || 16;
      setLinePx(lineHeight.endsWith("em") ? size * parseFloat(lineHeight) : parseFloat(lineHeight));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [lineHeight]);
  const lineAbs = lineHeight.endsWith("em") ? lineHeight : `${parseFloat(lineHeight)}px`;
  const duration = typeof transition.duration === "number" ? transition.duration : 0.5;
  const chars = [...text];

  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", overflow: "hidden", boxSizing: "border-box", ...(fontSize ? ({ "--rt-size": `${fontSize}px` } as CSSProperties) : null) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <p
        ref={pRef}
        aria-label={text}
        style={{
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
          verticalAlign: "top",
          display: "flex",
          overflow: "hidden",
          width: "max-content",
          fontFamily,
          fontSize: "var(--rt-size)",
          textTransform,
          userSelect: "none",
          textShadow: `0 ${lineAbs} 0 ${color}`,
        }}
      >
        {chars.map((ch, i) => {
          const order = reverse ? chars.length - 1 - i : i;
          const delay = chars.length > 0 ? (duration / chars.length) * order * (stagger / 100) : 0;
          return (
            <motion.span
              key={i}
              aria-hidden
              initial={{ y: 0 }}
              animate={{ y: active ? -linePx : 0 }}
              transition={{ ...transition, delay }}
              style={{
                display: "block",
                backfaceVisibility: "hidden",
                whiteSpace: "pre",
                flexShrink: 0,
                fontFamily,
                fontWeight,
                fontSize: "var(--rt-size)",
                letterSpacing: "0px",
                lineHeight,
                color,
              }}
            >
              {ch === " " ? "\u00a0" : ch}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
}

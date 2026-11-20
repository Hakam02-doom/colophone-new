import { animate, stagger, useReducedMotion, type Transition } from "motion/react";
import { Children, cloneElement, isValidElement, useEffect, useRef, type ReactElement, type ReactNode } from "react";
import { useFxInView, type FxTrigger } from "./useFxTarget";

type Props = FxTrigger & {
  as?: "p" | "h1" | "h2" | "h3" | "div" | "span";
  className?: string;
  tokenization?: "character" | "word" | "line";
  transition: Transition & { delay?: number };
  startDelay?: number;
  children: ReactNode;
};

const HIDDEN = { display: "inline-block", opacity: 0.001, transform: "translateY(10px)" } as const;

function tokenize(text: string, mode: Props["tokenization"]): ReactNode[] {
  const words = text.split(" ");
  return words.map((word, wi) => {
    const last = wi === words.length - 1;
    const body =
      mode === "word" ? (
        <span data-tok style={HIDDEN}>{word}</span>
      ) : (
        <span style={{ whiteSpace: word.length <= 12 ? "nowrap" : "unset" }}>
          {Array.from(word).map((ch, ci) => (
            <span key={ci} data-tok style={HIDDEN}>
              {ch}
            </span>
          ))}
        </span>
      );
    return (
      <span key={wi}>
        {body}
        {last ? null : " "}
      </span>
    );
  });
}

function mapText(node: ReactNode, mode: Props["tokenization"]): ReactNode {
  return Children.map(node, (child) => {
    if (typeof child === "string") return tokenize(child, mode);
    if (isValidElement(child)) {
      const el = child as ReactElement<{ children?: ReactNode }>;
      return cloneElement(el, undefined, mapText(el.props.children, mode));
    }
    return child;
  });
}

/** Framer text "appear" effect: tokens rise 10px and fade in, staggered per character, word or measured line. */
export function TextFx({ as = "p", className, tokenization = "line", transition, startDelay = 0, children, ...trigger }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useFxInView(ref, trigger);
  const reduced = useReducedMotion();
  useEffect(() => {
    const root = ref.current;
    if (!inView || !root) return;
    const toks = Array.from(root.querySelectorAll<HTMLElement>("[data-tok]"));
    if (!toks.length) return;
    const { delay = 0, ...t } = transition;
    const keyframes = reduced ? { opacity: [0.001, 1], y: [0, 0] } : { opacity: [0.001, 1], y: [10, 0] };
    if (tokenization === "line") {
      const lines: HTMLElement[][] = [];
      let top = -Infinity;
      for (const el of toks) {
        const y = el.offsetTop;
        if (!lines.length || Math.abs(y - top) > 3) lines.push([]);
        lines[lines.length - 1].push(el);
        top = y;
      }
      const controls = lines.map((line, i) => animate(line, keyframes, { ...t, restDelta: 0.001, delay: startDelay + i * delay }));
      return () => controls.forEach((c) => c.stop());
    }
    const c = animate(toks, keyframes, { ...t, restDelta: 0.001, delay: stagger(delay, { startDelay }) });
    return () => c.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps
  const Tag = as as "p";
  return (
    <Tag ref={ref as never} className={className}>
      {mapText(children, tokenization)}
    </Tag>
  );
}

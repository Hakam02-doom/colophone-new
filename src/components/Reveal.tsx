import { motion, type TargetAndTransition, type Transition } from "motion/react";
import { useRef, type ComponentProps, type ElementType } from "react";
import { useFxInView, type FxTrigger } from "./useFxTarget";

const cache = new Map<string, ElementType>();
function motionTag(tag: string): ElementType {
  if (!cache.has(tag)) cache.set(tag, motion.create(tag as "div"));
  return cache.get(tag)!;
}

export const EASE: [number, number, number, number] = [0.44, 0, 0.56, 1];
export const tween = (duration: number, delay = 0): Transition => ({ type: "tween", duration, delay, ease: EASE });
export const spring = (duration: number, bounce = 0, delay = 0): Transition => ({ type: "spring", duration, bounce, delay });

type Props = FxTrigger & {
  as?: string;
  from: TargetAndTransition;
  to: TargetAndTransition;
  transition: Transition;
  transformTemplate?: (t: Record<string, unknown>, generated: string) => string;
} & Omit<ComponentProps<"div">, "ref" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd">;

/** Element that animates `from` → `to` when its trigger fires (Framer appear effects and variant appears). */
export function Reveal({ as = "div", from, to, transition, target, amount, once = true, offsetTop, playOnMount, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useFxInView(ref, { target, amount, once, offsetTop, playOnMount, mode: target ? "scroll" : "io" });
  const Tag = motionTag(as);
  return <Tag ref={ref} initial={from} animate={inView ? to : from} transition={transition} {...rest} />;
}

/** Keeps a CSS translateX(-50%) centring while Motion drives the rest of the transform. */
export const centerX = (_: unknown, generated: string) => `translateX(-50%) ${generated}`;

import { useEffect, useState, type RefObject } from "react";

export type FxTrigger = {
  /** `data-fx` name of the element that triggers the effect; defaults to the element itself. */
  target?: string;
  /** Fraction of the target that must be visible (Framer "threshold"). */
  amount?: number;
  once?: boolean;
  /** Extends the viewport upwards by this many px (Framer target "offset"). */
  offsetTop?: number;
  /** Fire on mount instead of on scroll. */
  playOnMount?: boolean;
  /**
   * "io": IntersectionObserver with `amount` (Framer text effects).
   * "scroll": Framer's scroll-target appear — active once the target's top is above amount × viewport height + offsetTop + 1px.
   */
  mode?: "io" | "scroll";
};

function visibleTarget(name: string): Element | null {
  const all = Array.from(document.querySelectorAll(`[data-fx="${name}"]`));
  return all.find((el) => el.getClientRects().length > 0) ?? all[0] ?? null;
}

/** Mirrors Framer's appear triggers: inView of a (possibly different) target element via IntersectionObserver. */
export function useFxInView(self: RefObject<Element | null>, { target, amount = 0.5, once = true, offsetTop, playOnMount, mode = "io" }: FxTrigger) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (playOnMount) {
      setInView(true);
      return;
    }
    const el = target ? visibleTarget(target) : self.current;
    if (!el) return;
    if (mode === "scroll") {
      let done = false;
      const check = () => {
        if (done) return;
        const active = el.getBoundingClientRect().top <= amount * window.innerHeight + (offsetTop ?? 0) + 1;
        setInView(active);
        if (active && once) {
          done = true;
          window.removeEventListener("scroll", check);
          window.removeEventListener("resize", check);
        }
      };
      check();
      window.addEventListener("scroll", check, { passive: true });
      window.addEventListener("resize", check);
      return () => {
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      };
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold: amount, rootMargin: offsetTop ? `${offsetTop}px 0px 0px 0px` : undefined },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, amount, once, offsetTop, playOnMount, mode, self]);
  return inView;
}

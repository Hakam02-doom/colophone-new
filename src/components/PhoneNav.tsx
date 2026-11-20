import { motion } from "motion/react";
import { createContext, useContext, useEffect, useState, type ComponentProps } from "react";

const NavCtx = createContext<{ open: boolean; toggle: () => void }>({ open: false, toggle: () => {} });
const SPRING = { type: "spring", duration: 0.6, bounce: 0 } as const;

type DivProps = { as?: string } & Omit<ComponentProps<typeof motion.div>, "ref">;

/** Phone navbar: closed = 60px tall clipped bar, opened = auto height (Framer "Phone Closed" → "Phone Opened"). */
const COMPACT = "(max-width: 1199.98px)";

function useCompact() {
  const [compact, setCompact] = useState(() => typeof window !== "undefined" && window.matchMedia(COMPACT).matches);
  useEffect(() => {
    const mq = window.matchMedia(COMPACT);
    const on = () => setCompact(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return compact;
}

export function PhoneNavRoot({ as: _as, children, ...props }: DivProps) {
  const [open, setOpen] = useState(false);
  const compact = useCompact();
  useEffect(() => {
    if (!compact) setOpen(false);
  }, [compact]);
  return (
    <NavCtx.Provider value={{ open, toggle: () => setOpen((o) => !o) }}>
      <motion.div
        key={compact ? "compact" : "wide"}
        {...props}
        data-open={open || undefined}
        initial={false}
        animate={compact ? (open ? { height: "auto", padding: 16 } : { height: 60, padding: 10 }) : undefined}
        transition={SPRING}
      >
        {children}
      </motion.div>
    </NavCtx.Provider>
  );
}

export function MenuIcon({ as: _as, ...props }: DivProps) {
  const { open, toggle } = useContext(NavCtx);
  return <motion.div role="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} tabIndex={0} onClick={toggle} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle())} {...props} />;
}

export function MenuLine({ as: _as, closed, opened, ...props }: DivProps & { closed: number; opened: number }) {
  const { open } = useContext(NavCtx);
  return <motion.div {...props} initial={false} animate={{ rotate: open ? opened : closed }} transition={SPRING} />;
}

import { motion } from "motion/react";
import type { ComponentProps } from "react";

/** Button label wrapper: scales to .95 while pressed (Framer "pressed" variant, spring .6s no bounce). */
export function Press({ as: _as, ...props }: { as?: string } & Omit<ComponentProps<typeof motion.div>, "ref">) {
  return <motion.div whileTap={{ scale: 0.95 }} transition={{ type: "spring", duration: 0.6, bounce: 0 }} {...props} />;
}

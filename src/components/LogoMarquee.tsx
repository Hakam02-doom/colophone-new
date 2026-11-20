import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { useState } from "react";

type Props = {
  logos: string[];
  speed?: number;
  hoverSpeed?: number;
  gap?: number;
  logoSize?: number;
  padding?: number;
  borderWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
};

/** Port of the site's "Brand logos carousel" code component. */
export function LogoMarquee({ logos, speed = 1, hoverSpeed = 0.3, gap = 0, logoSize = 130, padding = 30, borderWidth = 1, borderColor = "rgb(238, 238, 238)", backgroundColor = "rgb(255, 255, 255)" }: Props) {
  const [hover, setHover] = useState(false);
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);
  const current = paused ? 0 : hover ? hoverSpeed : speed;

  useAnimationFrame((_, dt) => {
    const loop = logos.length * (logoSize + gap);
    let next = x.get() - current * (dt / 16);
    if (next <= -loop) next += loop;
    x.set(next);
  });

  const toggle = () => setPaused((p) => !p);
  return (
    <div
      style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative", display: "flex", alignItems: "center" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle();
        }
      }}
      role="region"
      aria-label="Brand logos carousel"
      tabIndex={0}
    >
      <motion.div style={{ display: "flex", gap: `${gap}px`, x, willChange: "transform" }}>
        {[...logos, ...logos, ...logos].map((src, i) => (
          <div
            key={i}
            role="img"
            aria-label={`Brand ${(i % logos.length) + 1}`}
            style={{ width: logoSize, height: logoSize, backgroundColor, padding, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `${borderWidth}px solid ${borderColor}` }}
          >
            <img src={src} alt={`Brand ${(i % logos.length) + 1}`} style={{ width: "100%", height: "100%", objectFit: "contain", filter: "grayscale(100%)", transition: "filter 0.3s ease" }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

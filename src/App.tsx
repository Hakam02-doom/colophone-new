import { MotionConfig } from "motion/react";
import { Hero } from "./sections/Hero";
import { TrustedPartners } from "./sections/TrustedPartners";
import { Statement } from "./sections/Statement";
import { Stats } from "./sections/Stats";
import { Works } from "./sections/Works";
import { Worldwide } from "./sections/Worldwide";
import { Process } from "./sections/Process";
import { Security } from "./sections/Security";
import { Blogs } from "./sections/Blogs";
import { Cta } from "./sections/Cta";
import { Footer } from "./sections/Footer";

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="page">
        <Hero />
        <TrustedPartners />
        <Statement />
        <Stats />
        <Works />
        <Worldwide />
        <Process />
        <Security />
        <Blogs />
        <Cta />
        <Footer />
      </div>
    </MotionConfig>
  );
}

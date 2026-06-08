"use client";

import { motion } from "motion/react";
import { useTranslation } from "./LanguageProvider";
import { PulseBeams } from "@/components/ui/pulse-beams";

const contactBeams = [
  {
    path: "M 50 50 L 220 50 L 220 140 L 429 217",
    gradientConfig: {
      initial: { x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
      animate: {
        x1: ["0%", "100%", "0%"],
        y1: ["0%", "100%", "0%"],
        x2: ["100%", "0%", "100%"],
        y2: ["100%", "0%", "100%"],
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear",
      },
    },
    connectionPoints: [
      { cx: 50, cy: 50, r: 5 },
      { cx: 220, cy: 50, r: 4 },
      { cx: 220, cy: 140, r: 4 },
      { cx: 429, cy: 217, r: 6 },
    ],
    proton: {
      cx: [50, 220, 220, 429],
      cy: [50, 50, 140, 217],
      color: "#C7AC60",
      duration: 3,
      r: 5,
      repeatDelay: 1,
    },
  },
  {
    path: "M 808 50 L 620 50 L 620 140 L 429 217",
    gradientConfig: {
      initial: { x1: "0%", y1: "80%", x2: "100%", y2: "20%" },
      animate: {
        x1: ["0%", "100%", "0%"],
        y1: ["80%", "20%", "80%"],
        x2: ["100%", "0%", "100%"],
        y2: ["20%", "80%", "20%"],
      },
      transition: {
        duration: 3.5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear",
      },
    },
    connectionPoints: [
      { cx: 808, cy: 50, r: 5 },
      { cx: 620, cy: 50, r: 4 },
      { cx: 620, cy: 140, r: 4 },
      { cx: 429, cy: 217, r: 6 },
    ],
    proton: {
      cx: [808, 620, 620, 429],
      cy: [50, 50, 140, 217],
      color: "#6344F5",
      duration: 3.5,
      r: 5,
      repeatDelay: 1.5,
    },
  },
  {
    path: "M 50 384 L 220 384 L 220 290 L 429 217",
    gradientConfig: {
      initial: { x1: "40%", y1: "100%", x2: "60%", y2: "0%" },
      animate: {
        x1: ["40%", "60%", "40%"],
        y1: ["100%", "0%", "100%"],
        x2: ["60%", "40%", "60%"],
        y2: ["0%", "100%", "0%"],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear",
      },
    },
    connectionPoints: [
      { cx: 50, cy: 384, r: 5 },
      { cx: 220, cy: 384, r: 4 },
      { cx: 220, cy: 290, r: 4 },
      { cx: 429, cy: 217, r: 6 },
    ],
    proton: {
      cx: [50, 220, 220, 429],
      cy: [384, 384, 290, 217],
      color: "#AE48FF",
      duration: 4,
      r: 5,
      repeatDelay: 2,
    },
  },
  {
    path: "M 808 384 L 620 384 L 620 290 L 429 217",
    gradientConfig: {
      initial: { x1: "60%", y1: "160%", x2: "40%", y2: "-60%" },
      animate: {
        x1: ["60%", "40%", "60%"],
        y1: ["160%", "-60%", "160%"],
        x2: ["40%", "60%", "40%"],
        y2: ["-60%", "160%", "-60%"],
      },
      transition: {
        duration: 4.5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear",
      },
    },
    connectionPoints: [
      { cx: 808, cy: 384, r: 5 },
      { cx: 620, cy: 384, r: 4 },
      { cx: 620, cy: 290, r: 4 },
      { cx: 429, cy: 217, r: 6 },
    ],
    proton: {
      cx: [808, 620, 620, 429],
      cy: [384, 384, 290, 217],
      color: "#C7AC60",
      duration: 4.5,
      r: 5,
      repeatDelay: 2.5,
    },
  },
];

const gradientColors = {
  start: "#C7AC60",
  middle: "#6344F5",
  end: "#AE48FF",
};

export default function Contact() {
  const t = useTranslation();

  return (
    <section id="contact" className="relative border-t border-stone-200 dark:border-stone-700">
      <PulseBeams beams={contactBeams} gradientColors={gradientColors}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto px-6 py-28 text-center"
        >
          <p className="section-label mb-8 inline-block rounded-full border border-[#C7AC60] px-3.5 py-1.5 font-mono font-semibold text-[12px] uppercase tracking-[0.18em] text-stone-400">
            {t("contactLabel")}
          </p>

          <p className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-none tracking-tight text-stone-800 dark:text-stone-100">
            Contact
          </p>
        </motion.div>
      </PulseBeams>
    </section>
  );
}

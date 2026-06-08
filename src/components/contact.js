"use client";

import { motion } from "motion/react";
import { useTranslation } from "./LanguageProvider";
import { PulseBeams } from "@/components/ui/pulse-beams";
import { Phone } from "@phosphor-icons/react";

const contactBeams = [
  {
    path: "M120 380 Q280 180 440 340 Q600 500 740 220",
    gradientConfig: {
      initial: { x1: "0%", y1: "0%", x2: "100%", y2: "100%" },
      animate: {
        x1: ["0%", "100%", "0%"],
        y1: ["0%", "100%", "0%"],
        x2: ["100%", "0%", "100%"],
        y2: ["100%", "0%", "100%"],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear",
      },
    },
    connectionPoints: [
      { cx: 120, cy: 380, r: 4 },
      { cx: 740, cy: 220, r: 4 },
    ],
  },
  {
    path: "M200 120 Q400 300 600 160 Q750 60 858 300",
    gradientConfig: {
      initial: { x1: "0%", y1: "80%", x2: "100%", y2: "20%" },
      animate: {
        x1: ["0%", "100%", "0%"],
        y1: ["80%", "20%", "80%"],
        x2: ["100%", "0%", "100%"],
        y2: ["20%", "80%", "20%"],
      },
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear",
      },
    },
    connectionPoints: [
      { cx: 200, cy: 120, r: 4 },
      { cx: 858, cy: 300, r: 4 },
    ],
  },
  {
    path: "M50 200 Q250 380 450 180 Q650 50 800 350",
    gradientConfig: {
      initial: { x1: "40%", y1: "100%", x2: "60%", y2: "0%" },
      animate: {
        x1: ["40%", "60%", "40%"],
        y1: ["100%", "0%", "100%"],
        x2: ["60%", "40%", "60%"],
        y2: ["0%", "100%", "0%"],
      },
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear",
      },
    },
    connectionPoints: [
      { cx: 50, cy: 200, r: 4 },
      { cx: 800, cy: 350, r: 4 },
    ],
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
          className="mx-auto max-w-[500px] px-6 py-28 text-center"
        >
          <p className="section-label mb-8 inline-block rounded-full border border-[#C7AC60] px-3.5 py-1.5 font-mono font-semibold text-[12px] uppercase tracking-[0.18em] text-stone-400">
            {t("contactLabel")}
          </p>

          <div className="rounded-2xl border border-[#C7AC60]/20 bg-white/60 p-8 shadow-xl backdrop-blur-xl dark:bg-stone-900/60">
            <div className="space-y-6">
              <div>
                <p className="text-lg font-semibold tracking-tight text-stone-800 dark:text-stone-100">
                  Daniel Abu Rayan
                </p>
                <p className="mt-1 text-base text-stone-500 dark:text-stone-400" style={{ fontFamily: "var(--font-arabic)" }}>
                  دانيال ابو ريان
                </p>
              </div>

              <div className="h-px bg-stone-200 dark:bg-stone-700" />

              <div className="flex items-center justify-center gap-2">
                <Phone size={18} weight="bold" className="text-[#C7AC60]" />
                <a
                  href="tel:+966570977204"
                  className="text-base font-medium text-stone-700 transition-colors hover:text-[#C7AC60] dark:text-stone-300"
                  dir="ltr"
                >
                  +966 57 097 7204
                </a>
              </div>

              <div className="h-px bg-stone-200 dark:bg-stone-700" />

              <div>
                <p className="text-base text-stone-600 dark:text-stone-300">
                  Freelance
                </p>
                <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400" style={{ fontFamily: "var(--font-arabic)" }}>
                  عمل حر
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </PulseBeams>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import { useTranslation } from "./LanguageProvider";
import { PulseBeams } from "@/components/ui/pulse-beams";
import { IdentificationCard } from "@phosphor-icons/react";

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

  function downloadVCard() {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN;CHARSET=UTF-8:Daniel Abu Rayan",
      "N;CHARSET=UTF-8:Abu Rayan;Daniel;دانيال;ابو ريان;",
      "TEL;TYPE=CELL:+966570977204",
      "TITLE;CHARSET=UTF-8:Freelance",
      "NOTE;CHARSET=UTF-8:عمل حر",
      "END:VCARD",
    ].join("\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Daniel-Abu-Rayan.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

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

          <div className="flex justify-center">
            <button
              onClick={downloadVCard}
              className="inline-flex h-14 cursor-pointer items-center gap-3 rounded-xl border border-[#C7AC60]/30 bg-[#C7AC60]/10 px-8 text-sm font-semibold tracking-wider text-stone-700 uppercase transition-all duration-300 hover:bg-[#C7AC60] hover:text-[#fafaf9] hover:-translate-y-0.5 active:scale-[0.97] dark:text-stone-300"
            >
              <IdentificationCard size={22} weight="bold" />
              <span>{t("contactDownload")}</span>
            </button>
          </div>
        </motion.div>
      </PulseBeams>
    </section>
  );
}

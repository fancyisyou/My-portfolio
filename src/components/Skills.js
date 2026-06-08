"use client";

import { motion } from "motion/react";
import { useTranslation } from "./LanguageProvider";

const skills = [
  "skill1", "skill2", "skill3", "skill4",
  "skill5", "skill6", "skill7", "skill8",
  "skill9", "skill10", "skill11", "skill12",
];

export default function Skills() {
  const t = useTranslation();

  return (
    <section id="skills">
      <div className="mx-auto max-w-[1100px] px-6 py-28">
        <p className="section-label mb-3 inline-block rounded-full border border-[#C7AC60] px-3.5 py-1.5 font-mono font-semibold text-[12px] uppercase tracking-[0.18em] text-stone-400">
          {t("skillsLabel")}
        </p>
        <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-tight tracking-tight">
          {t("skillsTitle")}
        </h2>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {skills.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: (i % 4) * 0.08 + Math.floor(i / 4) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#C7AC60] px-7 text-sm font-medium text-[#C7AC60] transition-all duration-300 hover:bg-[#F5EDD0] hover:-translate-y-0.5"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#C7AC60]" />
              <span>{t(key)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

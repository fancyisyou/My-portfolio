"use client";

import { motion } from "motion/react";
import { useTranslation } from "./LanguageProvider";

export default function Contact() {
  const t = useTranslation();

  return (
    <section id="contact">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[600px] px-6 py-28 text-center"
      >
        <p className="section-label mb-3 inline-block rounded-full border border-[#C7AC60] px-3.5 py-1.5 font-mono font-semibold text-[12px] uppercase tracking-[0.18em] text-stone-400">
          {t("contactLabel")}
        </p>
        <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-tight tracking-tight">
          {t("contactTitle")}
        </h2>
        <p className="mx-auto mb-8 mt-4 max-w-[45ch] text-base leading-relaxed text-stone-500">
          {t("contactDesc")}
        </p>
        <a
          href="https://wa.me/966570977204"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#C7AC60] px-8 text-sm font-medium text-[#fafaf9] transition-all duration-300 hover:opacity-85 hover:-translate-y-0.5"
        >
          {t("contactLabel")}
        </a>
      </motion.div>
    </section>
  );
}

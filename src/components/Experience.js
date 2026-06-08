"use client";

import { motion } from "motion/react";
import { useTranslation } from "./LanguageProvider";

const items = [
  { dateKey: "exp1Date", roleKey: "exp1Role", companyKey: "exp1Company", descKey: "exp1Desc", delay: 0 },
  { dateKey: "exp2Date", roleKey: "exp2Role", companyKey: "exp2Company", descKey: "exp2Desc", delay: 0.1 },
  { dateKey: "exp3Date", roleKey: "exp3Role", companyKey: "exp3Company", descKey: "exp3Desc", delay: 0.2 },
  { dateKey: "exp4Date", roleKey: "exp4Role", companyKey: "exp4Company", descKey: "exp4Desc", delay: 0.3 },
  { dateKey: "exp5Date", roleKey: "exp5Role", companyKey: "exp5Company", descKey: "exp5Desc", delay: 0.4 },
  { dateKey: "exp6Date", roleKey: "exp6Role", companyKey: "exp6Company", descKey: "exp6Desc", delay: 0.5 },
  { dateKey: "exp7Date", roleKey: "exp7Role", companyKey: "exp7Company", descKey: "exp7Desc", delay: 0.6 },
  { dateKey: "exp8Date", roleKey: "exp8Role", companyKey: "exp8Company", descKey: "exp8Desc", delay: 0.7 },
];

export default function Experience() {
  const t = useTranslation();

  return (
    <section id="experience">
      <div className="mx-auto max-w-[1100px] px-6 py-28">
        <p className="section-label mb-3 inline-block rounded-full border border-[#C7AC60] px-3.5 py-1.5 font-mono font-semibold text-[12px] uppercase tracking-[0.18em] text-stone-400">
          {t("expLabel")}
        </p>
        <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-tight tracking-tight">
          {t("expTitle")}
        </h2>
        <div className="relative mt-10 flex flex-col gap-0">
          <div className="absolute start-0 top-5 bottom-5 w-px bg-stone-200 dark:bg-stone-700" />
          {items.map((item, i) => (
            <motion.div
              key={item.dateKey}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
              className="relative pb-10 ps-8 last:pb-0"
            >
              <div className="absolute start-[-4px] top-[6px] h-[9px] w-[9px] rounded-full border-2 border-stone-50 bg-[#C7AC60] dark:border-stone-950" />
              <p className="mb-1.5 font-mono font-semibold text-xs text-stone-400">
                {t(item.dateKey)}
              </p>
              <p className="text-lg font-semibold">{t(item.roleKey)}</p>
              <p className="mb-2 text-sm text-stone-500">{t(item.companyKey)}</p>
              <p className="text-sm leading-relaxed text-stone-500">
                {t(item.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

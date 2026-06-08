"use client";

import { useTranslation } from "./LanguageProvider";

export default function About() {
  const t = useTranslation();

  return (
    <section id="about" className="relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[720px] px-6 py-28">
        <p className="section-label mb-3 inline-block rounded-full border border-[#C7AC60] px-3.5 py-1.5 font-mono font-semibold text-[12px] uppercase tracking-[0.18em] text-stone-400">
          {t("aboutLabel")}
        </p>
        <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-tight tracking-tight">
          {t("aboutTitle")}
        </h2>
        <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-stone-500">
          <p>{t("aboutP1")}</p>
          <p>{t("aboutP2")}</p>
          <p>{t("aboutP3")}</p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { Trophy, Medal, Star } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageProvider";

const iconMap = [Trophy, Medal, Trophy, Star];

export default function Achievements() {
  const { lang, t, dir } = useLanguage();
  const revealRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-reveal");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    revealRefs.current.forEach((el) => {
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const achKeys = Array.from({ length: 4 }, (_, i) => `achievements.items.${i}`);

  return (
    <section
      id="achievements"
      dir={dir}
      className="relative border-t border-white/5 bg-zinc-950 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p
            ref={(el) => (revealRefs.current[0] = el)}
            className={`mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400/70 opacity-0 ${lang === "ar" ? "font-arabic tracking-normal" : ""}`}
          >
            {t("achievements.eyebrow")}
          </p>
          <h2
            ref={(el) => (revealRefs.current[1] = el)}
            className="text-4xl font-black leading-none tracking-tighter text-white opacity-0 md:text-5xl"
            style={{ animationDelay: "0.1s" }}
          >
            {lang === "ar" ? (
              <span className="text-cyan-400">{t("achievements.headingAccent")}</span>
            ) : (
              <>
                {t("achievements.heading")}{" "}
                <span className="text-cyan-400">{t("achievements.headingAccent")}</span>
              </>
            )}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {achKeys.map((key, i) => {
            const Icon = iconMap[i];
            const placement = t(`${key}.placement`);
            const tournament = t(`${key}.tournament`);
            const game = t(`${key}.game`);
            const date = t(`${key}.date`);

            const styleClass =
              i === 0
                ? "border-yellow-500/20 bg-yellow-500/5 shadow-yellow-500/10"
                : i === 1
                  ? "border-zinc-500/20 bg-zinc-500/5 shadow-zinc-500/10"
                  : i === 2
                    ? "border-yellow-500/20 bg-yellow-500/5 shadow-yellow-500/10"
                    : "border-amber-700/20 bg-amber-700/5 shadow-amber-700/10";

            const colorClass =
              i === 0
                ? "text-yellow-400"
                : i === 1
                  ? "text-zinc-300"
                  : i === 2
                    ? "text-yellow-400"
                    : "text-amber-600";

            return (
              <div
                key={tournament}
                ref={(el) => (revealRefs.current[2 + i] = el)}
                className={`group flex items-start gap-5 rounded-lg border p-6 opacity-0 transition-all duration-500 hover:-translate-y-0.5 ${styleClass} shadow-lg`}
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border ${styleClass}`}
                >
                  <Icon className={colorClass} size={lang === "ar" ? 22 : 24} weight="fill" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span
                      className={`${lang === "ar" ? "text-xl" : "text-2xl"} font-black ${colorClass}`}
                    >
                      {placement}
                    </span>
                    <span className="rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                      {game}
                    </span>
                  </div>
                  <p className={`mt-2 text-base font-semibold text-white ${lang === "ar" ? "font-arabic" : ""}`}>
                    {tournament}
                  </p>
                  <p className="mt-1 text-sm text-zinc-500">{date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

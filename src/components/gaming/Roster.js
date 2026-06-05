"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Roster() {
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

  const memberKeys = Array.from({ length: 6 }, (_, i) => `roster.members.${i}`);

  return (
    <section
      id="roster"
      dir={dir}
      className="relative border-t border-white/5 bg-zinc-950 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p
            ref={(el) => (revealRefs.current[0] = el)}
            className={`mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400/70 opacity-0 ${lang === "ar" ? "font-arabic tracking-normal" : ""}`}
          >
            {t("roster.eyebrow")}
          </p>
          <h2
            ref={(el) => (revealRefs.current[1] = el)}
            className="text-4xl font-black leading-none tracking-tighter text-white opacity-0 md:text-5xl"
            style={{ animationDelay: "0.1s" }}
          >
            {lang === "ar" ? (
              <span className="text-cyan-400">{t("roster.headingAccent")}</span>
            ) : (
              <>
                {t("roster.heading")}{" "}
                <span className="text-cyan-400">{t("roster.headingAccent")}</span>
              </>
            )}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {memberKeys.map((key, i) => {
            const gamertag = t(`${key}.gamertag`);
            const role = t(`${key}.role`);
            const game = t(`${key}.game`);
            return (
              <div
                key={gamertag}
                ref={(el) => (revealRefs.current[2 + i] = el)}
                className="group relative overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] p-6 opacity-0 transition-all duration-500 hover:border-cyan-500/30 hover:bg-cyan-500/[0.03]"
                style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-violet-500/20 ring-1 ring-white/10 transition-all duration-300 group-hover:ring-cyan-400/30">
                  <span className="text-xl font-black text-cyan-400">
                    {gamertag[0]}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                  {gamertag}
                </h3>
                <p className={`mt-1 text-sm text-zinc-500 ${lang === "ar" ? "font-arabic" : ""}`}>
                  {role}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    {game}
                  </span>
                </div>

                <div className={`absolute -top-8 ${lang === "ar" ? "-left-8" : "-right-8"} h-24 w-24 rounded-full bg-cyan-500/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-cyan-500/10`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import {
  Users,
  Trophy,
  GameController,
  Clock,
} from "@phosphor-icons/react";
import { useLanguage } from "./LanguageProvider";

const iconMap = [Clock, Users, Trophy, GameController];
const statKeys = ["about.stats.0", "about.stats.1", "about.stats.2", "about.stats.3"];

export default function About() {
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
      { threshold: 0.15 },
    );
    revealRefs.current.forEach((el) => {
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const stats = statKeys.map((key, i) => ({
    icon: iconMap[i],
    value: t(`${key}.value`),
    label: t(`${key}.label`),
  }));

  return (
    <section
      dir={dir}
      className="relative border-t border-white/5 bg-zinc-950 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p
              ref={(el) => (revealRefs.current[0] = el)}
              className={`mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400/70 opacity-0 ${lang === "ar" ? "font-arabic tracking-normal" : ""}`}
            >
              {t("about.eyebrow")}
            </p>
            <h2
              ref={(el) => (revealRefs.current[1] = el)}
              className="text-4xl font-black leading-none tracking-tighter text-white opacity-0 md:text-5xl"
              style={{ animationDelay: "0.1s" }}
            >
              {lang === "ar" ? (
                <>
                  {t("about.headingAccent")}
                  <br />
                  <span className="text-cyan-400">{t("about.heading")}</span>
                </>
              ) : (
                <>
                  {t("about.heading")}
                  <br />
                  <span className="text-cyan-400">{t("about.headingAccent")}</span>
                </>
              )}
            </h2>
            <p
              ref={(el) => (revealRefs.current[2] = el)}
              className={`mt-6 max-w-lg text-base leading-relaxed text-zinc-400 opacity-0 ${lang === "ar" ? "font-arabic leading-[1.8]" : ""}`}
              style={{ animationDelay: "0.2s" }}
            >
              {t("about.description")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  ref={(el) => (revealRefs.current[3 + i] = el)}
                  className="group rounded-lg border border-white/5 bg-white/[0.02] p-6 opacity-0 transition-all duration-500 hover:border-cyan-500/20 hover:bg-cyan-500/5"
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  <Icon
                    className="mb-3 text-cyan-400/70 transition-colors duration-300 group-hover:text-cyan-400"
                    size={lang === "ar" ? 20 : 22}
                  />
                  <p className={`${lang === "ar" ? "text-2xl" : "text-3xl"} font-black text-white`}>
                    {stat.value}
                  </p>
                  <p className={`mt-1 text-sm text-zinc-500 ${lang === "ar" ? "font-arabic" : ""}`}>
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

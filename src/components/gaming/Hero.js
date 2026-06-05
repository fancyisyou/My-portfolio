"use client";

import { useEffect, useRef } from "react";
import { GameController, ArrowRight } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageProvider";

export default function Hero() {
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

  return (
    <section
      dir={dir}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-zinc-950"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full animate-grid"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-zinc-950" />

      <div className="pointer-events-none absolute inset-x-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p
          ref={(el) => (revealRefs.current[0] = el)}
          className={`mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400/70 opacity-0 ${lang === "ar" ? "font-arabic tracking-normal" : ""}`}
        >
          {t("hero.eyebrow")}
        </p>

        <h1
          ref={(el) => (revealRefs.current[1] = el)}
          className="glitch-text relative text-[clamp(3rem,12vw,8rem)] font-black leading-none tracking-tighter text-white opacity-0"
          data-text="ANVAR"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="animate-glow">ANVAR</span>
        </h1>

        <p
          ref={(el) => (revealRefs.current[2] = el)}
          className={`mt-6 font-mono text-sm tracking-[0.3em] text-zinc-500 opacity-0 ${lang === "ar" ? "font-arabic tracking-normal" : ""}`}
          style={{ animationDelay: "0.2s" }}
        >
          {t("hero.tagline")}
        </p>

        <p
          ref={(el) => (revealRefs.current[3] = el)}
          className={`mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-400 opacity-0 ${lang === "ar" ? "font-arabic leading-[1.8]" : ""}`}
          style={{ animationDelay: "0.3s" }}
        >
          {t("hero.description")}
        </p>

        <div
          ref={(el) => (revealRefs.current[4] = el)}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0"
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href="#roster"
            className="group inline-flex h-12 items-center gap-2 rounded-md bg-cyan-500 px-6 text-sm font-bold tracking-wider text-black transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] active:scale-[0.97]"
          >
            <GameController
              size={lang === "ar" ? 14 : 16}
              weight="fill"
            />
            {t("hero.ctaPrimary")}
          </a>
          <a
            href="#achievements"
            className="inline-flex h-12 items-center gap-2 rounded-md border border-zinc-700 px-6 text-sm font-bold tracking-wider text-zinc-300 transition-all duration-300 hover:border-cyan-500/50 hover:text-cyan-400 active:scale-[0.97]"
          >
            {t("hero.ctaSecondary")}
            <ArrowRight
              size={lang === "ar" ? 12 : 14}
              className={lang === "ar" ? "rotate-180" : ""}
            />
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 inset-x-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">
            {t("hero.scroll")}
          </span>
          <span className="block h-8 w-px bg-gradient-to-b from-cyan-500/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}

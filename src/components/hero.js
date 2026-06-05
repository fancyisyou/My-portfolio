"use client";

import { useRef } from "react";
import { useMotionValue, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslation } from "./LanguageProvider";

export default function Hero() {
  const t = useTranslation();
  const boxRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);

  function handlePointer(e) {
    if (prefersReduced) return;
    const rect = boxRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    if (prefersReduced) return;
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <section id="hero">
      <div className="mx-auto flex min-h-[calc(100dvh-40px)] max-w-[1100px] items-center gap-16 px-6 pt-16">
        <div className="max-w-[600px] flex-1">
          <span className="section-label mb-5 inline-block rounded-full border border-stone-200 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#C7AC60] dark:border-stone-700">
            {t("heroBadge")}
          </span>
          <h1 className="hero-name text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">
            {t("heroName")}
          </h1>
          <p className="mt-8 max-w-[42ch] text-[clamp(0.9375rem,1.5vw,1.0625rem)] leading-relaxed text-stone-500">
            {t("heroTagline")}
          </p>
          <div className="mt-8 flex items-center gap-3">
            <a
              href="#projects"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#C7AC60] px-7 text-sm font-medium text-[#fafaf9] transition-all duration-300 hover:opacity-85 hover:-translate-y-0.5"
            >
              {t("heroCta")}
            </a>
            <a
              href="#contact"
              className="ms-3 inline-flex h-12 items-center gap-2 rounded-xl border border-[#C7AC60] px-7 text-sm font-medium text-[#C7AC60] transition-all duration-300 hover:bg-[#F5EDD0] hover:-translate-y-0.5"
            >
              {t("heroCtaOutline")}
            </a>
          </div>
        </div>
        <div className="hidden flex-1 items-center justify-center lg:flex">
          <div
            ref={boxRef}
            onPointerMove={handlePointer}
            onPointerLeave={handleLeave}
            className="relative w-full overflow-hidden rounded-xl shadow-[0_24px_48px_-12px_rgba(199,172,96,0.25)] touch-none"
            style={{
              aspectRatio: "4/5",
              transform: prefersReduced
                ? "none"
                : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: "box-shadow 0.3s ease-out",
            }}
          >
            <Image
              src="/Daniel.jpg"
              alt="Daniel"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 0px, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

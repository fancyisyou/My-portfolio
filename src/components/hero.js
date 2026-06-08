"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslation } from "./LanguageProvider";

export default function Hero() {
  const t = useTranslation();
  const boxRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-120, 120], [10, -10]);
  const rotateY = useTransform(mouseX, [-120, 120], [-10, 10]);

  function handlePointer(e) {
    if (prefersReduced) return;
    const rect = boxRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleLeave() {
    if (prefersReduced) return;
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section id="hero">
      <div className="mx-auto flex min-h-[calc(100dvh-40px)] max-w-[1100px] flex-col items-center gap-8 px-6 pt-16 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex w-full items-center justify-center lg:order-2 lg:flex-1">
          <motion.div
            ref={boxRef}
            onPointerMove={handlePointer}
            onPointerLeave={handleLeave}
            className="relative w-full max-w-[85vw] rounded-full touch-none shadow-[0_24px_48px_-12px_rgba(199,172,96,0.25)] sm:max-w-[380px] lg:max-w-[420px]"
            style={{
              aspectRatio: "1/1",
              transform: prefersReduced ? "none" : "perspective(1000px)",
              rotateX: prefersReduced ? 0 : rotateX,
              rotateY: prefersReduced ? 0 : rotateY,
              transition: "box-shadow 0.3s ease-out",
            }}
          >
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "conic-gradient(from var(--angle), #C7AC60, #C7AC60 40%, rgba(199,172,96,0.15) 45%, rgba(199,172,96,0.15) 55%, #C7AC60 60%, #C7AC60 100%)",
                filter: "blur(8px)",
                opacity: 0.5,
                animation: prefersReduced ? "none" : "spin-slow 4s linear infinite",
              }}
            />
            <div className="absolute inset-0 overflow-hidden rounded-full p-[2px] pointer-events-none">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from var(--angle), #C7AC60, #C7AC60 40%, rgba(199,172,96,0.15) 45%, rgba(199,172,96,0.15) 55%, #C7AC60 60%, #C7AC60 100%)",
                  animation: prefersReduced ? "none" : "spin-slow 4s linear infinite",
                }}
              />
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <Image
                  src="/Daniel.jpg"
                  alt="Daniel"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 639px) 85vw, (max-width: 1023px) 380px, 420px"
                />
              </div>
            </div>
          </motion.div>
        </div>
        <div className="max-w-[600px] lg:flex-1">
          <span className="section-label mb-5 inline-block rounded-full border border-[#C7AC60] px-3.5 py-1.5 font-mono font-semibold text-[12px] uppercase tracking-[0.18em] text-[#C7AC60]">
            {t("heroBadge")}
          </span>
          <h1 className="hero-name text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight">
            {t("heroName")}
          </h1>
          <p className="mt-8 max-w-[42ch] text-[clamp(1rem,1.5vw,1.0625rem)] leading-relaxed text-stone-500">
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
      </div>
    </section>
  );
}

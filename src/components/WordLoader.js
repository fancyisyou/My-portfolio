"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(useGSAP);

const words = [
  "Brand Identity", "Web Design", "Creative Direction",
  "Photography", "Content Strategy", "WordPress",
];

export default function WordLoader() {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  useGSAP(() => {
    if (prefersReduced) {
      const loader = document.getElementById("page-loader");
      if (loader) loader.classList.add("done");
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        const loader = document.getElementById("page-loader");
        if (loader) setTimeout(() => loader.classList.add("done"), 300);
      },
    });

    words.forEach((_, index) => {
      const startTime = index * 0.95;

      tl.fromTo(
        `.word-${index} .char`,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.03, ease: "power2.out" },
        startTime
      );

      tl.to(
        `.word-${index} .char`,
        { opacity: 0, y: -6, duration: 0.3, stagger: 0.03, ease: "power2.in" },
        startTime + 0.5
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-y-6">
      <div dir="ltr" className="relative h-14 flex items-center justify-center">
        {words.map((word, index) => (
          <span
            key={index}
            className={`word-${index} absolute text-xl sm:text-2xl tracking-wider font-bold flex gap-x-1 text-[#C7AC60]`}
          >
            {word.split("").map((char, charIndex) => (
              <span key={charIndex} className="char">
                {char}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

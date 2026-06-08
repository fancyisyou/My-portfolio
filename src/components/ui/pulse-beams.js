"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

function GradientColors({ colors }) {
  const c = colors || { start: "#18CCFC", middle: "#6344F5", end: "#AE48FF" };
  return (
    <>
      <stop offset="0%" stopColor={c.start} stopOpacity="0" />
      <stop offset="20%" stopColor={c.start} stopOpacity="1" />
      <stop offset="50%" stopColor={c.middle} stopOpacity="1" />
      <stop offset="100%" stopColor={c.end} stopOpacity="0" />
    </>
  );
}

function SVGs({ beams, width, height, baseColor, accentColor, gradientColors }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="proton-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {beams.map((beam, index) => (
          <motion.linearGradient
            key={index}
            id={`grad${index}`}
            gradientUnits="userSpaceOnUse"
            initial={beam.gradientConfig.initial}
            animate={beam.gradientConfig.animate}
            transition={beam.gradientConfig.transition}
          >
            <GradientColors colors={gradientColors} />
          </motion.linearGradient>
        ))}
      </defs>

      {beams.map((beam, index) => (
        <g key={index}>
          <path d={beam.path} stroke={baseColor} strokeWidth="1" />
          <path
            d={beam.path}
            stroke={`url(#grad${index})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {beam.connectionPoints?.map((point, pi) => (
            <circle
              key={pi}
              cx={point.cx}
              cy={point.cy}
              r={point.r}
              fill={baseColor}
              stroke={accentColor}
            />
          ))}
          {beam.proton && (
            <motion.circle
              r={beam.proton.r || 4}
              fill={beam.proton.color || "#fff"}
              filter="url(#proton-glow)"
              animate={{
                cx: beam.proton.cx,
                cy: beam.proton.cy,
              }}
              transition={{
                duration: beam.proton.duration || 4,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: beam.proton.repeatDelay || 0,
              }}
            />
          )}
        </g>
      ))}
    </svg>
  );
}

export function PulseBeams({
  children,
  className,
  background,
  beams,
  width = 858,
  height = 434,
  baseColor = "var(--stone-700)",
  accentColor = "var(--stone-500)",
  gradientColors,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden antialiased",
        className
      )}
    >
      {background}
      <div className="relative z-10 w-full">{children}</div>
      {!prefersReducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center">
          <SVGs
            beams={beams}
            width={width}
            height={height}
            baseColor={baseColor}
            accentColor={accentColor}
            gradientColors={gradientColors}
          />
        </div>
      )}
    </div>
  );
}

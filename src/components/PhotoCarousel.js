"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useReducedMotion, animate } from "motion/react";
import { useTranslation, useLanguage } from "./LanguageProvider";

const fallbackPhotos = [
  {
    url: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=800&fit=crop",
    title: "The Observer",
    desc: "Light through glass",
    pos: "50% 30%",
  },
  {
    url: "https://images.unsplash.com/photo-1518173946687-a33f2e0f1c0a?w=600&h=800&fit=crop",
    title: "Golden Hour",
    desc: "Warm light over still waters",
    pos: "50% 50%",
  },
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=800&fit=crop",
    title: "Wilderness",
    desc: "Untouched landscapes",
    pos: "50% 50%",
  },
  {
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=800&fit=crop",
    title: "City Pulse",
    desc: "Streets that tell stories",
    pos: "50% 50%",
  },
  {
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=800&fit=crop",
    title: "Summit",
    desc: "Above the clouds",
    pos: "50% 30%",
  },
  {
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=800&fit=crop",
    title: "Still Life",
    desc: "Texture in simplicity",
    pos: "50% 50%",
  },
  {
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=800&fit=crop",
    title: "Neon Nights",
    desc: "Urban after dark",
    pos: "50% 50%",
  },
  {
    url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&h=800&fit=crop",
    title: "Horizon",
    desc: "Where sky meets sea",
    pos: "50% 50%",
  },
  {
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop",
    title: "Presence",
    desc: "Portraits of character",
    pos: "50% 30%",
  },
  {
    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&h=800&fit=crop",
    title: "Solitude",
    desc: "Silence in the dunes",
    pos: "50% 50%",
  },
];

export default function PhotoCarousel({ photos: photosProp, onClose, onBack, categoryName }) {
  const photos = photosProp || fallbackPhotos;
  const t = useTranslation();
  const { lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const rotation = useMotionValue(0);
  const [frontIdx, setFrontIdx] = useState(0);
  const frontIdxRef = useRef(0);

  const n = photos.length;

  const updateFrontFromRotation = useCallback(() => {
    const deg = rotation.get();
    const norm = ((deg % 360) + 360) % 360;
    const idx = Math.round((norm / 360) * n) % n;
    if (idx !== frontIdxRef.current) {
      frontIdxRef.current = idx;
      setFrontIdx(idx);
    }
  }, [rotation, n]);

  useEffect(() => {
    if (!onClose) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") lang === "ar" ? handlePrev() : handleNext();
      if (e.key === "ArrowRight") lang === "ar" ? handleNext() : handlePrev();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const step = 360 / n;

  const handlePrev = () => {
    animate(rotation, rotation.get() + step, {
      type: "spring",
      stiffness: 200,
      damping: 25,
      onComplete: () => updateFrontFromRotation(),
    });
  };

  const handleNext = () => {
    animate(rotation, rotation.get() - step, {
      type: "spring",
      stiffness: 200,
      damping: 25,
      onComplete: () => updateFrontFromRotation(),
    });
  };

  if (reduceMotion) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 select-none">
        <div className="absolute start-4 end-4 top-4 z-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-white transition-colors hover:bg-[#C7AC60]"
              >
                {lang === "ar" ? "\u2192" : "\u2190"}
              </button>
            )}
            {categoryName && (
              <span className="hidden text-sm font-medium text-stone-400 sm:inline">
                {categoryName}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-white transition-colors hover:bg-[#C7AC60]"
          >
            ✕
          </button>
        </div>
        <div className="grid max-h-[80vh] max-w-5xl grid-cols-2 gap-4 overflow-y-auto p-6 md:grid-cols-3 lg:grid-cols-5">
          {photos.map((photo) => (
            <div key={photo.title} className="aspect-[3/4] overflow-hidden rounded-lg">
              <img
                src={photo.url}
                alt={photo.title}
                className="h-full w-full object-cover"
                style={{ objectPosition: photo.pos }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const w = 200;
  const h = 267;
  const radius = Math.max(340, (w * n) / (2 * Math.PI));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 select-none"
    >
      <div className="absolute start-4 end-4 top-4 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-white transition-colors hover:bg-[#C7AC60]"
              >
                {lang === "ar" ? "\u2192" : "\u2190"}
              </button>
            )}
            {categoryName && (
              <span className="hidden text-sm font-medium text-stone-400 sm:inline">
                {categoryName}
              </span>
            )}
          </div>
          <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-white transition-colors hover:bg-[#C7AC60]"
        >
          ✕
        </button>
      </div>

      <button
        onClick={lang === "ar" ? handleNext : handlePrev}
        className="absolute start-6 top-1/2 z-30 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900/70 text-2xl text-white/80 transition-all duration-300 hover:bg-[#C7AC60] hover:text-white hover:shadow-[0_0_25px_rgba(199,172,96,0.3)] md:flex"
      >
        {lang === "ar" ? "\u203A" : "\u2039"}
      </button>

      <button
        onClick={lang === "ar" ? handlePrev : handleNext}
        className="absolute end-6 top-1/2 z-30 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900/70 text-2xl text-white/80 transition-all duration-300 hover:bg-[#C7AC60] hover:text-white hover:shadow-[0_0_25px_rgba(199,172,96,0.3)] md:flex"
      >
        {lang === "ar" ? "\u2039" : "\u203A"}
      </button>

      <div
        className="relative"
        style={{
          perspective: "1100px",
          width: 0,
          height: 0,
        }}
      >
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotation,
          }}
        >
          {photos.map((photo, i) => {
            const angle = (i / n) * 360;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: w,
                  height: h,
                  left: -w / 2,
                  top: -h / 2,
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
                }}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="pointer-events-none"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: photo.pos,
                  }}
                  loading="lazy"
                />
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-6 md:hidden">
        <button
          onClick={lang === "ar" ? handleNext : handlePrev}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-900/70 text-xl text-white/80 transition-all duration-300 hover:bg-[#C7AC60] hover:text-white hover:shadow-[0_0_25px_rgba(199,172,96,0.3)]"
        >
          {lang === "ar" ? "\u203A" : "\u2039"}
        </button>
        <button
          onClick={lang === "ar" ? handlePrev : handleNext}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-900/70 text-xl text-white/80 transition-all duration-300 hover:bg-[#C7AC60] hover:text-white hover:shadow-[0_0_25px_rgba(199,172,96,0.3)]"
        >
          {lang === "ar" ? "\u2039" : "\u203A"}
        </button>
      </div>

    </motion.div>
  );
}

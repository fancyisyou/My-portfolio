"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation, useLanguage } from "./LanguageProvider";
import categories from "@/lib/photography-data";
import PhotoCarousel from "./PhotoCarousel";

export default function CategoryGrid({ onClose }) {
  const t = useTranslation();
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        if (selectedCategory) setSelectedCategory(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selectedCategory, onClose]);

  return (
    <>
      <AnimatePresence>
        {!selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99999] flex flex-col bg-black/95 px-6 max-sm:py-4 py-8"
          >
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
              <h2 className="text-xl font-semibold text-white/90">
                {t("categoryGridTitle")}
              </h2>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-800 text-white transition-colors hover:bg-[#C7AC60]"
              >
                ✕
              </button>
            </div>

            <div className="mx-auto mt-10 grid w-full max-w-5xl flex-1 grid-cols-2 justify-items-center gap-5 max-sm:mt-4 max-sm:gap-3 lg:grid-cols-3 content-center">
              {categories.map((cat, i) => (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  onClick={() => setSelectedCategory(cat)}
                  className="group flex max-sm:aspect-square aspect-[3/2] w-full max-sm:max-w-44 max-w-60 flex-col items-center justify-center rounded-xl border border-stone-700/60 bg-stone-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-[#C7AC60] hover:shadow-[0_0_30px_rgba(199,172,96,0.15)]"
                >
                  <span className="max-sm:text-lg text-2xl font-semibold text-white/90 transition-colors duration-300 group-hover:text-[#C7AC60]">
                    {lang === "ar" ? cat.nameAr : cat.nameEn}
                  </span>
                  <span className="mt-2 text-[10px] text-stone-600">
                    {t("categoryPhotos").replace("{count}", cat.photos.length)}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedCategory && (
          <PhotoCarousel
            photos={selectedCategory.photos}
            categoryName={lang === "ar" ? selectedCategory.nameAr : selectedCategory.nameEn}
            onBack={() => setSelectedCategory(null)}
            onClose={onClose}
          />
        )}
      </AnimatePresence>
    </>
  );
}

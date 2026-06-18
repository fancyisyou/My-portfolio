"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "./LanguageProvider";
import CategoryGrid from "./CategoryGrid";
import PhotoCarousel from "./PhotoCarousel";

const projects = [
  {
    titleKey: "proj1Title",
    descKey: "proj1Desc",
    img: "/lumina/logo-01.jpg",
    tags: ["tagBrandIdentity", "tagPrintDesign"],
    images: [
      "/lumina/logo-01.jpg",
      "/lumina/logo-02.jpg",
      "/lumina/logo-03.jpg",
      "/lumina/logo-04.jpg",
      "/lumina/logo-05.jpg",
      "/lumina/logo-06.jpg",
      "/lumina/logo-07.jpg",
      "/lumina/logo-08.jpg",
      "/lumina/logo-09.jpg",
      "/lumina/logo-10.jpg",
    ],
  },
  {
    titleKey: "proj4Title",
    descKey: "proj4Desc",
    img: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=375&fit=crop",
    tags: ["tagStillLife", "tagEditorial"],
    images: [
      "https://picsum.photos/seed/proj4-g1/800/600",
      "https://picsum.photos/seed/proj4-g2/800/600",
      "https://picsum.photos/seed/proj4-g3/800/600",
      "https://picsum.photos/seed/proj4-g4/800/600",
    ],
  },
  {
    titleKey: "proj5Title",
    descKey: "proj5Desc",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=375&fit=crop",
    tags: ["tagUIUX", "tagResponsive"],
    images: [
      "https://picsum.photos/seed/proj5-g1/800/600",
      "https://picsum.photos/seed/proj5-g2/800/600",
      "https://picsum.photos/seed/proj5-g3/800/600",
      "https://picsum.photos/seed/proj5-g4/800/600",
    ],
  },
];

export default function Projects() {
  const t = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [categoryGridOpen, setCategoryGridOpen] = useState(false);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selectedProject]);

  return (
    <section id="projects">
      <div className="mx-auto max-w-[1100px] px-6 pt-28 pb-28">
        <p className="section-label mb-3 inline-block rounded-full border border-[#C7AC60] px-3.5 py-1.5 font-mono font-semibold text-[12px] uppercase tracking-[0.18em] text-stone-400">
          {t("projectsLabel")}
        </p>
        <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-tight tracking-tight">
          {t("projectsTitle")}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const isPhotography = project.titleKey === "proj4Title";
            const Card = (
              <motion.div
                key={project.titleKey}
                initial={{ y: 24 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => isPhotography ? setCategoryGridOpen(true) : setSelectedProject(project)}
                className="group overflow-hidden rounded-xl border border-[#C7AC60]/30 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#C7AC60] hover:shadow-xl dark:bg-transparent"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={project.img}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="bg-white px-5 py-4 dark:bg-transparent">
                  <h3 className="text-base font-semibold">
                    {t(project.titleKey)}
                  </h3>
                  <p className="mb-3 text-[13px] leading-relaxed text-stone-500">
                    {t(project.descKey)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag + project.titleKey}
                        className="rounded-md border border-[#C7AC60]/30 bg-transparent px-2 py-0.5 font-mono font-semibold text-[12px] tracking-wide text-[#C7AC60]"
                      >
                        {t(tag)}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );

            return Card;
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && selectedProject.titleKey !== "proj1Title" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[99999] flex items-start justify-center overflow-y-auto bg-black/70 p-4 pt-16 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl rounded-2xl border border-[#C7AC60]/20 bg-white p-6 shadow-2xl dark:bg-stone-900 dark:border-stone-700"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute end-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-stone-200 text-sm text-stone-500 transition-colors hover:bg-[#C7AC60] hover:text-white dark:bg-stone-700 dark:text-stone-400 dark:hover:bg-[#C7AC60]"
              >
                ✕
              </button>

              <h3 className="mb-1 pe-10 text-xl font-semibold">
                {t(selectedProject.titleKey)}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-stone-500">
                {t(selectedProject.descKey)}
              </p>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {selectedProject.images.map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    className="aspect-[4/3] w-full rounded-lg object-cover shadow-md transition-transform duration-300 hover:scale-[1.02]"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && selectedProject.titleKey === "proj1Title" && (
          <PhotoCarousel
            photos={selectedProject.images.map((src, i) => ({
              url: src,
              title: `Lumina ${i + 1}`,
              desc: "Visual Identity",
              pos: "50% 50%",
            }))}
            categoryName={t(selectedProject.titleKey)}
            onClose={() => setSelectedProject(null)}
            onBack={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {categoryGridOpen && (
          <CategoryGrid onClose={() => setCategoryGridOpen(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

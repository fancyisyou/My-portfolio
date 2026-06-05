"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "./LanguageProvider";

const projects = [
  {
    titleKey: "proj1Title",
    descKey: "proj1Desc",
    img: "https://picsum.photos/seed/amara-brand/600/375",
    tags: ["Brand Identity"],
    category: "Graphic Design",
  },
  {
    titleKey: "proj2Title",
    descKey: "proj2Desc",
    img: "https://picsum.photos/seed/form-journal/600/375",
    tags: ["Art Direction"],
    category: "Graphic Design",
  },
  {
    titleKey: "proj3Title",
    descKey: "proj3Desc",
    img: "https://picsum.photos/seed/pixel-studios/600/375",
    tags: ["Strategy"],
    category: "Creative Consultancy",
  },
  {
    titleKey: "proj4Title",
    descKey: "proj4Desc",
    img: "https://picsum.photos/seed/design-sprint/600/375",
    tags: ["Workshop"],
    category: "Creative Consultancy",
  },
  {
    titleKey: "proj5Title",
    descKey: "proj5Desc",
    img: "https://picsum.photos/seed/nova-launch/600/375",
    tags: ["Campaign"],
    category: "Creative Direction",
  },
  {
    titleKey: "proj6Title",
    descKey: "proj6Desc",
    img: "https://picsum.photos/seed/onda-brand/600/375",
    tags: ["Visual Identity"],
    category: "Creative Direction",
  },
  {
    titleKey: "proj7Title",
    descKey: "proj7Desc",
    img: "https://picsum.photos/seed/craft-series/600/375",
    tags: ["Still Life"],
    category: "Photography",
  },
  {
    titleKey: "proj8Title",
    descKey: "proj8Desc",
    img: "https://picsum.photos/seed/faces-lisbon/600/375",
    tags: ["Portrait"],
    category: "Photography",
  },
  {
    titleKey: "proj9Title",
    descKey: "proj9Desc",
    img: "https://picsum.photos/seed/salesflow/600/375",
    tags: ["CRM", "Dashboard"],
    category: "CRM & LMS",
  },
  {
    titleKey: "proj10Title",
    descKey: "proj10Desc",
    img: "https://picsum.photos/seed/edupath/600/375",
    tags: ["LMS", "Product Design"],
    category: "CRM & LMS",
  },
  {
    titleKey: "proj11Title",
    descKey: "proj11Desc",
    img: "https://picsum.photos/seed/greenfuture/600/375",
    tags: ["Press Kit"],
    category: "Public Relations",
  },
  {
    titleKey: "proj12Title",
    descKey: "proj12Desc",
    img: "https://picsum.photos/seed/tech-summit/600/375",
    tags: ["Event", "PR"],
    category: "Public Relations",
  },
];

const filters = [
  "All",
  "Graphic Design",
  "Creative Consultancy",
  "Creative Direction",
  "Photography",
  "CRM & LMS",
  "Public Relations",
];

export default function Projects() {
  const t = useTranslation();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  return (
    <section id="projects">
      <div className="mx-auto max-w-[1100px] px-6 py-28">
        <p className="section-label mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400">
          {t("projectsLabel")}
        </p>
        <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-tight tracking-tight">
          {t("projectsTitle")}
        </h2>

        <div className="mt-8 mb-[-8px] flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`filter-label rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-wide whitespace-nowrap transition-all duration-300 ${
                activeFilter === filter
                  ? "border-[#C7AC60] bg-[#C7AC60] text-[#fafaf9]"
                  : "border-stone-200 bg-transparent text-stone-400 hover:border-[#C7AC60] hover:text-[#C7AC60] dark:border-stone-700"
              }`}
            >
              {t("filter" + filter.replace(/\s+/g, ""))}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.titleKey}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden rounded-xl border border-stone-200 bg-stone-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-stone-700 dark:bg-stone-900/50"
              >
                <img
                  src={project.img}
                  alt=""
                  className="aspect-[16/10] w-full border-b border-stone-200 object-cover dark:border-stone-700"
                />
                <div className="px-5 py-4">
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
                        className="rounded-md bg-stone-200 px-2 py-0.5 font-mono text-[10px] tracking-wide text-stone-500 dark:bg-stone-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

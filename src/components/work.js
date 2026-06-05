"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

const projects = [
  {
    title: "Marrow",
    role: "Design & Development",
    description:
      "A premium cookware brand reimagined from the surface up. Product showcase, material storytelling, and a high-fidelity shopping experience.",
    tags: ["Next.js", "CSS", "Tailwind"],
    image: "https://picsum.photos/seed/marrow-kitchen/1200/800",
    href: "#",
  },
  {
    title: "Linear",
    role: "Front-end Engineering",
    description:
      "Contributed to the design system and marketing site for a project management platform used by thousands of engineering teams.",
    tags: ["React", "Radix UI", "CSS"],
    image: "https://picsum.photos/seed/linear-dashboard/1200/800",
    href: "#",
  },
];

function useOnScreen(ref) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);

  return (
    <a
      href={project.href}
      ref={ref}
      className={`group block transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="group relative overflow-hidden rounded-lg">
        <div className="aspect-[3/2] w-full bg-stone-200 dark:bg-stone-800">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-stone-900/5 dark:ring-stone-100/5" />
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
          <ArrowUpRight
            weight="bold"
            size={18}
            className="text-stone-400 transition-colors group-hover:text-stone-900 dark:group-hover:text-stone-100"
          />
        </div>
        <p className="mt-1 text-sm font-medium text-stone-400">{project.role}</p>
        <p className="mt-3 max-w-[50ch] leading-relaxed text-stone-500">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-stone-100 px-3 py-1 font-mono text-[11px] text-stone-500 dark:bg-stone-800 dark:text-stone-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function Work() {
  return (
    <section id="work" className="px-6 py-32 lg:px-16">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Selected work
        </h2>
        <p className="mt-3 max-w-[50ch] text-lg leading-relaxed text-stone-500">
          A selection of projects where I had a hand in shaping the product
          experience and the code that powers it.
        </p>
        <div className="mt-16 grid gap-24 md:grid-cols-2 md:gap-12 lg:gap-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

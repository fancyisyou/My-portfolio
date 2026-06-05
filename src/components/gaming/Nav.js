"use client";

import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageProvider";

const linkKeys = [
  { href: "#roster", key: "nav.roster" },
  { href: "#achievements", key: "nav.achievements" },
  { href: "#contact", key: "nav.contact" },
];

export default function Nav() {
  const { lang, t, dir, toggle } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      dir={dir}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-zinc-950/80 shadow-lg shadow-cyan-500/5 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="group flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-cyan-500/20 text-sm font-bold text-cyan-400 ring-1 ring-cyan-500/30 transition-all duration-300 group-hover:bg-cyan-500/30 group-hover:ring-cyan-400/50">
            A
          </span>
          <span className="text-lg font-bold tracking-widest text-white">
            ANVAR
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {linkKeys.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-4 py-2 text-sm font-medium tracking-wide text-zinc-400 transition-all duration-300 hover:bg-white/5 hover:text-cyan-400"
            >
              {t(link.key)}
            </a>
          ))}
          <a
            href="#contact"
            className="ms-4 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold tracking-wide text-cyan-400 transition-all duration-300 hover:bg-cyan-500/20 hover:shadow-[0_0_16px_rgba(0,229,255,0.15)]"
          >
            {t("nav.joinUs")}
          </a>
          <button
            onClick={toggle}
            className="ms-2 rounded-md border border-white/10 px-3 py-2 text-xs font-mono font-medium tracking-wider text-zinc-500 transition-all duration-300 hover:border-cyan-500/30 hover:text-cyan-400"
          >
            {lang === "en" ? "AR" : "EN"}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            className="rounded-md border border-white/10 px-3 py-1.5 text-[10px] font-mono font-medium tracking-wider text-zinc-500 transition-all duration-300 hover:border-cyan-500/30 hover:text-cyan-400"
          >
            {lang === "en" ? "AR" : "EN"}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/5 bg-zinc-950/95 backdrop-blur-2xl md:hidden">
          <div className="space-y-1 px-6 py-4">
            {linkKeys.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-cyan-400"
              >
                {t(link.key)}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-md border border-cyan-500/30 bg-cyan-500/10 px-3 py-3 text-center text-sm font-semibold text-cyan-400"
            >
              {t("nav.joinUs")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

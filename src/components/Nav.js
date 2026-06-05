"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTranslation, useLanguage } from "./LanguageProvider";
import { useTheme } from "./ThemeProvider";

export default function Nav() {
  const t = useTranslation();
  const { theme, toggle } = useTheme();
  const { lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);
    const handleKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    if (menuOpen) document.addEventListener("keydown", handleKey);
    return () => {
      document.body.classList.remove("no-scroll");
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  const links = [
    { href: "#hero", key: "navHome" },
    { href: "#about", key: "navAbout" },
    { href: "#experience", key: "navExp" },
    { href: "#skills", key: "navSkills" },
    { href: "#projects", key: "navProjects" },
    { href: "#contact", key: "navContact" },
  ];

  if (!mounted) return null;

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-[100] flex h-16 items-center justify-center">
        <div
          className={`mx-auto flex items-center justify-center w-full max-w-[1100px] p-[10px] transition-all duration-700 ease-out ${
            scrolled
              ? "gap-x-6 rounded-full border border-stone-200/30 bg-stone-50/65 shadow-[0_4px_24px_rgba(199,172,96,0.2)] backdrop-blur-xl saturate-180 dark:border-stone-700/30 dark:bg-stone-950/65"
              : ""
          }`}
        >
          <a href="#hero" className="flex shrink-0 items-center">
            <img
              src="/logo.png"
              alt="Daniel"
              className={`h-8 w-auto transition-all duration-700 ease-out ${
                scrolled ? "h-6" : ""
               }`}
             />
           </a>
           <div
             className={`shrink-0 transition-all duration-700 ease-out ${
               scrolled ? "max-w-0 overflow-hidden" : "grow basis-0"
             }`}
           />
           <div
             className={`flex items-center gap-4 transition-all duration-700 ease-out ${
               scrolled ? "" : "ms-6"
             }`}
          >
            <ul className="hidden items-center gap-6 md:flex">
              {links.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className={`group relative text-stone-500 no-underline transition-colors duration-300 hover:text-[#C7AC60] dark:text-stone-400 dark:hover:text-[#C7AC60] ${
                      scrolled ? "text-xs" : "text-sm"
                    }`}
                  >
                    {t(link.key)}
                    <span className="absolute -bottom-0.5 start-0 h-0.5 w-0 bg-[#C7AC60] transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="relative flex items-center rounded-full bg-stone-100 p-0.5 dark:bg-stone-800" dir="ltr">
              <motion.div
                className="absolute inset-y-0.5 w-[calc(50%-2px)] rounded-full bg-[#C7AC60]"
                animate={{ x: lang === "ar" ? "100%" : "0%" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
              <button
                onClick={() => setLang("en")}
                className="relative z-10 px-2.5 py-1 text-xs font-medium text-white"
              >
                EN
              </button>
              <button
                onClick={() => setLang("ar")}
                className="relative z-10 px-2.5 py-1 text-xs font-medium text-white"
              >
                AR
              </button>
            </div>

            <button
              onClick={toggle}
              className="flex items-center border-none bg-transparent p-1"
              aria-label="Toggle theme"
            >
              <svg
                viewBox="0 0 24 24"
                fill="#C7AC60"
                className={`transition-all duration-700 ease-out ${
                  scrolled ? "h-3.5 w-3.5" : "h-4 w-4"
                }`}
              >
                {theme === "dark" ? (
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
                ) : (
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                )}
              </svg>
            </button>

            <button
              className="flex flex-col gap-1 border-none bg-transparent p-1 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span
                className={`block h-0.5 rounded bg-stone-900 transition-all duration-300 dark:bg-stone-100 ${
                  menuOpen ? "w-[22px] translate-y-[7px] rotate-45" : "w-[22px]"
                }`}
              />
              <span
                className={`block h-0.5 rounded bg-stone-900 transition-all duration-300 dark:bg-stone-100 ${
                  menuOpen ? "w-[22px] opacity-0" : "w-[22px]"
                }`}
              />
              <span
                className={`block h-0.5 rounded bg-stone-900 transition-all duration-300 dark:bg-stone-100 ${
                  menuOpen
                    ? "w-[22px] -translate-y-[7px] -rotate-45"
                    : "w-[22px]"
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[10000] bg-black/45 transition-opacity duration-300 ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <ul
        className={`fixed end-0 top-16 z-[10001] flex bottom-0 w-[75vw] max-w-[280px] list-none flex-col gap-5 border-s border-stone-200 bg-stone-50/96 px-6 pb-6 pt-6 shadow-xl backdrop-blur-xl saturate-180 transition-transform duration-300 dark:border-stone-700 dark:bg-stone-950/96 rtl:shadow-[6px_0_32px_rgba(0,0,0,0.2)] md:hidden ${
          menuOpen ? "translate-x-0 rtl:translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
      >
        {links.map((link) => (
          <li key={link.key}>
            <a
              href={link.href}
              className="text-stone-600 no-underline transition-colors hover:text-[#C7AC60] dark:text-stone-400 dark:hover:text-[#C7AC60]"
              onClick={() => setMenuOpen(false)}
            >
              {t(link.key)}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

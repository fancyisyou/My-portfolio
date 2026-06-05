"use client";

import {
  DiscordLogo,
  TwitchLogo,
  YoutubeLogo,
  XLogo,
} from "@phosphor-icons/react";
import { useLanguage } from "./LanguageProvider";

const socials = [
  { icon: DiscordLogo, href: "#", label: "Discord" },
  { icon: TwitchLogo, href: "#", label: "Twitch" },
  { icon: YoutubeLogo, href: "#", label: "YouTube" },
  { icon: XLogo, href: "#", label: "X" },
];

export default function Footer() {
  const { lang, t, dir } = useLanguage();

  return (
    <footer
      id="contact"
      dir={dir}
      className="relative border-t border-white/5 bg-zinc-950 py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <a href="#" className="group flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded bg-cyan-500/20 text-lg font-bold text-cyan-400 ring-1 ring-cyan-500/30 transition-all duration-300 group-hover:bg-cyan-500/30 group-hover:ring-cyan-400/50">
              A
            </span>
            <span className="text-xl font-bold tracking-widest text-white">
              ANVAR
            </span>
          </a>

          <p className={`max-w-md text-sm leading-relaxed text-zinc-500 ${lang === "ar" ? "font-arabic leading-[1.8]" : ""}`}>
            {t("footer.description")}
          </p>

          <div className="flex gap-3">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/5 text-zinc-500 transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-cyan-400"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono uppercase tracking-[0.15em] text-zinc-700">
            <span className={lang === "ar" ? "font-arabic tracking-normal" : ""}>
              {t("footer.brand")}
            </span>
            <span className="h-3 w-px bg-zinc-800" />
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useTranslation } from "./LanguageProvider";

export default function Footer() {
  const t = useTranslation();

  return (
    <footer className="border-t border-stone-200 px-6 py-10 text-center text-xs text-stone-400 dark:border-stone-700">
      {t("footer")}
    </footer>
  );
}

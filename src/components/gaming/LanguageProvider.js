"use client";

import { createContext, useContext, useState, useCallback } from "react";
import translations from "./translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  const toggle = useCallback(() => {
    setLang((l) => (l === "en" ? "ar" : "en"));
  }, []);

  const t = useCallback(
    (path) => {
      const keys = path.split(".");
      const result = keys.reduce(
        (obj, key) => (obj != null ? obj[key] : undefined),
        translations[lang],
      );
      return result ?? path;
    },
    [lang],
  );

  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ lang, toggle, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

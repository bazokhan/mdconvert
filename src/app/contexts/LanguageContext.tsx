"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Language } from "../i18n/config";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const countryToLang: Record<string, Language> = {
  // English
  US: "en", GB: "en", CA: "en", AU: "en", NZ: "en", IE: "en", ZA: "en",
  // Chinese
  CN: "zh", HK: "zh", TW: "zh", SG: "zh",
  // Hindi
  IN: "hi",
  // French
  FR: "fr", BE: "fr", CH: "fr", MC: "fr", SN: "fr", LU: "fr",
  // German
  DE: "de", AT: "de",
  // Spanish
  ES: "es", AR: "es", CO: "es", EC: "es", CL: "es", PE: "es", MX: "es", VE: "es",
  // Portuguese
  PT: "pt", BR: "pt",
  // Urdu
  PK: "ur",
  // Persian
  IR: "fa", AF: "fa",
  // Arabic
  SA: "ar", EG: "ar", AE: "ar", DZ: "ar", BH: "ar", IQ: "ar", JO: "ar",
  KW: "ar", LB: "ar", LY: "ar", MA: "ar", OM: "ar", QA: "ar", SY: "ar",
  TN: "ar", YE: "ar",
  // Russian
  RU: "ru", BY: "ru", KZ: "ru", KG: "ru", UA: "ru",
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    document.cookie = `NEXT_LOCALE=${lang};path=/;max-age=31536000`;
    window.location.reload(); // Force server rerender
  };

  useEffect(() => {
    const storedLang = document.cookie.match(
      /NEXT_LOCALE=([^;]+)/
    )?.[1] as Language;
    if (storedLang) {
      setLanguage(storedLang);
      return;
    }

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const detectedLang = countryToLang[data.country_code] || "en";
        setLanguage(detectedLang);
        localStorage.setItem("preferred-language", detectedLang);
      })
      .catch(() => {
        setLanguage("en");
      });
  }, []);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleLanguageChange }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
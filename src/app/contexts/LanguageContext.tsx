"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Language } from "../utils/getTranslations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    document.cookie = `NEXT_LOCALE=${lang};path=/;max-age=31536000`;
    window.location.reload(); // Force server rerender
  };

  useEffect(() => {
    // Get language from cookie or detect from browser
    const storedLang = document.cookie.match(
      /NEXT_LOCALE=([^;]+)/
    )?.[1] as Language;
    if (storedLang) {
      setLanguage(storedLang);
      return;
    }

    // Detect user's location and set default language
    // We support 9 languages for now: en, zh, hi, fr, es, pt, ur, fa, ar
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const countryToLang: Record<string, Language> = {
          // English countries
          US: "en",
          GB: "en",
          CA: "en",
          AU: "en",
          NZ: "en",
          // Chinese countries
          CN: "zh",
          HK: "zh",
          // Hindi countries
          IN: "hi",
          // French countries
          FR: "fr",
          BE: "fr",
          CH: "fr",
          MC: "fr",
          SN: "fr",
          // Spanish countries
          ES: "es",
          AR: "es",
          CO: "es",
          EC: "es",
          CL: "es",
          PE: "es",
          // Portuguese countries
          PT: "pt",
          BR: "pt",
          // Urdu countries
          PK: "ur",
          // Persian countries
          IR: "fa",
          AF: "fa",
          // Arab countries
          SA: "ar",
          EG: "ar",
          AE: "ar",
          DZ: "ar",
          BH: "ar",
          IQ: "ar",
          JO: "ar",
          KW: "ar",
          LB: "ar",
          LY: "ar",
          MA: "ar",
          OM: "ar",
          QA: "ar",
          SY: "ar",
          TN: "ar",
          // Default to English if no match
          default: "en",
        };

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

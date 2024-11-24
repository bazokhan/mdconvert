"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";

export function TranslatedHeader() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        {t.title}
      </h1>
      <p className="text-center text-lg mb-8 text-secondary max-w-2xl mx-auto">
        {t.subtitle}
      </p>
    </>
  );
}

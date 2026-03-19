"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";

export function TranslatedHeader() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <header className="mb-10 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {t.title}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg">
        {t.subtitle}
      </p>
    </header>
  );
}

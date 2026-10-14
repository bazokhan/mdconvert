"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";
import {
  CommandLineIcon,
  EyeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";

export function TranslatedHeader() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  const trustChips = [
    { icon: <PencilSquareIcon className="h-4 w-4" strokeWidth={1.75} />, label: t.buttons.editor },
    { icon: <EyeIcon className="h-4 w-4" strokeWidth={1.75} />, label: t.buttons.preview },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 pt-12 pb-8 sm:px-6 sm:pt-20 sm:pb-12 lg:px-8 lg:pt-28">
      <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="animate-fade-up">
          <p className="text-eyebrow">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-glow" />
              {t.brand} · {t.faq.isThisConverterReallyFree}
            </span>
          </p>
          <h1 className="text-display-1 mt-4 text-foreground">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {t.hero.subtitle}
          </p>
        </div>

        <div className="animate-fade-up delay-2 hidden flex-col gap-2.5 lg:flex">
          {trustChips.map((chip) => (
            <div
              key={chip.label}
              className="surface flex items-center gap-3 px-4 py-3"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">
                {chip.icon}
              </span>
              <span className="text-sm text-foreground-soft">{chip.label}</span>
            </div>
          ))}
          <div className="surface flex items-center gap-3 px-4 py-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary">
              <CommandLineIcon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="text-sm text-foreground-soft">
              {t.shortcuts.title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

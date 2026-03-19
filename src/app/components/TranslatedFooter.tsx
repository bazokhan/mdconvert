"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { createMailtoLink } from "../utils/contact";
import { getTranslations } from "../utils/getTranslations";

export function TranslatedFooter() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <footer className="border-t border-border bg-surface/30 py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted sm:flex-row sm:gap-4">
          <span>{t.footer.description}</span>
          <span className="hidden sm:inline">·</span>
          <a
            href="https://trugraph.io"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            {t.footer.developedBy}
          </a>
          <span className="hidden sm:inline">·</span>
          <a href={createMailtoLink("bug")} className="transition-colors hover:text-foreground">
            {t.buttons.reportBug}
          </a>
          <span className="hidden sm:inline">·</span>
          <a href={createMailtoLink("feature")} className="transition-colors hover:text-foreground">
            {t.buttons.requestFeature}
          </a>
        </div>
      </div>
    </footer>
  );
}

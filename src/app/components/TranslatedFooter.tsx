"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { createMailtoLink } from "../utils/contact";
import { getTranslations } from "../utils/getTranslations";

export function TranslatedFooter() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <footer className="mt-16 py-8 bg-secondary/5">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6 text-secondary">
          <p className="mb-4">{t.footer.description}</p>
        </div>

        {/* Attribution */}
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-secondary/80">
          <a
            href="https://trugraph.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            {t.footer.developedBy}
          </a>
          <div className="flex items-center gap-4">
            <a
              href={createMailtoLink("bug")}
              className="hover:text-primary transition-colors"
            >
              {t.buttons.reportBug}
            </a>
            <span>•</span>
            <a
              href={createMailtoLink("feature")}
              className="hover:text-primary transition-colors"
            >
              {t.buttons.requestFeature}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { createMailtoLink, TRUGRAPH_URL, BRAND_NAME } from "../utils/contact";
import { getTranslations } from "../utils/getTranslations";
import { LogoMark } from "./LogoMark";

export function TranslatedFooter() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background">
                <LogoMark className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-foreground">{BRAND_NAME}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:gap-x-12">
            <a
              href={TRUGRAPH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              {t.footer.developedBy}
            </a>
            <a
              href={TRUGRAPH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-foreground"
            >
              {t.buttons.otherTools}
            </a>
            <a
              href={createMailtoLink("bug")}
              className="text-muted transition-colors hover:text-foreground"
            >
              {t.buttons.reportBug}
            </a>
            <a
              href={createMailtoLink("feature")}
              className="text-muted transition-colors hover:text-foreground"
            >
              {t.buttons.requestFeature}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-faint">
            © {new Date().getFullYear()} {BRAND_NAME}
          </p>
          <p className="font-mono text-xs text-faint">
            markdown.trugraph.io
          </p>
        </div>
      </div>
    </footer>
  );
}

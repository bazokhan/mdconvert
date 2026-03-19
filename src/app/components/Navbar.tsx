"use client";

import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { ExamplesMenu } from "./ExamplesMenu";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";
import { CommandLineIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const SHOW_SHORTCUTS_EVENT = "mdconvert:showShortcuts";

export function Navbar() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  const onSelectExample = (markdown: string) => {
    const converter = document.querySelector("[data-markdown-converter]");
    if (converter) {
      converter.dispatchEvent(
        new CustomEvent("setMarkdown", { detail: markdown })
      );
    }
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-xl supports-[backdrop-filter]:bg-surface/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-muted/10"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <CommandLineIcon className="h-5 w-5 text-primary" strokeWidth={2} />
              <span className="font-mono text-sm font-semibold tracking-tight text-foreground">
                md2docx
              </span>
            </a>
            <ExamplesMenu onSelectExample={onSelectExample} />
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() =>
                document.dispatchEvent(new CustomEvent(SHOW_SHORTCUTS_EVENT))
              }
              className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-muted/10 hover:text-foreground"
              aria-label={t.shortcuts.showShortcuts}
            >
              <QuestionMarkCircleIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{t.shortcuts.forShortcuts}</span>
            </button>
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

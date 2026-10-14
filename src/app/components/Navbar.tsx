"use client";

import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { ExamplesMenu } from "./ExamplesMenu";
import { LogoMark } from "./LogoMark";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

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
    <header className="sticky top-0 z-40">
      <div className="glass">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group flex items-center gap-2 rounded-md p-1 transition-opacity hover:opacity-80"
              aria-label={t.brand}
            >
              <span className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background transition-transform group-hover:rotate-[-4deg]">
                <LogoMark className="h-4 w-4" />
              </span>
              <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline">
                {t.brand}
              </span>
            </a>
            <span className="hidden h-4 w-px bg-border sm:block" aria-hidden />
            <ExamplesMenu onSelectExample={onSelectExample} />
          </div>
          <div className="flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() =>
                document.dispatchEvent(new CustomEvent(SHOW_SHORTCUTS_EVENT))
              }
              className="flex h-9 items-center gap-1.5 rounded-md px-2 text-sm text-muted transition-colors hover:bg-muted/10 hover:text-foreground sm:px-2.5"
              aria-label={t.shortcuts.showShortcuts}
            >
              <QuestionMarkCircleIcon className="h-4 w-4" strokeWidth={1.5} />
              <kbd className="hidden rounded border border-border bg-surface px-1 font-mono text-[10px] text-muted sm:inline">
                ?
              </kbd>
            </button>
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { ExamplesMenu } from "./ExamplesMenu";

export function Navbar() {
  const onSelectExample = (markdown: string) => {
    const converter = document.querySelector("[data-markdown-converter]");
    if (converter) {
      converter.dispatchEvent(
        new CustomEvent("setMarkdown", { detail: markdown })
      );
    }
  };

  return (
    <nav className="border-b border-secondary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <ExamplesMenu onSelectExample={onSelectExample} />
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

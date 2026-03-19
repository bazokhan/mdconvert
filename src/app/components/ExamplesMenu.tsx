"use client";

import { useState, useEffect, useRef } from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { markdownExamples } from "../utils/markdownExamples";
import type { MarkdownExample } from "../utils/markdownExamples";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";

export const OPEN_EXAMPLES_EVENT = "mdconvert:openExamples";

interface ExamplesMenuProps {
  onSelectExample: (markdown: string) => void;
}

export function ExamplesMenu({ onSelectExample }: ExamplesMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const t = getTranslations(language);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    document.addEventListener(OPEN_EXAMPLES_EVENT, handler);
    return () => document.removeEventListener(OPEN_EXAMPLES_EVENT, handler);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const handleExampleSelect = (example: MarkdownExample) => {
    onSelectExample(example.markdown);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/10"
      >
        <DocumentTextIcon className="h-4 w-4" strokeWidth={1.5} />
        <span>{t.buttons.examples}</span>
        <ChevronDownIcon
          className={`h-4 w-4 opacity-60 transition-transform ${isOpen ? "rotate-180" : ""}`}
          strokeWidth={1.5}
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 z-50 mt-1.5 w-72 origin-top-left rounded-lg bg-surface py-1 shadow-soft-lg ring-1 ring-border">
          <div className="max-h-80 overflow-y-auto">
            {markdownExamples.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleSelect(example)}
                className="flex w-full flex-col gap-0.5 px-3 py-2.5 text-left transition-colors hover:bg-muted/10"
              >
                <span className="text-sm font-medium text-foreground">
                  {example.title}
                </span>
                <span className="text-xs text-muted line-clamp-2">
                  {example.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

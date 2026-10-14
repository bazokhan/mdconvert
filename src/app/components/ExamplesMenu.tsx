"use client";

import { useEffect, useRef } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { DocumentTextIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { markdownExamples, type MarkdownExample as MDEx } from "../utils/markdownExamples";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";

export const OPEN_EXAMPLES_EVENT = "mdconvert:openExamples";

interface ExamplesMenuProps {
  onSelectExample: (markdown: string) => void;
}

export function ExamplesMenu({ onSelectExample }: ExamplesMenuProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = () => buttonRef.current?.click();
    document.addEventListener(OPEN_EXAMPLES_EVENT, handler);
    return () => document.removeEventListener(OPEN_EXAMPLES_EVENT, handler);
  }, []);

  const handleExampleSelect = (example: MDEx) => {
    onSelectExample(example.markdown);
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton
        ref={buttonRef}
        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/10 data-[open]:bg-muted/15 sm:gap-2 sm:px-3"
      >
        <DocumentTextIcon className="h-4 w-4" strokeWidth={1.5} />
        <span className="hidden sm:inline">{t.buttons.examples}</span>
        <ChevronDownIcon
          className="h-4 w-4 opacity-60 transition-transform data-[open]:rotate-180"
          strokeWidth={1.5}
        />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom start"
        className="z-50 mt-1.5 w-72 origin-top rounded-xl bg-surface py-1.5 shadow-soft-lg ring-1 ring-border focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 transition duration-100 ease-out"
      >
        <div className="max-h-80 overflow-y-auto">
          {markdownExamples.map((example, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleExampleSelect(example)}
              className="flex w-full flex-col gap-0.5 px-3 py-2.5 text-left transition-colors data-[focus]:bg-muted/10"
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
      </MenuItems>
    </Menu>
  );
}

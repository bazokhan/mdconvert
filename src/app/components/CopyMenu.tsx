"use client";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ClipboardDocumentIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";
import { useToast } from "./Toast";
import { copyMarkdown, copyFormatted } from "../utils/markdownUtils";

interface CopyMenuProps {
  markdown: string;
}

export function CopyMenu({ markdown }: CopyMenuProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const { show } = useToast();

  const onCopyMarkdown = async () => {
    try {
      await copyMarkdown(markdown);
      show(t.buttons.copiedToClipboard, "success");
    } catch {
      show(t.buttons.converting, "error");
    }
  };

  const onCopyFormatted = async () => {
    try {
      await copyFormatted(markdown);
      show(t.buttons.copiedToClipboard, "success");
    } catch {
      show(t.buttons.converting, "error");
    }
  };

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-muted/10 hover:text-foreground data-[open]:bg-muted/10 data-[open]:text-foreground">
        <ClipboardDocumentIcon className="h-4 w-4" strokeWidth={1.5} />
        <span className="hidden sm:inline">{t.buttons.copy}</span>
        <ChevronDownIcon
          className="h-3.5 w-3.5 opacity-60 transition-transform data-[open]:rotate-180"
          strokeWidth={1.5}
        />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="z-50 mt-1.5 w-56 origin-top-right rounded-xl bg-surface py-1.5 shadow-soft-lg ring-1 ring-border focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 transition duration-100 ease-out"
      >
        <button
          type="button"
          onClick={onCopyMarkdown}
          className="flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left transition-colors data-[focus]:bg-muted/10"
        >
          <span className="text-sm font-medium text-foreground">
            {t.buttons.copyMarkdown}
          </span>
          <span className="text-xs text-muted">{t.formats.txt}</span>
        </button>
        <button
          type="button"
          onClick={onCopyFormatted}
          className="flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left transition-colors data-[focus]:bg-muted/10"
        >
          <span className="text-sm font-medium text-foreground">
            {t.buttons.copyFormatted}
          </span>
          <span className="text-xs text-muted">{t.formats.clipboard}</span>
        </button>
      </MenuItems>
    </Menu>
  );
}

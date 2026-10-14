"use client";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslations } from "../utils/getTranslations";
import { OUTPUT_FORMATS, type OutputFormatId } from "../utils/formats";

interface FormatPickerProps {
  value: OutputFormatId;
  onChange: (id: OutputFormatId) => void;
  /** Optional filter for which formats to show. */
  show?: OutputFormatId[];
  size?: "sm" | "md";
}

const SIZE_PADDING: Record<NonNullable<FormatPickerProps["size"]>, string> = {
  sm: "h-8 px-2.5",
  md: "h-9 px-3",
};

export function FormatPicker({ value, onChange, show, size = "md" }: FormatPickerProps) {
  const { language } = useLanguage();
  const t = getTranslations(language);
  const formats = show ? OUTPUT_FORMATS.filter((f) => show.includes(f.id)) : OUTPUT_FORMATS;
  const current = formats.find((f) => f.id === value);
  const label = current
    ? (t.buttons[
        `download${current.id.charAt(0).toUpperCase() + current.id.slice(1)}` as keyof typeof t.buttons
      ] as string) || t.buttons.format
    : t.buttons.format;

  return (
    <Menu as="div" className="relative inline-block">
      <MenuButton
        className={`inline-flex items-center gap-2 rounded-md border border-border bg-surface ${SIZE_PADDING[size]} text-sm font-medium text-foreground transition-colors hover:bg-muted/10`}
      >
        {current?.icon}
        <span>{label}</span>
        <ChevronDownIcon className="h-4 w-4 opacity-60 data-[open]:rotate-180 transition-transform" strokeWidth={1.5} />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="z-50 mt-1.5 w-64 origin-top-right rounded-xl bg-surface py-1.5 shadow-soft-lg ring-1 ring-border focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 transition duration-100 ease-out"
      >
        {formats.map((fmt) => {
          const desc = t.formats[fmt.id as keyof typeof t.formats];
          const nameKey = `download${fmt.id.charAt(0).toUpperCase() + fmt.id.slice(1)}` as
            | "downloadDocx"
            | "downloadPdf"
            | "downloadHtml"
            | "downloadTxt";
          const name =
            fmt.id === "clipboard"
              ? t.buttons.copyFormatted
              : fmt.id === "lint"
                ? t.buttons.runLint
                : (t.buttons[nameKey] as string);
          return (
            <button
              key={fmt.id}
              type="button"
              onClick={() => onChange(fmt.id)}
              className={`flex w-full items-start gap-2 px-3 py-2 text-left transition-colors data-[focus]:bg-muted/10 ${
                value === fmt.id
                  ? "bg-primary/10 text-primary"
                  : "text-foreground"
              }`}
            >
              <span className="mt-0.5">{fmt.icon}</span>
              <span className="min-w-0">
                <span className="block text-sm font-medium">{name}</span>
                {desc ? (
                  <span className="mt-0.5 block text-xs text-muted">{desc}</span>
                ) : null}
              </span>
            </button>
          );
        })}
      </MenuItems>
    </Menu>
  );
}

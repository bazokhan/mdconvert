"use client";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { GlobeAltIcon, ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../contexts/LanguageContext";
import { Language, languageConfig } from "../i18n/config";

const languages: { code: Language; name: string }[] = Object.values(
  languageConfig
).map((lang) => ({
  code: lang.code,
  name: lang.name,
}));

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Menu as="div" className="relative">
      <MenuButton className="inline-flex items-center gap-1.5 rounded-md p-2 text-muted transition-colors hover:bg-muted/10 hover:text-foreground data-[open]:bg-muted/10 data-[open]:text-foreground sm:gap-2 sm:px-2.5 sm:py-1.5">
        <GlobeAltIcon className="h-4 w-4" strokeWidth={1.5} />
        <span className="hidden sm:inline text-sm">
          {languages.find((l) => l.code === language)?.name}
        </span>
        <ChevronDownIcon
          className="h-3.5 w-3.5 opacity-60 transition-transform data-[open]:rotate-180"
          strokeWidth={1.5}
        />
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom end"
        className="z-50 mt-1.5 w-48 origin-top-right rounded-xl bg-surface py-1.5 shadow-soft-lg ring-1 ring-border focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 transition duration-100 ease-out"
      >
        {languages.map((lang) => (
          <MenuItem key={lang.code}>
            <button
              onClick={() => setLanguage(lang.code)}
              className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm transition-colors data-[focus]:bg-muted/10 data-[focus]:text-foreground text-foreground"
            >
              <span
                className={
                  language === lang.code
                    ? "font-medium text-primary"
                    : ""
                }
              >
                {lang.name}
              </span>
              {language === lang.code ? (
                <CheckIcon className="h-4 w-4 text-primary" strokeWidth={2} />
              ) : null}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

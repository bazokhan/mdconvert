import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../contexts/LanguageContext";
import { Language } from "../utils/getTranslations";
import { languageConfig } from "../i18n/config";

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
      <MenuButton className="inline-flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-muted/10 hover:text-foreground">
        <GlobeAltIcon className="h-4 w-4" strokeWidth={1.5} />
        <span className="hidden sm:inline">
          {languages.find((l) => l.code === language)?.name}
        </span>
        <ChevronDownIcon className="h-4 w-4 opacity-60" strokeWidth={1.5} />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-50 mt-1.5 w-44 origin-top-right rounded-lg bg-surface py-1 shadow-soft-lg ring-1 ring-border focus:outline-none">
          {languages.map((lang) => (
            <MenuItem key={lang.code}>
              {({ focus }) => (
                <button
                  onClick={() => setLanguage(lang.code)}
                  className={`flex w-full items-center px-3 py-2 text-left text-sm ${
                    language === lang.code
                      ? "bg-primary/10 text-primary font-medium"
                      : focus
                        ? "bg-muted/10 text-foreground"
                        : "text-foreground"
                  }`}
                >
                  {lang.name}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
}

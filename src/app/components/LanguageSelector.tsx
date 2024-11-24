import { Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useLanguage } from "../contexts/LanguageContext";
import { Language } from "../utils/getTranslations";

const languages: { code: Language; name: string }[] = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "zh", name: "中文" },
  { code: "hi", name: "हिन्दी" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "pt", name: "Português" },
  { code: "ur", name: "اردو" },
  { code: "fa", name: "فارسی" },
] as const;

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Menu as="div" className="relative">
      <MenuButton className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-secondary/10 transition-colors">
        <GlobeAltIcon className="h-5 w-5" />
        <span className="hidden sm:inline">
          {languages.find((l) => l.code === language)?.name}
        </span>
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
        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-background shadow-lg border border-secondary/20 focus:outline-none z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <MenuItem key={lang.code}>
                {({ active }) => (
                  <button
                    onClick={() => setLanguage(lang.code)}
                    className={`
                      ${active ? "bg-secondary/10" : ""}
                      ${
                        language === lang.code
                          ? "text-primary"
                          : "text-foreground"
                      }
                      group flex w-full items-center px-4 py-2 text-sm
                    `}
                  >
                    {lang.name}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}

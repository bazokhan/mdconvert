export const languageConfig = {
  en: { code: "en", dir: "ltr", name: "English" },
  ar: { code: "ar", dir: "rtl", name: "العربية" },
  zh: { code: "zh", dir: "ltr", name: "中文" },
  hi: { code: "hi", dir: "ltr", name: "हिन्दी" },
  fr: { code: "fr", dir: "ltr", name: "Français" },
  de: { code: "de", dir: "ltr", name: "Deutsch" },
  es: { code: "es", dir: "ltr", name: "Español" },
  pt: { code: "pt", dir: "ltr", name: "Português" },
  ur: { code: "ur", dir: "rtl", name: "اردو" },
  fa: { code: "fa", dir: "rtl", name: "فارسی" },
  ru: { code: "ru", dir: "ltr", name: "Русский" },
} as const;

export type Language = keyof typeof languageConfig;

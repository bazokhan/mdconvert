export const languageConfig = {
  en: { dir: "ltr", name: "English" },
  ar: { dir: "rtl", name: "العربية" },
  zh: { dir: "ltr", name: "中文" },
  hi: { dir: "ltr", name: "हिन्दी" },
  fr: { dir: "ltr", name: "Français" },
  de: { dir: "ltr", name: "Deutsch" },
  es: { dir: "ltr", name: "Español" },
  pt: { dir: "ltr", name: "Português" },
  ur: { dir: "rtl", name: "اردو" },
  fa: { dir: "rtl", name: "فارسی" },
  nl: { dir: "ltr", name: "Nederlands" },
  ru: { dir: "ltr", name: "Русский" },
} as const;

export type Language = keyof typeof languageConfig;

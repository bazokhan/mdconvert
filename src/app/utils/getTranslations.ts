import en from "../i18n/locales/en";
import ar from "../i18n/locales/ar";
import zh from "../i18n/locales/zh";
import hi from "../i18n/locales/hi";
import fr from "../i18n/locales/fr";
import es from "../i18n/locales/es";
import pt from "../i18n/locales/pt";
import ur from "../i18n/locales/ur";
import fa from "../i18n/locales/fa";
import de from "../i18n/locales/de";
import ru from "../i18n/locales/ru";

const translations = {
  en,
  ar,
  zh,
  hi,
  fr,
  es,
  pt,
  ur,
  fa,
  de,
  ru,
} as const;

export type Language = keyof typeof translations;

export function getTranslations(lang: Language = "en") {
  return translations[lang] || translations.en;
}

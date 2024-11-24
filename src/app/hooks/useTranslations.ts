import { useLanguage } from "../contexts/LanguageContext";
import en from "../i18n/locales/en";
import ar from "../i18n/locales/ar";

export function useTranslations() {
  const { language } = useLanguage();
  // For now we only have English, but this can be expanded
  const translations = language === "ar" ? ar : en;
  return translations;
}

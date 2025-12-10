import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import viTranslations from "./translations/vi.json";
import enTranslations from "./translations/en.json";

i18next.use(initReactI18next).init({
  resources: {
    vi: {
      translation: viTranslations,
    },
    en: {
      translation: enTranslations,
    },
  },
  lng: "vi", // Default language
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18next;

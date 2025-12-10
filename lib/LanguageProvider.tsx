"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  useTranslation as useI18nTranslation,
  I18nextProvider,
} from "react-i18next";
import i18n from "./i18n";

type LanguageContextType = {
  language: string;
  t: ReturnType<typeof useI18nTranslation>["t"];
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({
  children,
  lang,
}: {
  children: ReactNode;
  lang: string;
}) {
  // Change language when lang prop changes
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  const { t } = useI18nTranslation();

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={{ language: lang, t }}>
        {children}
      </LanguageContext.Provider>
    </I18nextProvider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
}

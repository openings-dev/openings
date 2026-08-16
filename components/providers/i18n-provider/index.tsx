"use client";

import * as React from "react";
import {
  AVAILABLE_LOCALES,
  DEFAULT_LOCALE,
  type LocaleCode,
} from "@/lib/constants/locales";
import { getTranslations } from "@/lib/translations/get-translations";
import { I18nContext } from "./context";
import type { I18nContextValue } from "./types";

export function I18nProvider({ children }: React.PropsWithChildren): React.ReactNode {
  const [locale, setLocaleState] = React.useState<LocaleCode>(DEFAULT_LOCALE);

  const setLocale = React.useCallback((nextLocale: LocaleCode) => {
    setLocaleState(nextLocale);
    document.documentElement.lang = nextLocale;
  }, []);

  const messages = React.useMemo(() => getTranslations(locale), [locale]);
  const value = React.useMemo<I18nContextValue>(
    () => ({ locale, locales: AVAILABLE_LOCALES, messages, setLocale }),
    [locale, messages, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

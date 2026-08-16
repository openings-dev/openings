"use client";

import * as React from "react";
import {
  AVAILABLE_LOCALES,
  DEFAULT_LOCALE,
  type LocaleCode,
} from "@/lib/constants/locales";
import { getTranslations } from "@/lib/translations/get-translations";
import { I18nContext } from "./context";
import { LOCALE_CHANGE_EVENT, LOCALE_STORAGE_KEY } from "./constants";
import { getStoredLocale, subscribeLocaleStore } from "./helpers";
import type { I18nContextValue } from "./types";

export function I18nProvider({ children }: React.PropsWithChildren): React.ReactNode {
  const locale = React.useSyncExternalStore(
    subscribeLocaleStore,
    getStoredLocale,
    () => DEFAULT_LOCALE,
  );

  const setLocale = React.useCallback((nextLocale: LocaleCode) => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const messages = React.useMemo(() => getTranslations(locale), [locale]);
  const value = React.useMemo<I18nContextValue>(
    () => ({ locale, locales: AVAILABLE_LOCALES, messages, setLocale }),
    [locale, messages, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

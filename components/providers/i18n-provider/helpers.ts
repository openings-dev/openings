import {
  AVAILABLE_LOCALES,
  DEFAULT_LOCALE,
  type LocaleCode,
} from "@/lib/constants/locales";
import { LOCALE_CHANGE_EVENT, LOCALE_STORAGE_KEY } from "./constants";

const VALID_LOCALES = new Set<string>(
  AVAILABLE_LOCALES.map(({ code }) => code),
);

export function getStoredLocale(): LocaleCode {
  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return storedLocale && VALID_LOCALES.has(storedLocale)
    ? (storedLocale as LocaleCode)
    : DEFAULT_LOCALE;
}

export function subscribeLocaleStore(onStoreChange: () => void): () => void {
  const onStorage = (event: StorageEvent) => {
    if (event.key === LOCALE_STORAGE_KEY) onStoreChange();
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(LOCALE_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(LOCALE_CHANGE_EVENT, onStoreChange);
  };
}

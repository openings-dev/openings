import {
  AVAILABLE_LOCALES,
  DEFAULT_LOCALE,
  type LocaleCode,
} from "@/lib/constants/locales";
import { LOCALE_CHANGE_EVENT, LOCALE_STORAGE_KEY } from "./constants";

const VALID_LOCALES = new Set<string>(
  AVAILABLE_LOCALES.map(({ code }) => code),
);
let volatileLocale: LocaleCode | null = null;

export function getStoredLocale(): LocaleCode {
  if (typeof window === "undefined") return DEFAULT_LOCALE;

  try {
    const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (storedLocale && VALID_LOCALES.has(storedLocale)) {
      return storedLocale as LocaleCode;
    }
  } catch {
    // Storage can be unavailable in sandboxed or privacy-restricted contexts.
  }

  return volatileLocale ?? DEFAULT_LOCALE;
}

export function setStoredLocale(locale: LocaleCode): void {
  volatileLocale = locale;

  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // The in-memory value keeps locale switching functional for this document.
  }
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

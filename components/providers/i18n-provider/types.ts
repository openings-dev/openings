import type { LocaleCode, LocaleOption } from "@/lib/constants/locales";
import type { TranslationMessages } from "@/lib/translations/types";

export interface I18nContextValue {
  locale: LocaleCode;
  locales: readonly LocaleOption[];
  messages: TranslationMessages;
  setLocale: (locale: LocaleCode) => void;
}

import {
  DEFAULT_LOCALE,
  LocaleCode,
} from "@/lib/constants/locales";
import { deTranslations } from "./de";
import { enTranslations } from "./en";
import { esTranslations } from "./es";
import { frTranslations } from "./fr";
import { itTranslations } from "./it";
import { ptTranslations } from "./pt";
import type { TranslationMessages } from "./types";

const TRANSLATIONS_BY_LOCALE: Record<LocaleCode, TranslationMessages> = {
  [LocaleCode.English]: enTranslations,
  [LocaleCode.Portuguese]: ptTranslations,
  [LocaleCode.Spanish]: esTranslations,
  [LocaleCode.Italian]: itTranslations,
  [LocaleCode.French]: frTranslations,
  [LocaleCode.German]: deTranslations,
};

export function getTranslations(locale: LocaleCode): TranslationMessages {
  return TRANSLATIONS_BY_LOCALE[locale] ?? TRANSLATIONS_BY_LOCALE[DEFAULT_LOCALE];
}

export enum LocaleCode {
  English = "en",
  Portuguese = "pt",
  Spanish = "es",
  Italian = "it",
  French = "fr",
  German = "de",
}

export interface LocaleOption {
  code: LocaleCode;
  label: string;
  nativeLabel: string;
}

export const AVAILABLE_LOCALES = [
  { code: LocaleCode.English, label: "English", nativeLabel: "English" },
  { code: LocaleCode.Portuguese, label: "Portuguese", nativeLabel: "Português" },
  { code: LocaleCode.Spanish, label: "Spanish", nativeLabel: "Español" },
  { code: LocaleCode.Italian, label: "Italian", nativeLabel: "Italiano" },
  { code: LocaleCode.French, label: "French", nativeLabel: "Français" },
  { code: LocaleCode.German, label: "German", nativeLabel: "Deutsch" },
] as const satisfies readonly LocaleOption[];

export const DEFAULT_LOCALE = LocaleCode.English;

export function isLocaleCode(value: string): value is LocaleCode {
  return AVAILABLE_LOCALES.some((locale) => locale.code === value);
}

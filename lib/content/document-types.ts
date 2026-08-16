import type { LocaleCode } from "@/lib/constants/locales";

export enum ProjectDocumentKey {
  Overview = "overview",
  ApiReference = "api-reference",
  Maintainers = "maintainers",
  Contributing = "contributing",
  Privacy = "privacy",
  Terms = "terms",
}

export interface ProjectDocumentBundle {
  markdownByLocale: Record<LocaleCode, string>;
  sourceFileByLocale: Record<LocaleCode, string>;
}

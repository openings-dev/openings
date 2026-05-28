import type { LocaleCode } from "@/lib/constants/locales";

export type DocumentPageKey =
  | "overview"
  | "apiReference"
  | "maintainers"
  | "contributing"
  | "privacy"
  | "terms";

export interface DocumentPageProps {
  documentKey: DocumentPageKey;
  markdownByLocale: Record<LocaleCode, string>;
  sourceFileByLocale: Record<LocaleCode, string>;
}

export interface DocumentMarkdownProps {
  markdown: string;
}

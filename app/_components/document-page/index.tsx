"use client";

import { useI18n } from "@/components/providers/i18n-provider";
import { cn } from "@/lib/utils/tailwind";
import { DEFAULT_LOCALE } from "@/lib/constants/locales";
import { DocumentMarkdown } from "./document-markdown";
import {
  documentPageContentCardStyles,
  documentPageIntroCardStyles,
  documentPageIntroDescriptionStyles,
  documentPageIntroKickerStyles,
  documentPageIntroTitleStyles,
  documentPageMainStyles,
  documentPageSourceStyles,
} from "./styles";
import type { DocumentPageProps } from "./types";

export function DocumentPage({
  documentKey,
  markdownByLocale,
  sourceFileByLocale,
}: DocumentPageProps) {
  const { locale, messages } = useI18n();
  const copy = messages.documents[documentKey];
  const markdown = markdownByLocale[locale] ?? markdownByLocale[DEFAULT_LOCALE];
  const sourceFile = sourceFileByLocale[locale] ?? sourceFileByLocale[DEFAULT_LOCALE];
  const sourceLabel = messages.documents.sourceLabel.replace("{file}", sourceFile);

  return (
    <section className={documentPageMainStyles()}>
      <header className={documentPageIntroCardStyles()}>
        <p className={documentPageIntroKickerStyles()}>{messages.header.brandTagline}</p>
        <h1 className={documentPageIntroTitleStyles()}>{copy.title}</h1>
        <p className={documentPageIntroDescriptionStyles()}>{copy.description}</p>
      </header>

      <section className={documentPageContentCardStyles()}>
        <DocumentMarkdown markdown={markdown} />
      </section>

      <p className={cn(documentPageSourceStyles())}>{sourceLabel}</p>
    </section>
  );
}

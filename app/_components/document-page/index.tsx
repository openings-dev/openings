"use client";

import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { DEFAULT_LOCALE } from "@/lib/constants/locales";
import { DocumentMarkdown } from "./document-markdown";
import type { DocumentPageProps } from "./types";

export function DocumentPage({
  documentKey,
  markdownByLocale,
  sourceFileByLocale,
}: DocumentPageProps): React.ReactNode {
  const { locale, messages } = useI18n();
  const copy = messages.documents[documentKey];
  const markdown = markdownByLocale[locale] ?? markdownByLocale[DEFAULT_LOCALE];
  const sourceFile = sourceFileByLocale[locale] ?? sourceFileByLocale[DEFAULT_LOCALE];
  const sourceLabel = messages.documents.sourceLabel.replace("{file}", sourceFile);

  return (
    <section className="mx-auto w-full max-w-[90rem] flex-1 px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:px-8 xl:px-10">
      <header className="mx-auto max-w-3xl border-b border-border/70 pb-8 sm:pb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">{messages.header.brandTagline}</p>
        <h1 className="font-display mt-3 text-3xl font-bold tracking-[-0.045em] sm:text-4xl lg:text-[2.75rem]">{copy.title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{copy.description}</p>
      </header>

      <section className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border/80 bg-surface-elevated px-5 py-7 shadow-soft-sm sm:px-8 sm:py-10">
        <DocumentMarkdown markdown={markdown} />
      </section>

      <p className="mx-auto mt-5 max-w-3xl text-xs text-subtle-foreground">{sourceLabel}</p>
    </section>
  );
}

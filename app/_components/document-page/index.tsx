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
    <section className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-20 sm:px-6 lg:px-8">
      <header className="rounded-2xl border border-border/70 bg-card p-8 shadow-[0_12px_36px_-20px_rgb(0_0_0/0.22)]">
        <p className="text-sm font-medium tracking-[0.02em] text-muted-foreground">{messages.header.brandTagline}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{copy.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">{copy.description}</p>
      </header>

      <section className="mt-8 rounded-2xl border border-border/70 bg-card px-6 py-7 shadow-[0_10px_30px_-24px_rgb(0_0_0/0.35)] sm:px-8 sm:py-9">
        <DocumentMarkdown markdown={markdown} />
      </section>

      <p className="mt-6 text-sm text-muted-foreground/95">{sourceLabel}</p>
    </section>
  );
}

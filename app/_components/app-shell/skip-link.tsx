"use client";

import { useI18n } from "@/components/providers/i18n-provider/use-i18n";

export function SkipLink(): React.ReactNode {
  const { messages } = useI18n();

  return (
    <a
      href="#main-content"
      className="sr-only z-[100] rounded-control border border-control bg-surface px-4 py-3 font-semibold text-foreground shadow-floating-sm focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {messages.accessibility.skipToContent}
    </a>
  );
}

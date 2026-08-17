import type { TranslationMessages } from "@/lib/translations/types";

export interface LocalizedCopyProps {
  className?: string;
  select: (messages: TranslationMessages) => string;
}

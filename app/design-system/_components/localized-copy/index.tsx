import { AVAILABLE_LOCALES } from "@/lib/constants/locales";
import { getTranslations } from "@/lib/translations/get-translations";
import { cn } from "@/lib/utils/tailwind";
import type { LocalizedCopyProps } from "./types";

export function LocalizedCopy({
  className,
  select,
}: LocalizedCopyProps): React.ReactNode {
  return (
    <span className={cn("localized-copy", className)}>
      {AVAILABLE_LOCALES.map(({ code }) => (
        <span key={code} lang={code}>
          {select(getTranslations(code))}
        </span>
      ))}
    </span>
  );
}

"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select/select-content";
import { SelectItem } from "@/components/ui/select/select-item";
import { SelectTrigger } from "@/components/ui/select/select-trigger";
import { SelectValue } from "@/components/ui/select/select-value";
import type { LanguageSwitcherProps } from "../types";
import { FlagBR } from "./flag-br";
import { FlagDE } from "./flag-de";
import { FlagES } from "./flag-es";
import { FlagFR } from "./flag-fr";
import { FlagIT } from "./flag-it";
import { FlagUS } from "./flag-us";

const LOCALE_FLAGS: Record<string, React.ReactNode> = {
  en: <FlagUS className="rounded-[2px] shadow-sm" />,
  pt: <FlagBR className="rounded-[2px] shadow-sm" />,
  es: <FlagES className="rounded-[2px] shadow-sm" />,
  it: <FlagIT className="rounded-[2px] shadow-sm" />,
  fr: <FlagFR className="rounded-[2px] shadow-sm" />,
  de: <FlagDE className="rounded-[2px] shadow-sm" />,
};

export function LanguageSwitcher({
  className,
  locale,
  locales,
  placeholder = "Language",
  ariaLabel = "Select language",
  changedTemplate = "Language set to {language}.",
  announceChange = true,
  onLocaleChange,
}: LanguageSwitcherProps) {
  const handleValueChange = (value: string) => {
    const nextLocale = locales.find((entry) => entry.code === value);
    if (!nextLocale) {
      return;
    }

    onLocaleChange(nextLocale.code);

    if (announceChange) {
      toast.success(nextLocale.nativeLabel, {
        description: changedTemplate.replace(
          "{language}",
          nextLocale.nativeLabel,
        ),
        duration: 1600,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: "easeOut" }}
      className={className}
    >
      <Select value={locale} onValueChange={handleValueChange}>
        <SelectTrigger
          aria-label={ariaLabel}
          className="h-9 gap-1.5 rounded-md border-0 bg-transparent px-2 text-sm font-medium text-foreground/75 shadow-none transition-colors hover:bg-muted/55 hover:text-foreground focus:ring-0 focus:ring-offset-0 data-[state=open]:bg-muted/55 data-[state=open]:text-foreground"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="min-w-[140px] rounded-lg border border-border/70 bg-card p-1 shadow-[0_18px_60px_-36px_rgb(0_0_0/0.6)] backdrop-blur-xl" align="end">
          {locales.map((entry) => (
            <SelectItem key={entry.code} value={entry.code}>
              <span className="flex items-center gap-2">
                <span className="flex size-4 items-center justify-center text-base leading-none">
                  {LOCALE_FLAGS[entry.code]}
                </span>
                <span className="text-[13px] font-medium">{entry.nativeLabel}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
}

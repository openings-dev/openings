"use client";

import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils/tailwind";
import type { LanguageSwitcherProps } from "../types";
import {
  languageSwitcherContentStyles,
  languageSwitcherTriggerStyles,
  languageSwitcherWrapperStyles,
} from "./styles";

const LOCALE_FLAGS: Record<string, string> = {
  en: "🇺🇸",
  pt: "🇧🇷",
  es: "🇪🇸",
  it: "🇮🇹",
  fr: "🇫🇷",
  de: "🇩🇪",
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
      className={cn(languageSwitcherWrapperStyles(), className)}
    >
      <Select value={locale} onValueChange={handleValueChange}>
        <SelectTrigger
          aria-label={ariaLabel}
          className={languageSwitcherTriggerStyles()}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={languageSwitcherContentStyles()} align="end">
          {locales.map((entry) => (
            <SelectItem key={entry.code} value={entry.code}>
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">{LOCALE_FLAGS[entry.code] || "🌐"}</span>
                <span className="text-[13px] font-medium">{entry.nativeLabel}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
}

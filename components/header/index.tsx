"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/components/providers/i18n-provider";
import { AVAILABLE_LOCALES } from "@/lib/constants/locales";
import { cn } from "@/lib/utils/tailwind";
import { BrandLogo } from "./brand-logo";
import { LanguageSwitcher } from "./language-switcher";
import {
  headerActionsStyles,
  headerContainerStyles,
  headerStyles,
} from "./styles";
import { ThemeToggle } from "./theme-toggle";
import type { HeaderProps, LocaleCode } from "./types";

export function Header({
  className,
  logoHref = "/",
  locale,
  locales,
  position = "sticky",
  onLocaleChange,
}: HeaderProps) {
  const { locale: currentLocale, messages, setLocale } = useI18n();
  const activeLocale = locale ?? currentLocale;
  const availableLocales = locales?.length ? locales : AVAILABLE_LOCALES;

  const handleLocaleChange = React.useCallback(
    (nextLocale: LocaleCode) => {
      if (onLocaleChange) {
        onLocaleChange(nextLocale);
        return;
      }

      if (locale === undefined) {
        setLocale(nextLocale);
      }
    },
    [locale, onLocaleChange, setLocale],
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(headerStyles({ position }), className)}
    >
      <div className={headerContainerStyles()}>
        <div className="flex items-center gap-6">
          <BrandLogo href={logoHref} brandName={messages.header.brandName} />
        </div>
        <div className={headerActionsStyles()}>
          <ThemeToggle />
          <LanguageSwitcher
            locale={activeLocale}
            locales={availableLocales}
            placeholder={messages.header.languagePlaceholder}
            ariaLabel={messages.header.languageAriaLabel}
            changedTemplate={messages.header.languageChanged}
            onLocaleChange={handleLocaleChange}
          />
        </div>
      </div>
    </motion.header>
  );
}

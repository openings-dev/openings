"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { GithubIcon } from "@/components/icons/github";
import { AVAILABLE_LOCALES } from "@/lib/constants/locales";
import { cn } from "@/lib/utils/tailwind";
import { BrandLogo } from "./brand-logo";
import { HeaderNav } from "./header-nav";
import { LanguageSwitcher } from "./language-switcher";
import {
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
  const navItems = [
    { label: messages.header.nav.discover, href: "/" },
    { label: messages.header.nav.communities, href: "/community" },
    { label: messages.header.nav.users, href: "/users" },
  ];

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
      <div className="mx-auto grid h-15 w-full max-w-[90rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:px-8 xl:px-10">
        <BrandLogo href={logoHref} brandName={messages.header.brandName} />
        <HeaderNav items={navItems} />
        <div className="flex min-w-0 items-center justify-end gap-1 sm:gap-2">
          <ThemeToggle />
          <LanguageSwitcher
            className="hidden xl:block"
            locale={activeLocale}
            locales={availableLocales}
            placeholder={messages.header.languagePlaceholder}
            ariaLabel={messages.header.languageAriaLabel}
            changedTemplate={messages.header.languageChanged}
            onLocaleChange={handleLocaleChange}
          />
          <a
            href="https://github.com/openings-dev/openings"
            target="_blank"
            rel="noreferrer"
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-transparent px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-border/70 hover:bg-surface hover:text-foreground focus-visible:outline-none lg:inline-flex"
            aria-label={messages.footer.social.githubAriaLabel}
          >
            <GithubIcon className="size-4" />
            <span>GitHub</span>
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

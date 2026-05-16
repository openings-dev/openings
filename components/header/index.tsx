"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { GithubIcon } from "@/components/icons/github";
import { AVAILABLE_LOCALES } from "@/lib/constants/locales";
import { cn } from "@/lib/utils/tailwind";
import { BrandLogo } from "./brand-logo";
import { HeaderNav } from "./header-nav";
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
      <div className={headerContainerStyles()}>
        <BrandLogo href={logoHref} brandName={messages.header.brandName} />
        <HeaderNav items={navItems} />
        <div className={headerActionsStyles()}>
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
            className="hidden h-9 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-foreground/82 transition-colors hover:bg-muted/55 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:inline-flex"
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

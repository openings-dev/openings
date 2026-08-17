"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { GithubIcon } from "@/components/icons/github";
import { Button } from "@/components/ui/button";
import { AVAILABLE_LOCALES } from "@/lib/constants/locales";
import { cn } from "@/lib/utils/tailwind";
import { BrandLogo } from "./brand-logo";
import { HeaderNav } from "./header-nav";
import { LanguageSwitcher } from "./language-switcher";
import {
  headerStyles,
} from "./styles";
import { ThemeToggle } from "./theme-toggle";
import { MobileNavigation } from "./mobile-navigation";
import type { HeaderProps, LocaleCode } from "./types";

export function Header({
  className,
  logoHref = "/",
  locale,
  locales,
  position = "sticky",
  onLocaleChange,
}: HeaderProps): React.ReactNode {
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
    <header className={cn(headerStyles({ position }), className)}>
      <div className="mx-auto grid h-18 w-full max-w-[90rem] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:px-8 xl:px-10">
        <BrandLogo href={logoHref} brandName={messages.header.brandName} />
        <HeaderNav
          items={navItems}
          ariaLabel={messages.header.primaryNavigationAriaLabel}
        />
        <div className="flex min-w-0 items-center justify-end gap-1 sm:gap-2">
          <ThemeToggle className="hidden md:flex" />
          <LanguageSwitcher
            className="hidden xl:block"
            locale={activeLocale}
            locales={availableLocales}
            placeholder={messages.header.languagePlaceholder}
            ariaLabel={messages.header.languageAriaLabel}
            changedTemplate={messages.header.languageChanged}
            onLocaleChange={handleLocaleChange}
          />
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden xl:inline-flex"
          >
            <a
              href="https://github.com/openings-dev/openings"
              target="_blank"
              rel="noreferrer"
              aria-label={messages.footer.social.githubAriaLabel}
            >
              <GithubIcon className="size-4" aria-hidden="true" />
              <span>GitHub</span>
              <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </Button>
          <MobileNavigation
            items={navItems}
            ariaLabel={messages.header.primaryNavigationAriaLabel}
            openMenuAriaLabel={messages.header.openNavigationMenuAriaLabel}
            closeMenuAriaLabel={messages.header.closeNavigationMenuAriaLabel}
            githubAriaLabel={messages.footer.social.githubAriaLabel}
          >
            {(portalContainer) => (
              <>
                <ThemeToggle className="md:hidden" />
                <LanguageSwitcher
                  className="min-w-0 flex-1"
                  portalContainer={portalContainer}
                  locale={activeLocale}
                  locales={availableLocales}
                  placeholder={messages.header.languagePlaceholder}
                  ariaLabel={messages.header.languageAriaLabel}
                  changedTemplate={messages.header.languageChanged}
                  feedbackMode="inline"
                  onLocaleChange={handleLocaleChange}
                />
              </>
            )}
          </MobileNavigation>
        </div>
      </div>
    </header>
  );
}

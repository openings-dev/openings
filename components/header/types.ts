import type { LocaleCode, LocaleOption } from "@/lib/constants/locales";

export type { LocaleCode, LocaleOption };

export interface HeaderProps {
  className?: string;
  logoHref?: string;
  locale?: LocaleCode;
  locales?: readonly LocaleOption[];
  position?: "sticky" | "static";
  onLocaleChange?: (locale: LocaleCode) => void;
}

export interface BrandLogoProps {
  className?: string;
  href?: string;
  brandName?: string;
  /** @deprecated BrandLogo now renders the canonical wordmark without a tagline. */
  brandTagline?: string;
  /** @deprecated BrandLogo now renders the canonical inline vector. */
  lightLogoSrc?: string;
  /** @deprecated BrandLogo now renders the canonical inline vector. */
  darkLogoSrc?: string;
}

export interface ThemeToggleProps {
  className?: string;
}

export interface LanguageSwitcherProps {
  className?: string;
  portalContainer?: HTMLElement | null;
  locale: LocaleCode;
  locales: readonly LocaleOption[];
  placeholder: string;
  ariaLabel: string;
  changedTemplate: string;
  announceChange?: boolean;
  feedbackMode?: "inline" | "toast";
  onLocaleChange: (locale: LocaleCode) => void;
}

import type { ComponentType, SVGProps } from "react";

type FooterIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  label: string;
  href: string;
  icon: FooterIcon;
  external?: boolean;
  ariaLabel?: string;
}

export interface FooterProps {
  className?: string;
  brandHref?: string;
  brandName?: string;
  brandTagline?: string;
  description?: string;
  supportEmail?: string;
  supportEmailButtonLabel?: string;
  supportEmailCopiedMessage?: string;
  supportEmailCopyErrorMessage?: string;
  supportText?: string;
  copyrightText?: string;
  signature?: string;
  lightLogoSrc?: string;
  darkLogoSrc?: string;
  linkGroups?: FooterLinkGroup[];
  socialLinks?: FooterSocialLink[];
}

export interface FooterBrandProps {
  className?: string;
  href: string;
  brandName: string;
  brandTagline: string;
  description: string;
  lightLogoSrc: string;
  darkLogoSrc: string;
  socialLinks: FooterSocialLink[];
}

export interface FooterLinksProps {
  className?: string;
  groups: FooterLinkGroup[];
}

export interface FooterBottomProps {
  className?: string;
  supportEmail?: string;
  supportEmailButtonLabel: string;
  supportEmailCopiedMessage: string;
  supportEmailCopyErrorMessage: string;
  supportText: string;
  copyrightText: string;
  signature: string;
}

"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/providers/i18n-provider";
import { GithubIcon } from "@/components/icons/github";
import { cn } from "@/lib/utils/tailwind";
import { FooterBottom } from "./footer-bottom";
import { FooterBrand } from "./footer-brand";
import { FooterLinks } from "./footer-links";
import {
  footerContainerStyles,
  footerMainGridStyles,
  footerRootStyles,
  footerSurfaceStyles,
  footerTopDividerStyles,
} from "./styles";
import type { FooterLinkGroup, FooterProps, FooterSocialLink } from "./types";

export function Footer({
  className,
  brandHref = "/",
  brandName = "openings.dev",
  brandTagline,
  description,
  supportEmail = "support@openings.dev",
  supportEmailButtonLabel,
  supportEmailCopiedMessage,
  supportEmailCopyErrorMessage,
  supportText,
  copyrightText,
  signature,
  lightLogoSrc = "/brand-mark-light.svg",
  darkLogoSrc = "/brand-mark-dark.svg",
  linkGroups,
  socialLinks,
}: FooterProps) {
  const { messages } = useI18n();
  const footerMessages = messages.footer;
  const year = new Date().getFullYear().toString();

  const defaultLinkGroups: FooterLinkGroup[] = [
    {
      id: "project",
      title: footerMessages.groups.project,
      links: [
        { label: footerMessages.links.overview, href: "/overview" },
        { label: footerMessages.links.apiReference, href: "/docs/api" },
        {
          label: footerMessages.links.status,
          href: "https://status.openings.dev",
          external: true,
        },
      ],
    },
    {
      id: "open-source",
      title: footerMessages.groups.openSource,
      links: [
        {
          label: footerMessages.links.github,
          href: "https://github.com/openings-dev/openings",
          external: true,
        },
        {
          label: footerMessages.links.contributing,
          href: "/docs/contributing",
        },
        {
          label: footerMessages.links.reportIssue,
          href: "https://github.com/openings-dev/openings/issues/new",
          external: true,
        },
      ],
    },
    {
      id: "legal",
      title: footerMessages.groups.legal,
      links: [
        { label: footerMessages.links.privacyPolicy, href: "/privacy" },
        { label: footerMessages.links.termsOfService, href: "/terms" },
      ],
    },
  ];

  const defaultSocialLinks: FooterSocialLink[] = [
    {
      label: footerMessages.links.github,
      href: "https://github.com/openings-dev/openings",
      icon: GithubIcon,
      external: true,
      ariaLabel: footerMessages.social.githubAriaLabel,
    },
  ];

  const resolvedLinkGroups = linkGroups?.length
    ? linkGroups
    : defaultLinkGroups;
  const resolvedSocialLinks = socialLinks?.length
    ? socialLinks
    : defaultSocialLinks;
  const resolvedBrandTagline = brandTagline ?? footerMessages.brandTagline;
  const resolvedDescription = description ?? footerMessages.description;
  const resolvedSupportText = supportText ?? footerMessages.supportText;
  const resolvedSignature = signature ?? footerMessages.signature;
  const resolvedSupportEmailButtonLabel =
    supportEmailButtonLabel ?? footerMessages.supportEmailButtonLabel;
  const resolvedSupportEmailCopiedMessage =
    supportEmailCopiedMessage ?? footerMessages.supportEmailCopied;
  const resolvedSupportEmailCopyErrorMessage =
    supportEmailCopyErrorMessage ?? footerMessages.supportEmailCopyError;
  const resolvedCopyright =
    copyrightText ??
    footerMessages.copyrightTemplate
      .replace("{year}", year)
      .replace("{brand}", brandName);

  return (
    <footer className={cn(footerRootStyles(), className)}>
      <span className={footerTopDividerStyles()} aria-hidden="true" />
      <span className={footerSurfaceStyles()} aria-hidden="true" />

      <div className={footerContainerStyles()}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={footerMainGridStyles()}
        >
          <FooterBrand
            href={brandHref}
            brandName={brandName}
            brandTagline={resolvedBrandTagline}
            description={resolvedDescription}
            lightLogoSrc={lightLogoSrc}
            darkLogoSrc={darkLogoSrc}
            socialLinks={resolvedSocialLinks}
          />
          <FooterLinks groups={resolvedLinkGroups} />
        </motion.div>

        <FooterBottom
          supportEmail={supportEmail}
          supportEmailButtonLabel={resolvedSupportEmailButtonLabel}
          supportEmailCopiedMessage={resolvedSupportEmailCopiedMessage}
          supportEmailCopyErrorMessage={resolvedSupportEmailCopyErrorMessage}
          supportText={resolvedSupportText}
          copyrightText={resolvedCopyright}
          signature={resolvedSignature}
        />
      </div>
    </footer>
  );
}

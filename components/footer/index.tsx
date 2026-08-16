"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { GithubIcon } from "@/components/icons/github";
import { cn } from "@/lib/utils/tailwind";
import { FooterBottom } from "./footer-bottom";
import { FooterBrand } from "./footer-brand";
import { FooterLinks } from "./footer-links";
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
  lightLogoSrc = "/light-mode-favicon.svg",
  darkLogoSrc = "/dark-mode-favicon.svg",
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
        { label: footerMessages.links.communities, href: "/community" },
        { label: footerMessages.links.maintainers, href: "/docs/maintainers" },
        { label: footerMessages.links.users, href: "/users" },
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
    <footer className={cn("relative mt-16 border-t-2 border-border bg-accent text-foreground", className)}>

      <div className="relative mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 pb-7 pt-9 sm:px-6 lg:px-8 xl:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.45fr)] md:gap-10"
        >
          <FooterBrand
            href={brandHref}
            brandName={brandName}
            brandTagline={resolvedBrandTagline}
            description={resolvedDescription}
            lightLogoSrc={lightLogoSrc}
            darkLogoSrc={darkLogoSrc}
            socialLinks={resolvedSocialLinks}
            socialLinksAriaLabel={footerMessages.social.linksAriaLabel}
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

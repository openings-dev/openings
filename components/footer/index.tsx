"use client";

import { cn } from "@/lib/utils/tailwind";
import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
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

const DEFAULT_LINK_GROUPS: FooterLinkGroup[] = [
  {
    id: "project",
    title: "Project",
    links: [
      { label: "Overview", href: "/" },
      { label: "API Reference", href: "/docs/api" },
      { label: "Status", href: "https://status.openings.dev", external: true },
    ],
  },
  {
    id: "open-source",
    title: "Open Source",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/user/openings",
        external: true,
      },
      {
        label: "Contributing",
        href: "https://github.com/user/openings/blob/main/CONTRIBUTING.md",
        external: true,
      },
      {
        label: "Report issue",
        href: "https://github.com/user/openings/issues/new",
        external: true,
      },
    ],
  },
  {
    id: "legal",
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const DEFAULT_SOCIAL_LINKS: FooterSocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/GuilhermeAlbert/openings",
    icon: Link2,
    external: true,
  },
];

export function Footer({
  className,
  brandHref = "/",
  brandName = "openings.dev",
  brandTagline = "Remote jobs intelligence",
  description = "Discover meaningful remote opportunities through curated signals, trusted repositories, and structured hiring insights.",
  supportEmail = "support@openings.dev",
  supportText = "Built for distributed teams and high-context hiring decisions.",
  copyrightText,
  signature = "Powered by Trebla",
  lightLogoSrc = "/light-mode-favicon.svg",
  darkLogoSrc = "/dark-mode-favicon.svg",
  linkGroups,
  socialLinks,
}: FooterProps) {
  const resolvedLinkGroups = linkGroups?.length
    ? linkGroups
    : DEFAULT_LINK_GROUPS;
  const resolvedSocialLinks = socialLinks?.length
    ? socialLinks
    : DEFAULT_SOCIAL_LINKS;
  const resolvedCopyright =
    copyrightText ??
    `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`;

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
            brandTagline={brandTagline}
            description={description}
            lightLogoSrc={lightLogoSrc}
            darkLogoSrc={darkLogoSrc}
            socialLinks={resolvedSocialLinks}
          />
          <FooterLinks groups={resolvedLinkGroups} />
        </motion.div>

        <FooterBottom
          supportEmail={supportEmail}
          supportText={supportText}
          copyrightText={resolvedCopyright}
          signature={signature}
        />
      </div>
    </footer>
  );
}

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";
import type { FooterBrandProps } from "../types";
import {
  footerSocialButtonStyles,
} from "../styles";

export function FooterBrand({
  className,
  href,
  brandName,
  brandTagline,
  description,
  lightLogoSrc,
  darkLogoSrc,
  socialLinks,
}: FooterBrandProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn("space-y-4", className)}
    >
      <Link href={href} className="inline-flex items-center gap-3 rounded-lg px-1 py-1 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted">
        <span className="relative size-9 overflow-hidden rounded-[10px] border border-border/70 bg-card shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
          <Image
            src={lightLogoSrc}
            alt={`${brandName} light logo`}
            fill
            sizes="36px"
            className="object-contain dark:hidden"
          />
          <Image
            src={darkLogoSrc}
            alt={`${brandName} dark logo`}
            fill
            sizes="36px"
            className="hidden object-contain dark:block"
          />
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-display text-sm font-bold tracking-[-0.025em] text-foreground">{brandName}</span>
          <span className="text-xs text-muted-foreground">{brandTagline}</span>
        </span>
      </Link>

      <p className="max-w-sm text-sm leading-6 text-muted-foreground">{description}</p>

      <ul className="flex items-center gap-2" aria-label="Social links">
        {socialLinks.map((socialLink, index) => {
          const Icon = socialLink.icon;
          const isExternal = socialLink.external ?? true;

          return (
            <motion.li
              key={`${socialLink.label}-${socialLink.href}`}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.25,
                delay: index * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Button
                asChild
                variant="ghost"
                size="icon"
                className={footerSocialButtonStyles()}
              >
                <Link
                  href={socialLink.href}
                  aria-label={socialLink.ariaLabel ?? socialLink.label}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  <span className="sr-only">{socialLink.label}</span>
                </Link>
              </Button>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}

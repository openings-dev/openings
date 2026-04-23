"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/tailwind";
import type { BrandLogoProps } from "../types";
import {
  brandLogoMarkStyles,
  brandLogoRootStyles,
  brandLogoTextStyles,
  brandLogoTitleStyles,
} from "./styles";

export function BrandLogo({
  className,
  href = "/",
  brandName = "openings.dev",
  lightLogoSrc = "/brand-mark-light.svg",
  darkLogoSrc = "/brand-mark-dark.svg",
}: BrandLogoProps) {
  return (
    <Link href={href} className={cn(brandLogoRootStyles(), className)}>
      <span className={brandLogoMarkStyles()}>
        <Image
          src={lightLogoSrc}
          alt={`${brandName} light logo`}
          fill
          sizes="36px"
          priority
          className="object-contain dark:hidden"
        />
        <Image
          src={darkLogoSrc}
          alt={`${brandName} dark logo`}
          fill
          sizes="36px"
          priority
          className="hidden object-contain dark:block"
        />
      </span>
      <span className={brandLogoTextStyles()}>
        <span className={brandLogoTitleStyles()}>{brandName}</span>
      </span>
    </Link>
  );
}

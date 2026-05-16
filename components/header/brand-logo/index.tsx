"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/tailwind";
import type { BrandLogoProps } from "../types";
import {
  brandLogoBadgeStyles,
  brandLogoRootStyles,
  brandLogoWordStyles,
} from "./styles";

export function BrandLogo({
  className,
  href = "/",
  brandName = "openings.dev",
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={cn(brandLogoRootStyles(), className)}
      aria-label={brandName}
    >
      <span className={brandLogoWordStyles()} aria-hidden="true">
        openings
      </span>
      <span className={brandLogoBadgeStyles()} aria-hidden="true">
        .dev
      </span>
    </Link>
  );
}

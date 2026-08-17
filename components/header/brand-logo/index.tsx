"use client";

import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { cn } from "@/lib/utils/tailwind";
import type { BrandLogoProps } from "../types";

export function BrandLogo({
  className,
  href = "/",
  brandName = "openings.dev",
}: BrandLogoProps): React.ReactNode {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex rounded-control p-1 transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      aria-label={brandName}
    >
      <Wordmark />
    </Link>
  );
}

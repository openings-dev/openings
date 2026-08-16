"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/tailwind";
import type { BrandLogoProps } from "../types";

export function BrandLogo({
  className,
  href = "/",
  brandName = "openings.dev",
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-1 rounded-lg py-1 transition-transform hover:-rotate-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
      aria-label={brandName}
    >
      <span className="font-display text-[1.35rem] font-bold leading-none tracking-[-0.055em] text-foreground sm:text-[1.45rem]" aria-hidden="true">
        openings
      </span>
      <span className="mt-0.5 inline-flex rounded-md border-2 border-border bg-primary px-1.5 py-1 text-[10px] font-black leading-none tracking-[-0.02em] text-primary-foreground shadow-soft-sm" aria-hidden="true">
        .dev
      </span>
    </Link>
  );
}

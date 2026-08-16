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
      className={cn("inline-flex items-center gap-1 rounded-lg py-1 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted", className)}
      aria-label={brandName}
    >
      <span className="text-3xl font-semibold leading-none text-foreground sm:text-[2rem]" aria-hidden="true">
        openings
      </span>
      <span className="mt-1 inline-flex rounded-[5px] bg-primary px-1.5 py-0.5 text-sm font-semibold leading-none text-primary-foreground sm:text-[15px]" aria-hidden="true">
        .dev
      </span>
    </Link>
  );
}

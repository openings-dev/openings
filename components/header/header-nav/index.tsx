"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { cn } from "@/lib/utils/tailwind";
import { headerNavLinkStyles } from "./styles";

export interface HeaderNavItem {
  label: string;
  href: string;
}

interface HeaderNavProps {
  className?: string;
  items: HeaderNavItem[];
  ariaLabel: string;
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav({ className, items, ariaLabel }: HeaderNavProps): React.ReactNode {
  const pathname = usePathname();

  return (
    <nav className={cn("hidden items-center justify-center gap-1 rounded-xl border border-border/70 bg-surface/70 p-1 justify-self-center shadow-soft-sm md:flex", className)} aria-label={ariaLabel}>
      {items.map((item) => {
        const isActive = isActivePath(pathname, item.href);

        return (
          <Link
          key={item.href}
          href={item.href}
          className={headerNavLinkStyles({
            active: isActive,
          })}
          aria-current={isActive ? "page" : undefined}
        >
          {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/tailwind";
import { headerNavLinkStyles } from "./styles";

export interface HeaderNavItem {
  label: string;
  href: string;
}

interface HeaderNavProps {
  className?: string;
  items: HeaderNavItem[];
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav({ className, items }: HeaderNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("hidden items-center justify-center gap-7 justify-self-center md:flex", className)} aria-label="Primary">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={headerNavLinkStyles({
            active: isActivePath(pathname, item.href),
          })}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

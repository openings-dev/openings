"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/github";
import { cn } from "@/lib/utils/tailwind";
import type { HeaderNavItem } from "../header-nav";

interface MobileNavigationProps {
  items: HeaderNavItem[];
  ariaLabel: string;
  githubAriaLabel: string;
  children: React.ReactNode;
}

export function MobileNavigation({ items, ariaLabel, githubAriaLabel, children }: MobileNavigationProps): React.ReactNode {
  const pathname = usePathname();
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = React.useCallback(() => setOpen(false), []);

  return (
    <div className="md:hidden">
      <Button ref={triggerRef} type="button" variant="outline" size="icon" className="size-10" aria-label={ariaLabel} onClick={() => setOpen(true)}>
        <Menu className="size-5" />
      </Button>
      <dialog
        ref={dialogRef}
        aria-label={ariaLabel}
        className="m-0 ml-auto h-dvh max-h-none w-[min(22rem,calc(100%-1rem))] max-w-none border-0 border-l-2 border-border bg-card p-0 text-foreground shadow-soft-lg backdrop:bg-foreground/55"
        onCancel={(event) => { event.preventDefault(); close(); }}
        onClose={() => {
          setOpen(false);
          triggerRef.current?.focus();
        }}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between border-b-2 border-border bg-accent p-4">
            <span className="font-display text-lg font-black">openings.dev</span>
            <Button type="button" variant="outline" size="icon" aria-label={ariaLabel} onClick={close}>
              <X className="size-5" />
            </Button>
          </header>
          <nav className="flex-1 space-y-2 p-4" aria-label={ariaLabel}>
            {items.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={cn("flex min-h-12 items-center rounded-lg border-2 border-border px-4 text-base font-black shadow-soft-sm", active ? "bg-primary text-primary-foreground" : "bg-card hover:bg-accent")}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <footer className="space-y-3 border-t-2 border-border bg-surface p-4">
            <div className="flex items-center gap-3">{children}</div>
            <a href="https://github.com/openings-dev/openings" target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-center gap-2 rounded-lg border-2 border-border bg-card px-4 font-bold shadow-soft-sm" aria-label={githubAriaLabel}>
              <GithubIcon className="size-4" /> GitHub <ExternalLink className="size-4" />
            </a>
          </footer>
        </div>
      </dialog>
    </div>
  );
}

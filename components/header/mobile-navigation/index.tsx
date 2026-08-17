"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, Menu, X } from "lucide-react";
import { Wordmark } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/icons/github";
import { cn } from "@/lib/utils/tailwind";
import type { MobileNavigationProps } from "./types";

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

const MOBILE_NAVIGATION_DIALOG_ID = "mobile-navigation-dialog";

export function MobileNavigation({
  items,
  ariaLabel,
  openMenuAriaLabel,
  closeMenuAriaLabel,
  githubAriaLabel,
  children,
}: MobileNavigationProps): React.ReactNode {
  const pathname = usePathname();
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [dialogElement, setDialogElement] =
    React.useState<HTMLDialogElement | null>(null);
  const [open, setOpen] = React.useState(false);

  const handleDialogRef = React.useCallback(
    (node: HTMLDialogElement | null) => {
      dialogRef.current = node;
      setDialogElement(node);
    },
    [],
  );

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }

    const documentElementOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    const desktopQuery = window.matchMedia("(min-width: 1280px)");
    const handleDesktopBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    desktopQuery.addEventListener("change", handleDesktopBreakpoint);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();

    const frameId = window.requestAnimationFrame(() => {
      dialog.querySelector<HTMLElement>("[data-mobile-navigation-close]")?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      desktopQuery.removeEventListener("change", handleDesktopBreakpoint);
      if (dialog.open) dialog.close();
      document.documentElement.style.overflow = documentElementOverflow;
      document.body.style.overflow = bodyOverflow;
      trigger?.focus();
    };
  }, [open]);

  const close = React.useCallback(() => setOpen(false), []);

  return (
    <div className="xl:hidden">
      <Button
        ref={triggerRef}
        type="button"
        variant="ghost"
        size="icon"
        aria-label={openMenuAriaLabel}
        aria-expanded={open}
        aria-controls={MOBILE_NAVIGATION_DIALOG_ID}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" aria-hidden="true" />
      </Button>
      <dialog
        id={MOBILE_NAVIGATION_DIALOG_ID}
        ref={handleDialogRef}
        aria-label={ariaLabel}
        className="m-0 ml-auto h-dvh max-h-none w-[min(23rem,100%)] max-w-none border-0 border-l border-line bg-surface-elevated p-0 text-foreground shadow-floating-lg backdrop:bg-overlay"
        onCancel={(event) => { event.preventDefault(); close(); }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            close();
          }
        }}
        onClose={() => setOpen(false)}
      >
        <div className="flex h-full flex-col pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
          <header className="flex min-h-18 items-center justify-between border-b border-line px-4">
            <Wordmark />
            <Button data-mobile-navigation-close type="button" variant="ghost" size="icon" aria-label={closeMenuAriaLabel} onClick={close}>
              <X className="size-5" aria-hidden="true" />
            </Button>
          </header>
          <nav className="flex-1 space-y-1 overflow-y-auto p-4" aria-label={ariaLabel}>
            {items.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={cn(
                    "relative flex min-h-12 items-center rounded-control px-4 text-base font-medium transition-colors before:absolute before:bottom-3 before:left-1 before:top-3 before:w-0.5 before:rounded-full before:bg-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "bg-primary-soft font-semibold text-primary-deep before:opacity-100"
                      : "text-muted-foreground before:opacity-0 hover:bg-surface-muted hover:text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <footer className="space-y-3 border-t border-line bg-surface p-4">
            <div className="flex min-w-0 items-center gap-2">
              {typeof children === "function"
                ? children(dialogElement)
                : children}
            </div>
            <Button asChild variant="outline" className="w-full">
              <a href="https://github.com/openings-dev/openings" target="_blank" rel="noreferrer" aria-label={githubAriaLabel}>
                <GithubIcon className="size-4" aria-hidden="true" /> GitHub <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </footer>
        </div>
      </dialog>
    </div>
  );
}

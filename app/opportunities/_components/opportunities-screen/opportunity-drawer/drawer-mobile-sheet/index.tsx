"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { restoreOpportunityTriggerFocus } from "@/app/opportunities/_components/opportunities-screen/opportunity-card/trigger-contract";

interface DrawerMobileSheetProps {
  open: boolean;
  dialogId: string;
  dialogLabel: string;
  returnFocusOpportunityId: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function DrawerMobileSheet({
  open,
  dialogId,
  dialogLabel,
  returnFocusOpportunityId,
  onClose,
  children,
}: DrawerMobileSheetProps): React.ReactNode {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const onCloseRef = React.useRef(onClose);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const desktopQuery = window.matchMedia("(min-width: 1280px)");
    let previousDocumentOverflow = "";
    let previousBodyOverflow = "";
    let frameId: number | null = null;
    let active = false;
    let previouslyFocused: HTMLElement | null = null;

    const deactivate = () => {
      if (!active) return;
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      if (dialog.open) dialog.close();
      document.documentElement.style.overflow = previousDocumentOverflow;
      document.body.style.overflow = previousBodyOverflow;
      if (previouslyFocused?.isConnected) {
        window.requestAnimationFrame(() => previouslyFocused?.focus());
      } else {
        restoreOpportunityTriggerFocus(returnFocusOpportunityId);
      }
      active = false;
    };

    const activate = () => {
      if (active || dialog.open) return;
      previousDocumentOverflow = document.documentElement.style.overflow;
      previousBodyOverflow = document.body.style.overflow;
      previouslyFocused = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      dialog.showModal();
      active = true;
      frameId = window.requestAnimationFrame(() => {
        const closeButton = dialog.querySelector<HTMLElement>(
          "[data-detail-close]",
        );
        (closeButton ?? dialog).focus();
      });
    };

    const syncDialog = () => {
      if (open && !desktopQuery.matches) activate();
      else deactivate();
    };

    syncDialog();
    desktopQuery.addEventListener("change", syncDialog);

    return () => {
      desktopQuery.removeEventListener("change", syncDialog);
      deactivate();
    };
  }, [open, returnFocusOpportunityId]);

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: "easeOut" as const };

  return (
    <dialog
      id={dialogId}
      ref={dialogRef}
      aria-label={dialogLabel}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none items-end justify-center overflow-hidden bg-transparent p-0 text-foreground backdrop:bg-overlay backdrop:backdrop-blur-[2px] open:flex xl:hidden"
      onCancel={(event) => {
        event.preventDefault();
        onCloseRef.current();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onCloseRef.current();
      }}
    >
      <motion.div
        className="relative h-[min(92dvh,56rem)] w-full overflow-hidden rounded-t-floating border border-line bg-surface-elevated pb-[env(safe-area-inset-bottom)] shadow-floating-lg sm:w-[min(48rem,calc(100%-2rem))]"
        initial={{ y: shouldReduceMotion ? 0 : 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={transition}
      >
        <div
          className="mx-auto mt-2 h-1 w-10 rounded-pill bg-line-strong"
          aria-hidden="true"
        />
        <div className="h-[calc(100%-0.75rem)] min-h-0 overscroll-contain">
          {children}
        </div>
      </motion.div>
    </dialog>
  );
}

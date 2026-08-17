"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { restoreOpportunityTriggerFocus } from "@/app/opportunities/_components/opportunities-screen/opportunity-card/trigger-contract";

interface DetailsDialogProps {
  open: boolean;
  dialogId: string;
  dialogLabel: string;
  returnFocusOpportunityId: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function DetailsDialog({
  open,
  dialogId,
  dialogLabel,
  returnFocusOpportunityId,
  onClose,
  children,
}: DetailsDialogProps): React.ReactNode {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const onCloseRef = React.useRef(onClose);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;

    const previousDocumentOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    let frameId = window.requestAnimationFrame(() => {
      const closeButton = dialog.querySelector<HTMLElement>("[data-detail-close]");
      (closeButton ?? dialog).focus();
    });

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();

    return () => {
      window.cancelAnimationFrame(frameId);
      if (dialog.open) dialog.close();
      document.documentElement.style.overflow = previousDocumentOverflow;
      document.body.style.overflow = previousBodyOverflow;

      frameId = window.requestAnimationFrame(() => {
        frameId = window.requestAnimationFrame(() => {
          if (previouslyFocused?.isConnected) {
            previouslyFocused.focus();
            return;
          }
          restoreOpportunityTriggerFocus(returnFocusOpportunityId);
        });
      });
    };
  }, [open, returnFocusOpportunityId]);

  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.18, ease: "easeOut" as const };

  return (
    <dialog
      id={dialogId}
      ref={dialogRef}
      aria-label={dialogLabel}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-surface-elevated p-0 text-foreground backdrop:bg-overlay open:block"
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        event.preventDefault();
        onCloseRef.current();
      }}
      onCancel={(event) => {
        event.preventDefault();
        onCloseRef.current();
      }}
    >
      <motion.div
        className="h-dvh w-screen overflow-hidden bg-surface-elevated"
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.995 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={transition}
      >
        {children}
      </motion.div>
    </dialog>
  );
}

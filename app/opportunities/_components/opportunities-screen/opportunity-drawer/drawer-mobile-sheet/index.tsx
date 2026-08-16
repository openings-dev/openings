"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DrawerMobileSheetProps {
  open: boolean;
  closeLabel: string;
  dialogLabel: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function DrawerMobileSheet({
  open,
  closeLabel,
  dialogLabel,
  onClose,
  children,
}: DrawerMobileSheetProps): React.ReactNode {
  const dialogRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();

    return () => {
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label={closeLabel} className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" onClick={onClose} />
          <motion.div
            ref={dialogRef}
            className="absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-hidden rounded-t-3xl border border-border/80 bg-surface-elevated pb-[env(safe-area-inset-bottom)] shadow-soft-lg"
            initial={{ y: 32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-label={dialogLabel}
            tabIndex={-1}
          >
            <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-border" aria-hidden />
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

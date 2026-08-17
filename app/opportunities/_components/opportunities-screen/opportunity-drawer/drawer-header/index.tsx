import type React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DrawerHeaderProps {
  title: string;
  detailsLabel: string;
  closeLabel: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function DrawerHeader({
  title,
  detailsLabel,
  closeLabel,
  onClose,
  children,
}: DrawerHeaderProps): React.ReactNode {
  return (
    <header className="relative border-b border-line bg-surface-elevated px-5 py-5 sm:px-6">
      <p className="mb-3 text-xs font-medium text-primary-deep">{detailsLabel}</p>
      {children}
      <h2 className="font-display mt-4 pr-10 text-product-title font-semibold tracking-[-0.03em] text-foreground">
        {title}
      </h2>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-3 top-3 shrink-0 text-muted-foreground hover:text-foreground"
        data-detail-close=""
        onClick={onClose}
        aria-label={closeLabel}
      >
        <X className="size-4" aria-hidden="true" />
      </Button>
    </header>
  );
}

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DrawerHeaderProps {
  title: string;
  detailsLabel: string;
  closeLabel: string;
  onClose: () => void;
}

export function DrawerHeader({
  title,
  detailsLabel,
  closeLabel,
  onClose,
}: DrawerHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/70 bg-surface-elevated px-5 py-4">
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
          {detailsLabel}
        </p>
        <h2 className="font-display text-lg font-bold leading-snug tracking-[-0.025em] text-foreground">{title}</h2>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 shrink-0 rounded-md text-muted-foreground hover:text-foreground"
        onClick={onClose}
        aria-label={closeLabel}
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}

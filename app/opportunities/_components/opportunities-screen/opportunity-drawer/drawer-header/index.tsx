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
    <div className="flex items-start justify-between gap-3 border-b border-border/70 bg-card/52 px-4 py-4">
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-primary/80">
          {detailsLabel}
        </p>
        <h2 className="text-lg font-semibold leading-snug text-foreground">{title}</h2>
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

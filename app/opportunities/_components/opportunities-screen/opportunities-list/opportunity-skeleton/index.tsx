import { cn } from "@/lib/utils/tailwind";

interface OpportunitySkeletonProps {
  compact: boolean;
}

export function OpportunitySkeleton({ compact }: OpportunitySkeletonProps) {
  return (
    <div
      className={cn(
        "h-full rounded-xl border border-border/70 bg-surface-elevated p-4 shadow-soft-sm",
        compact ? "min-h-56" : "min-h-52",
      )}
    >
      <div className="animate-pulse space-y-3">
        <div className="h-4 w-3/5 rounded bg-muted" />
        <div className="h-3 w-full rounded bg-muted/70" />
        <div className="h-3 w-4/5 rounded bg-muted/70" />
        <div className="flex gap-1.5">
          <div className="h-5 w-14 rounded-md bg-muted" />
          <div className="h-5 w-18 rounded-md bg-muted" />
          <div className="h-5 w-12 rounded-md bg-muted" />
        </div>
        <div className="h-3 w-2/3 rounded bg-muted/70" />
      </div>
    </div>
  );
}

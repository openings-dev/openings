import { cn } from "@/lib/utils/tailwind";
import { OpportunityViewMode } from "@/app/opportunities/_components/opportunities-screen/types";

interface OpportunitySkeletonProps {
  viewMode: OpportunityViewMode;
}

export function OpportunitySkeleton({ viewMode }: OpportunitySkeletonProps): React.ReactNode {
  const isList = viewMode === OpportunityViewMode.List;

  return (
    <div
      className={cn(
        "h-full animate-pulse rounded-card border border-line bg-surface p-5 motion-reduce:animate-none",
        isList ? "min-h-44 lg:min-h-40" : "min-h-72",
      )}
    >
      <div
        className={cn(
          "h-full gap-5",
          isList
            ? "grid lg:grid-cols-[minmax(0,1.35fr)_minmax(14rem,0.75fr)_auto] lg:items-center"
            : "flex flex-col",
        )}
      >
        <div className="space-y-3">
          <div className="h-4 w-2/5 rounded-control bg-surface-muted" />
          <div className="h-6 w-4/5 rounded-control bg-surface-muted" />
          <div className="h-3 w-full rounded-control bg-surface-muted/70" />
          <div className="h-3 w-3/4 rounded-control bg-surface-muted/70" />
        </div>
        <div className="space-y-3">
          <div className="h-5 w-3/5 rounded-control bg-surface-muted" />
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-pill bg-surface-muted" />
            <div className="h-6 w-20 rounded-pill bg-surface-muted" />
          </div>
        </div>
        <div
          className={cn(
            "mt-auto h-4 rounded-control bg-surface-muted/70",
            isList ? "w-24" : "w-2/3",
          )}
        />
      </div>
    </div>
  );
}

import { LoaderCircle } from "lucide-react";
import { resultsGridStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import { OpportunityViewMode } from "@/app/opportunities/_components/opportunities-screen/types";
import { OpportunitySkeleton } from "../opportunity-skeleton";

interface ListFooterProps {
  viewMode: OpportunityViewMode;
  hasMore: boolean;
  isFetchingMore: boolean;
  loadedPageLabel: string;
  scrollToLoadMoreLabel: string;
  allResultsLoadedLabel: string;
  loadingMoreLabel: string;
  skeletonCount: number;
}

export function ListFooter({
  viewMode,
  hasMore,
  isFetchingMore,
  loadedPageLabel,
  scrollToLoadMoreLabel,
  allResultsLoadedLabel,
  loadingMoreLabel,
  skeletonCount,
}: ListFooterProps): React.ReactNode {
  return (
    <div className="space-y-3 border-t-2 border-border pt-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">{loadedPageLabel}</p>
        <p className="text-xs text-muted-foreground">
          {hasMore ? scrollToLoadMoreLabel : allResultsLoadedLabel}
        </p>
      </div>

      {isFetchingMore ? (
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground" role="status">
            <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
            {loadingMoreLabel}
          </div>
          <div className={resultsGridStyles({ viewMode })}>
            {Array.from({ length: Math.min(skeletonCount, 3) }).map((_, index) => (
              <OpportunitySkeleton
                key={`more-skeleton-${index}`}
                compact={viewMode === OpportunityViewMode.Grid}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

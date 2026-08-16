"use client";

import * as React from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { panelStyles, resultsGridStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import { formatTemplate } from "@/lib/utils/format-template";
import { cn } from "@/lib/utils/tailwind";
import {
  OpportunityViewMode,
  type OpportunitiesListProps,
} from "@/app/opportunities/_components/opportunities-screen/types";
import { EmptyState } from "./empty-state";
import { ListFooter } from "./list-footer";
import { OpportunitySkeleton } from "./opportunity-skeleton";
import { ResultsGrid } from "./results-grid";

export function OpportunitiesList({
  items,
  viewMode,
  selectedOpportunityId,
  isLoading,
  isFetchingMore,
  hasMore,
  hasActiveFilters,
  rangeLabel,
  currentPage,
  totalPages,
  skeletonCount,
  onLoadMore,
  onClearFilters,
  onSelectOpportunity,
  onCommunitySelect,
  onAuthorSelect,
  hideCommunityIdentity,
  hideAuthorIdentity,
}: OpportunitiesListProps) {
  const { locale, messages } = useI18n();
  const listMessages = messages.opportunities.list;
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const target = sentinelRef.current;
    if (!target || !hasMore || isLoading || isFetchingMore) return;
    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || cancelled) return;
        observer.unobserve(target);
        void onLoadMore();
      },
      { rootMargin: "360px 0px" },
    );

    observer.observe(target);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [hasMore, isFetchingMore, isLoading, onLoadMore]);

  return (
    <section className={cn(panelStyles(), "space-y-4")}>
      <p className="text-sm text-muted-foreground">{rangeLabel}</p>

      {isLoading ? (
        <div className={resultsGridStyles({ viewMode })}>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <OpportunitySkeleton key={`skeleton-${index}`} compact={viewMode === OpportunityViewMode.Grid} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          hasActiveFilters={hasActiveFilters}
          noMatchesTitle={listMessages.noMatchesTitle}
          noResultsTitle={listMessages.noResultsTitle}
          noMatchesDescription={listMessages.noMatchesDescription}
          noResultsDescription={listMessages.noResultsDescription}
          clearFiltersLabel={listMessages.clearFilters}
          onClearFilters={onClearFilters}
        />
      ) : (
        <ResultsGrid
          items={items}
          viewMode={viewMode}
          selectedOpportunityId={selectedOpportunityId}
          onSelectOpportunity={onSelectOpportunity}
          onCommunitySelect={onCommunitySelect}
          onAuthorSelect={onAuthorSelect}
          hideCommunityIdentity={hideCommunityIdentity}
          hideAuthorIdentity={hideAuthorIdentity}
        />
      )}

      {items.length > 0 ? (
        <>
          <ListFooter
            viewMode={viewMode}
            hasMore={hasMore}
            isFetchingMore={isFetchingMore}
            loadedPageLabel={formatTemplate(listMessages.loadedPage, {
              page: currentPage.toLocaleString(locale),
              totalPages: totalPages.toLocaleString(locale),
            })}
            scrollToLoadMoreLabel={listMessages.scrollToLoadMore}
            allResultsLoadedLabel={listMessages.allResultsLoaded}
            loadingMoreLabel={listMessages.loadingMore}
            skeletonCount={skeletonCount}
          />
          <div ref={sentinelRef} className="h-px w-full" aria-hidden />
        </>
      ) : null}
    </section>
  );
}

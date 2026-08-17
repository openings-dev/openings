"use client";

import * as React from "react";
import { useI18n } from "@/components/providers/i18n-provider/use-i18n";
import { resultsGridStyles } from "@/app/opportunities/_components/opportunities-screen/styles";
import type { OpportunitiesListProps } from "@/app/opportunities/_components/opportunities-screen/types";
import { EmptyState } from "./empty-state";
import { ListFooter } from "./list-footer";
import { OpportunitySkeleton } from "./opportunity-skeleton";
import { ResultsGrid } from "./results-grid";

export function OpportunitiesList({
  items,
  viewMode,
  selectedOpportunityId,
  isLoading,
  hasLoadError,
  hasLoadMoreError,
  isFetchingMore,
  hasMore,
  hasActiveFilters,
  skeletonCount,
  onLoadMore,
  onClearFilters,
  onSelectOpportunity,
  onCommunitySelect,
  onAuthorSelect,
  hideCommunityIdentity,
  hideAuthorIdentity,
}: OpportunitiesListProps): React.ReactNode {
  const { messages } = useI18n();
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
    <section
      className="space-y-4"
      aria-labelledby="opportunity-results-heading"
      aria-busy={isLoading || isFetchingMore}
    >
      <h2 id="opportunity-results-heading" className="sr-only">
        {messages.opportunities.header.opportunitiesLabel}
      </h2>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {isLoading
          ? listMessages.loading
          : isFetchingMore
            ? listMessages.loadingMore
            : ""}
      </p>
      {isLoading ? (
        <div className={resultsGridStyles({ viewMode })}>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <OpportunitySkeleton key={`skeleton-${index}`} viewMode={viewMode} />
          ))}
        </div>
      ) : hasLoadError ? (
        <div className="rounded-card border border-line bg-surface-muted px-5 py-8 text-center text-sm text-muted-foreground" role="alert">
          {messages.opportunities.feedback.loadError}
        </div>
      ) : hasLoadMoreError && items.length === 0 ? (
        <div className="rounded-card border border-line bg-surface-muted px-5 py-8 text-center text-sm text-muted-foreground" role="alert">
          {messages.opportunities.feedback.partialLoadError}
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
            hasLoadMoreError={hasLoadMoreError}
            isFetchingMore={isFetchingMore}
            scrollToLoadMoreLabel={listMessages.scrollToLoadMore}
            allResultsLoadedLabel={listMessages.allResultsLoaded}
            loadingMoreLabel={listMessages.loadingMore}
            partialLoadErrorLabel={messages.opportunities.feedback.partialLoadError}
            skeletonCount={skeletonCount}
          />
          <div ref={sentinelRef} className="h-px w-full" aria-hidden />
        </>
      ) : null}
    </section>
  );
}

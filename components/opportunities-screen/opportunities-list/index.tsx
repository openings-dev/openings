"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, SearchX } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/tailwind";
import {
  panelStyles,
  resultsGridStyles,
} from "@/components/opportunities-screen/styles";
import type { OpportunitiesListProps } from "@/components/opportunities-screen/types";
import { OpportunityCard } from "@/components/opportunities-screen/opportunity-card";

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

function OpportunitySkeleton({ compact }: { compact: boolean }) {
  return (
    <div
      className={cn(
        "h-full rounded-xl border border-border/75 bg-card/75 p-4",
        compact ? "min-h-56" : "min-h-52",
      )}
    >
      <div className="animate-pulse space-y-3">
        <div className="h-4 w-3/5 rounded bg-muted" />
        <div className="h-3 w-full rounded bg-muted/80" />
        <div className="h-3 w-4/5 rounded bg-muted/80" />
        <div className="flex gap-2">
          <div className="h-5 w-16 rounded-full bg-muted" />
          <div className="h-5 w-20 rounded-full bg-muted" />
          <div className="h-5 w-14 rounded-full bg-muted" />
        </div>
        <div className="h-3 w-2/3 rounded bg-muted/80" />
      </div>
    </div>
  );
}

export function OpportunitiesList({
  items,
  viewMode,
  isLoading,
  isFetchingMore,
  hasMore,
  hasActiveFilters,
  rangeLabel,
  totalCount,
  currentPage,
  totalPages,
  skeletonCount,
  onLoadMore,
  onClearFilters,
  onCommunitySelect,
  onAuthorSelect,
}: OpportunitiesListProps) {
  const { locale, messages } = useI18n();
  const listMessages = messages.opportunities.list;
  const sentinelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const target = sentinelRef.current;

    if (!target || !hasMore || isLoading || isFetchingMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: "360px 0px" },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [hasMore, isFetchingMore, isLoading, items.length, onLoadMore]);

  return (
    <section className={cn(panelStyles(), "space-y-4")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">{rangeLabel}</p>
        <p className="text-xs text-muted-foreground">
          {formatTemplate(listMessages.totalMatches, {
            count: totalCount.toLocaleString(locale),
          })}
        </p>
      </div>

      {isLoading ? (
        <div className={resultsGridStyles({ viewMode })}>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <OpportunitySkeleton key={`skeleton-${index}`} compact={viewMode === "grid"} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex min-h-56 flex-col items-center justify-center rounded-xl border border-dashed border-border/75 bg-muted/25 px-4 text-center">
          <div className="mb-3 inline-flex size-9 items-center justify-center rounded-full border border-border/70 bg-background/60 text-muted-foreground">
            <SearchX className="size-4" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">
            {hasActiveFilters
              ? listMessages.noMatchesTitle
              : listMessages.noResultsTitle}
          </h3>
          <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
            {hasActiveFilters
              ? listMessages.noMatchesDescription
              : listMessages.noResultsDescription}
          </p>
          {hasActiveFilters ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={onClearFilters}
            >
              {listMessages.clearFilters}
            </Button>
          ) : null}
        </div>
      ) : (
        <motion.div
          layout
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={resultsGridStyles({ viewMode })}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
              >
                <OpportunityCard
                  item={item}
                  viewMode={viewMode}
                  onCommunitySelect={onCommunitySelect}
                  onAuthorSelect={onAuthorSelect}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {items.length > 0 ? (
        <div className="space-y-3 border-t border-border/70 pt-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              {formatTemplate(listMessages.loadedPage, {
                page: currentPage.toLocaleString(locale),
                totalPages: totalPages.toLocaleString(locale),
              })}
            </p>
            <p className="text-xs text-muted-foreground">
              {hasMore
                ? listMessages.scrollToLoadMore
                : listMessages.allResultsLoaded}
            </p>
          </div>

          {isFetchingMore ? (
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <LoaderCircle className="size-3.5 animate-spin" />
                {listMessages.loadingMore}
              </div>
              <div className={resultsGridStyles({ viewMode })}>
                {Array.from({ length: Math.min(skeletonCount, 3) }).map((_, index) => (
                  <OpportunitySkeleton
                    key={`more-skeleton-${index}`}
                    compact={viewMode === "grid"}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div ref={sentinelRef} className="h-px w-full" aria-hidden />
        </div>
      ) : null}
    </section>
  );
}

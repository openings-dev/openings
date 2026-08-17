import type { ReactNode } from "react";
import { RotateCcw, Search } from "lucide-react";
import { DirectorySortMode } from "@/app/_components/directory/types";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface DirectoryDiscoveryControlsProps {
  query: string;
  sort: DirectorySortMode;
  discoveryLabel: string;
  searchLabel: string;
  searchPlaceholder: string;
  sortLabel: string;
  sortCount: string;
  sortRecent: string;
  sortName: string;
  resultSummary?: string;
  clearLabel: string;
  hasActiveFilters: boolean;
  geography: ReactNode;
  onQueryChange: (query: string) => void;
  onSortChange: (sort: DirectorySortMode) => void;
  onClearAll: () => void;
}

export function DirectoryDiscoveryControls({
  query,
  sort,
  discoveryLabel,
  searchLabel,
  searchPlaceholder,
  sortLabel,
  sortCount,
  sortRecent,
  sortName,
  resultSummary,
  clearLabel,
  hasActiveFilters,
  geography,
  onQueryChange,
  onSortChange,
  onClearAll,
}: DirectoryDiscoveryControlsProps): React.ReactNode {
  return (
    <section
      className="rounded-card border border-line bg-surface p-4 sm:p-5"
      aria-label={discoveryLabel}
    >
      <div className="grid gap-4 md:grid-cols-[minmax(0,1.5fr)_minmax(13rem,0.5fr)] md:items-end">
        <Field label={searchLabel} controlId="directory-search">
          <Input
            type="search"
            value={query}
            placeholder={searchPlaceholder}
            leadingVisual={<Search />}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </Field>

        <Field label={sortLabel} controlId="directory-sort">
          <select
            value={sort}
            className="h-11 min-h-11 w-full rounded-control border border-control bg-surface px-3 text-base font-medium text-foreground outline-none transition-[background-color,border-color,box-shadow] hover:bg-surface-muted focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring md:text-sm"
            onChange={(event) =>
              onSortChange(event.target.value as DirectorySortMode)
            }
          >
            <option value={DirectorySortMode.Count}>{sortCount}</option>
            <option value={DirectorySortMode.Recent}>{sortRecent}</option>
            <option value={DirectorySortMode.Name}>{sortName}</option>
          </select>
        </Field>
      </div>

      {geography}

      <div className="mt-4 flex min-h-11 flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        {resultSummary ? (
          <p
            className="font-tabular min-h-5 text-sm font-semibold text-foreground"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {resultSummary}
          </p>
        ) : <span aria-hidden="true" />}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={!hasActiveFilters}
          onClick={onClearAll}
        >
          <RotateCcw aria-hidden="true" />
          {clearLabel}
        </Button>
      </div>
    </section>
  );
}

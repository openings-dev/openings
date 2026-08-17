import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { focusOpportunityResults } from "@/app/opportunities/_components/opportunities-screen/opportunity-card/trigger-contract";

interface EmptyStateProps {
  hasActiveFilters: boolean;
  noMatchesTitle: string;
  noResultsTitle: string;
  noMatchesDescription: string;
  noResultsDescription: string;
  clearFiltersLabel: string;
  onClearFilters: () => void;
}

export function EmptyState({
  hasActiveFilters,
  noMatchesTitle,
  noResultsTitle,
  noMatchesDescription,
  noResultsDescription,
  clearFiltersLabel,
  onClearFilters,
}: EmptyStateProps): React.ReactNode {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center border-y border-line px-4 py-10 text-center">
      <div className="mb-4 inline-flex size-10 items-center justify-center rounded-control bg-primary-soft text-primary-deep">
        <SearchX className="size-4" aria-hidden="true" />
      </div>
      <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-foreground">
        {hasActiveFilters ? noMatchesTitle : noResultsTitle}
      </h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {hasActiveFilters ? noMatchesDescription : noResultsDescription}
      </p>
      {hasActiveFilters ? (
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => {
            onClearFilters();
            focusOpportunityResults();
          }}
        >
          {clearFiltersLabel}
        </Button>
      ) : null}
    </div>
  );
}

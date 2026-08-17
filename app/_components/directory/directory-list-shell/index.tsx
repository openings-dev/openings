import type { ReactNode } from "react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DirectoryEmptyState {
  title: string;
  description: string;
  recoveryLabel?: string;
  recoveryHref?: string;
}

interface DirectoryListShellProps<TItem> {
  listLabel: string;
  emptyState: DirectoryEmptyState;
  items: TItem[];
  getKey: (item: TItem) => string;
  renderItem: (item: TItem) => ReactNode;
  onRecover?: () => void;
}

export function DirectoryListShell<TItem>({
  listLabel,
  emptyState,
  items,
  getKey,
  renderItem,
  onRecover,
}: DirectoryListShellProps<TItem>): ReactNode {
  return (
    <section aria-label={listLabel}>
      {items.length > 0 ? (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <li key={getKey(item)}>{renderItem(item)}</li>
          ))}
        </ul>
      ) : (
        <div className="border-y border-line bg-surface-muted/60 px-5 py-10 text-center sm:py-12">
          <SearchX
            className="mx-auto size-5 text-primary-deep"
            aria-hidden="true"
          />

          <h2 className="font-display mt-3 text-card-title font-semibold text-foreground">
            {emptyState.title}
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
            {emptyState.description}
          </p>

          {emptyState.recoveryLabel && onRecover ? (
            <Button
              type="button"
              variant="secondary"
              className="mt-5"
              onClick={() => {
                onRecover();
                window.requestAnimationFrame(() => {
                  document.getElementById("directory-search")?.focus();
                });
              }}
            >
              {emptyState.recoveryLabel}
            </Button>
          ) : emptyState.recoveryLabel && emptyState.recoveryHref ? (
            <Button asChild variant="secondary" className="mt-5">
              <a href={emptyState.recoveryHref}>{emptyState.recoveryLabel}</a>
            </Button>
          ) : null}
        </div>
      )}
    </section>
  );
}

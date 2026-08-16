import type { ReactNode } from "react";
import { formatTemplate } from "@/lib/utils/format-template";

interface DirectoryListShellProps<TItem> {
  locale: string;
  summaryTemplate: string;
  emptyTitle: string;
  emptyDescription: string;
  items: TItem[];
  getKey: (item: TItem) => string;
  renderItem: (item: TItem) => ReactNode;
}

export function DirectoryListShell<TItem>({
  locale,
  summaryTemplate,
  emptyTitle,
  emptyDescription,
  items,
  getKey,
  renderItem,
}: DirectoryListShellProps<TItem>): ReactNode {
  return (
    <section className="rounded-xl border-2 border-border bg-surface p-3 sm:p-4">
      <p className="font-tabular px-1 text-xs font-bold uppercase tracking-[0.08em] text-subtle-foreground">
        {formatTemplate(summaryTemplate, {
          count: items.length.toLocaleString(locale),
        })}
      </p>

      {items.length > 0 ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <li key={getKey(item)}>{renderItem(item)}</li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-xl border-2 border-dashed border-border bg-accent p-8 text-center">
          <p className="font-display text-base font-bold text-foreground">{emptyTitle}</p>
          <p className="mt-1 text-sm text-muted-foreground">{emptyDescription}</p>
        </div>
      )}
    </section>
  );
}

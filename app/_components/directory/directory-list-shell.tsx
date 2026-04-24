import type { ReactNode } from "react";
import { formatTemplate } from "@/app/opportunities/_components/opportunities-screen/shared/format-template";

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
}: DirectoryListShellProps<TItem>) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card/40 p-4">
      <p className="text-sm text-muted-foreground">
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
        <div className="mt-4 rounded-xl border border-dashed border-border/70 p-6 text-center">
          <p className="text-sm font-semibold text-foreground">{emptyTitle}</p>
          <p className="mt-1 text-sm text-muted-foreground">{emptyDescription}</p>
        </div>
      )}
    </section>
  );
}

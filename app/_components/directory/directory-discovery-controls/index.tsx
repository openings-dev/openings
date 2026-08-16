import { Search } from "lucide-react";

interface DirectoryDiscoveryControlsProps {
  query: string;
  sort: "count" | "recent" | "name";
  searchPlaceholder: string;
  sortLabel: string;
  sortCount: string;
  sortRecent: string;
  sortName: string;
  onQueryChange: (query: string) => void;
  onSortChange: (sort: "count" | "recent" | "name") => void;
}

export function DirectoryDiscoveryControls({ query, sort, searchPlaceholder, sortLabel, sortCount, sortRecent, sortName, onQueryChange, onSortChange }: DirectoryDiscoveryControlsProps): React.ReactNode {
  return (
    <div className="grid gap-3 rounded-xl border-2 border-border bg-card p-3 md:grid-cols-[minmax(0,1fr)_minmax(12rem,0.35fr)]">
      <label className="relative">
        <span className="sr-only">{searchPlaceholder}</span>
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-primary" />
        <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={searchPlaceholder} className="h-11 w-full rounded-lg border-2 border-border bg-card pl-10 pr-3 text-base font-semibold shadow-soft-sm outline-none placeholder:text-subtle-foreground focus-visible:ring-2 focus-visible:ring-ring md:text-sm" />
      </label>
      <label>
        <span className="sr-only">{sortLabel}</span>
        <select value={sort} onChange={(event) => onSortChange(event.target.value as "count" | "recent" | "name")} className="h-11 w-full rounded-lg border-2 border-border bg-card px-3 text-base font-bold shadow-soft-sm outline-none focus-visible:ring-2 focus-visible:ring-ring md:text-sm">
          <option value="count">{sortCount}</option>
          <option value="recent">{sortRecent}</option>
          <option value="name">{sortName}</option>
        </select>
      </label>
    </div>
  );
}

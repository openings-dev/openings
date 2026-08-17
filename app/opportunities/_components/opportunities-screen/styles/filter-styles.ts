import { cva } from "class-variance-authority";

export const controlBarStyles = "flex flex-col gap-3 border-y border-line py-3 sm:flex-row sm:items-center sm:justify-between";

export const compactSelectTriggerStyles = "min-w-0 text-sm [&>[data-slot='select-value']]:min-w-0 [&>[data-slot='select-value']]:truncate [&>[data-slot='select-value']]:whitespace-nowrap [&>[data-slot='select-value']]:text-left";

export const toggleGroupStyles = "inline-flex items-center rounded-control border border-control bg-surface p-0.5";

export const toggleItemStyles = cva(
  "inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-[calc(var(--shape-control)-0.125rem)] px-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      active: {
        true: "bg-accent text-accent-foreground",
        false: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: { active: false },
  },
);

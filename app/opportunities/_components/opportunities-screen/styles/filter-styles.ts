import { cva } from "class-variance-authority";

export const controlBarStyles = "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/80 bg-surface-elevated px-4 py-2.5 shadow-soft-sm";

export const filterGridStyles = "grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3";

export const filterFieldStyles = "space-y-1.5";

export const filterLabelStyles = "block text-[10px] font-bold uppercase tracking-[0.09em] text-subtle-foreground";

export const textInputStyles = "h-10 w-full rounded-lg border border-border/90 bg-surface-elevated px-3 text-base text-foreground shadow-soft-sm transition-[border-color,background-color,box-shadow] placeholder:text-subtle-foreground hover:border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-sm";

export const compactSelectTriggerStyles = "h-10 min-w-0 text-sm [&>[data-slot='select-value']]:min-w-0 [&>[data-slot='select-value']]:truncate [&>[data-slot='select-value']]:whitespace-nowrap [&>[data-slot='select-value']]:text-left";

export const toggleGroupStyles = "inline-flex items-center rounded-lg border border-border/70 bg-surface p-0.5";

export const toggleItemStyles = cva(
  "inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-all focus-visible:outline-none",
  {
    variants: {
      active: {
        true: "bg-surface-elevated text-foreground shadow-soft-sm",
        false: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: { active: false },
  },
);

export const chipStyles = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
  {
    variants: {
      active: {
        true: "border-primary/30 bg-accent text-accent-foreground",
        false: "border-border/70 bg-surface text-muted-foreground hover:border-input hover:text-foreground",
      },
    },
    defaultVariants: { active: false },
  },
);

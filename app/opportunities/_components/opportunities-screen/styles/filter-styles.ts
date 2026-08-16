import { cva } from "class-variance-authority";

export const controlBarStyles = "flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-border bg-surface-elevated px-4 py-2.5 shadow-soft-sm";

export const filterGridStyles = "grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3";

export const filterFieldStyles = "space-y-1.5";

export const filterLabelStyles = "block text-[10px] font-bold uppercase tracking-[0.09em] text-subtle-foreground";

export const textInputStyles = "h-10 w-full rounded-lg border-2 border-border bg-surface-elevated px-3 text-base font-medium text-foreground shadow-soft-sm transition-[background-color,box-shadow,transform] placeholder:text-subtle-foreground hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-surface hover:shadow-soft-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-sm";

export const compactSelectTriggerStyles = "h-10 min-w-0 text-sm [&>[data-slot='select-value']]:min-w-0 [&>[data-slot='select-value']]:truncate [&>[data-slot='select-value']]:whitespace-nowrap [&>[data-slot='select-value']]:text-left";

export const toggleGroupStyles = "inline-flex items-center rounded-lg border-2 border-border bg-surface p-0.5 shadow-soft-sm";

export const toggleItemStyles = cva(
  "inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-all focus-visible:outline-none",
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

export const chipStyles = cva(
  "inline-flex items-center gap-1 rounded-md border-2 px-2 py-0.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
  {
    variants: {
      active: {
        true: "border-border bg-accent text-accent-foreground shadow-soft-sm",
        false: "border-border bg-surface text-muted-foreground hover:bg-card hover:text-foreground",
      },
    },
    defaultVariants: { active: false },
  },
);

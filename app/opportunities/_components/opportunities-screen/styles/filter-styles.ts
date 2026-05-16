import { cva } from "class-variance-authority";

export const controlBarStyles = cva(
  "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/70 bg-card/42 px-4 py-2.5 shadow-[0_18px_60px_-54px_rgb(0_0_0/0.45)] backdrop-blur",
);

export const filterGridStyles = cva("grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3");

export const filterFieldStyles = cva("space-y-1.5");

export const filterLabelStyles = cva(
  "block text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground/70",
);

export const textInputStyles = cva(
  "h-9 w-full rounded-md border border-input/75 bg-background/62 px-3 text-sm text-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.03)] transition-colors placeholder:text-muted-foreground/58 hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
);

export const compactSelectTriggerStyles = cva(
  "h-9 min-w-0 border-input/75 bg-background/62 text-sm shadow-[inset_0_1px_0_rgb(255_255_255/0.03)] hover:border-border [&>[data-slot='select-value']]:min-w-0 [&>[data-slot='select-value']]:truncate [&>[data-slot='select-value']]:whitespace-nowrap [&>[data-slot='select-value']]:text-left",
);

export const toggleGroupStyles = cva(
  "inline-flex items-center rounded-md border border-border/70 bg-background/45 p-0.5",
);

export const toggleItemStyles = cva(
  "inline-flex h-7 items-center gap-1.5 rounded-[calc(var(--radius)-2px)] px-2.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
  {
    variants: {
      active: {
        true: "bg-card text-foreground shadow-[0_1px_8px_-5px_rgb(0_0_0/0.45)]",
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
        true: "border-primary/35 bg-primary/10 text-foreground",
        false: "border-border/70 bg-muted/24 text-muted-foreground hover:border-primary/30 hover:text-foreground",
      },
    },
    defaultVariants: { active: false },
  },
);

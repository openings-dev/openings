import { cva } from "class-variance-authority";

export const opportunitiesScreenStyles = cva(
  "mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-16 pt-10 sm:px-6 lg:px-8",
);

export const opportunitiesHeaderStyles = cva("space-y-3");

export const opportunitiesKickerStyles = cva(
  "text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
);

export const opportunitiesTitleStyles = cva(
  "text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl",
);

export const opportunitiesDescriptionStyles = cva(
  "max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base",
);

export const panelStyles = cva(
  "rounded-2xl border border-border/70 bg-card/80 p-4 shadow-[0_16px_40px_-30px_rgb(0_0_0/0.45)] backdrop-blur sm:p-5",
);

export const filterGridStyles = cva(
  "grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4",
);

export const filterFieldStyles = cva("space-y-1.5");

export const filterLabelStyles = cva(
  "block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground",
);

export const textInputStyles = cva(
  "h-9 w-full rounded-md border border-input/85 bg-background/70 px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
);

export const compactSelectTriggerStyles = cva(
  "h-9 border-input/85 bg-background/70 text-sm",
);

export const toggleGroupStyles = cva(
  "inline-flex items-center rounded-lg border border-border/80 bg-muted/45 p-1",
);

export const toggleItemStyles = cva(
  "inline-flex h-8 items-center gap-2 rounded-md px-2.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
  {
    variants: {
      active: {
        true: "bg-background text-foreground shadow-sm",
        false: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export const chipStyles = cva(
  "inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
  {
    variants: {
      active: {
        true: "border-border/90 bg-muted text-foreground",
        false: "border-border/70 bg-background/60 text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export const resultsGridStyles = cva("grid gap-3", {
  variants: {
    viewMode: {
      list: "grid-cols-1",
      grid: "grid-cols-1 md:grid-cols-2 2xl:grid-cols-3",
    },
  },
  defaultVariants: {
    viewMode: "list",
  },
});

export const opportunityCardStyles = cva(
  "group h-full rounded-xl border border-border/75 bg-card/75 p-4 text-left transition-all duration-200 hover:border-border hover:bg-card/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
  {
    variants: {
      viewMode: {
        list: "",
        grid: "",
      },
    },
    defaultVariants: {
      viewMode: "list",
    },
  },
);

export const metadataRowStyles = cva(
  "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground",
);

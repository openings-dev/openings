import { cva } from "class-variance-authority";

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
  "group relative h-full rounded-xl border border-border/80 bg-surface-elevated p-4 text-left shadow-soft-sm transition-[border-color,background-color,box-shadow] duration-150 hover:border-primary/30 hover:bg-card hover:shadow-soft-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      viewMode: { list: "", grid: "" },
      selected: {
        true: "border-primary/45 bg-accent/70 shadow-soft-md hover:border-primary/55",
        false: "",
      },
    },
    defaultVariants: {
      viewMode: "list",
      selected: false,
    },
  },
);

export const metadataRowStyles = "flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-muted-foreground";

export const cardPersonButtonStyles = "-mx-1.5 -my-1 flex items-center gap-2.5 rounded-md px-1.5 py-1 transition-colors hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card";

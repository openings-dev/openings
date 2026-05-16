import { cva } from "class-variance-authority";

export const resultsGridStyles = cva("grid gap-2.5", {
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
  "group relative h-full rounded-lg border border-border/70 bg-card/46 p-4 text-left shadow-[0_20px_80px_-68px_rgb(0_0_0/0.65)] backdrop-blur transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/28 hover:bg-card/72 hover:shadow-[0_26px_90px_-64px_rgb(0_0_0/0.72)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
  {
    variants: {
      viewMode: { list: "", grid: "" },
      selected: {
        true: "border-primary/45 bg-primary/10 hover:border-primary/55",
        false: "",
      },
    },
    defaultVariants: {
      viewMode: "list",
      selected: false,
    },
  },
);

export const metadataRowStyles = cva(
  "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground",
);

export const cardPersonButtonStyles = cva(
  "-mx-1.5 -my-1 flex items-center gap-2.5 rounded-md px-1.5 py-1 transition-colors hover:bg-muted/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
);

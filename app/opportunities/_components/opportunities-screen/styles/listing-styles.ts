import { cva } from "class-variance-authority";

export const resultsGridStyles = cva("grid min-w-0 items-stretch gap-3 sm:gap-4", {
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
  "group relative h-full overflow-hidden rounded-card border border-line bg-surface p-4 text-left transition-[background-color,border-color,box-shadow] duration-200 before:absolute before:bottom-4 before:left-0 before:top-4 before:w-0.5 before:rounded-r-full before:bg-primary before:transition-opacity hover:border-primary/30 hover:bg-surface-elevated has-focus-visible:ring-2 has-focus-visible:ring-ring has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background sm:p-5",
  {
    variants: {
      viewMode: {
        list: "min-h-44 lg:min-h-40",
        grid: "min-h-72",
      },
      selected: {
        true: "border-primary/40 bg-primary-soft/40 before:opacity-100",
        false: "before:opacity-0",
      },
    },
    defaultVariants: {
      viewMode: "list",
      selected: false,
    },
  },
);

export const metadataRowStyles = "flex flex-wrap items-center gap-x-3 gap-y-2";

export const cardPersonButtonStyles = "pointer-events-auto -mx-1.5 -my-1.5 inline-flex min-h-11 min-w-0 items-center gap-2 rounded-control px-1.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

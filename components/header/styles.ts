import { cva } from "class-variance-authority";

export const headerStyles = cva(
  "z-40 w-full border-b border-border/65 bg-background/82 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/72",
  {
    variants: {
      position: {
        sticky: "sticky top-0",
        static: "relative",
      },
    },
    defaultVariants: {
      position: "sticky",
    },
  },
);

export const headerContainerStyles = cva(
  "mx-auto grid h-16 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:px-8",
);

export const headerActionsStyles = cva(
  "flex min-w-0 items-center justify-end gap-1.5 sm:gap-2.5",
);

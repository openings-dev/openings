import { cva } from "class-variance-authority";

export const headerStyles = cva(
  "z-40 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60",
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
  "mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8",
);

export const headerActionsStyles = cva(
  "flex items-center justify-end gap-2 sm:gap-3",
);

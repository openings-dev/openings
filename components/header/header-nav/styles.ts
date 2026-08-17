import { cva } from "class-variance-authority";

export const headerNavLinkStyles = cva(
  "relative inline-flex min-h-11 items-center rounded-control px-3 text-sm font-medium transition-colors duration-200 after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-center after:rounded-full after:bg-primary after:transition-transform after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      active: {
        true: "text-foreground after:scale-x-100",
        false:
          "text-muted-foreground after:scale-x-0 hover:bg-surface-muted hover:text-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

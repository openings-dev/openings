import { cva } from "class-variance-authority";

export const headerNavLinkStyles = cva(
  "rounded-lg px-3 py-1.5 text-[13px] font-medium transition-[color,background-color,box-shadow] focus-visible:outline-none",
  {
    variants: {
      active: {
        true: "bg-surface-elevated text-foreground shadow-soft-sm",
        false: "text-muted-foreground hover:bg-surface-elevated/65 hover:text-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

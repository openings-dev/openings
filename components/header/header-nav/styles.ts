import { cva } from "class-variance-authority";

export const headerNavLinkStyles = cva(
  "rounded-md border-2 border-transparent px-3 py-1.5 text-[13px] font-bold transition-[color,background-color,transform,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      active: {
        true: "border-border bg-accent text-accent-foreground shadow-soft-sm",
        false: "text-muted-foreground hover:bg-card hover:text-foreground",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

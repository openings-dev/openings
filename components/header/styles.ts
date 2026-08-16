import { cva } from "class-variance-authority";

export const headerStyles = cva(
  "z-40 w-full border-b-2 border-border bg-background",
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

import { cva } from "class-variance-authority";

export const headerStyles = cva(
  "z-40 w-full border-b border-line bg-paper/90 supports-[backdrop-filter]:backdrop-blur-xl",
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

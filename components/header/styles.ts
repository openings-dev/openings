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

import { cva } from "class-variance-authority";

export const headerStyles = cva(
  "z-40 w-full border-b border-border/70 bg-background/88 shadow-[0_1px_0_rgb(255_255_255/0.04)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/78",
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

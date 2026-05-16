import { cva } from "class-variance-authority";

export const headerNavStyles = cva(
  "hidden items-center justify-center gap-7 justify-self-center md:flex",
);

export const headerNavLinkStyles = cva(
  "rounded-md px-2 py-1.5 text-sm font-medium text-foreground/78 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      active: {
        true: "text-foreground",
        false: "",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

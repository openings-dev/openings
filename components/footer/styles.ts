import { cva } from "class-variance-authority";

export const footerSocialButtonStyles = cva(
  "size-11 rounded-control border border-night-foreground/20 bg-transparent text-night-foreground hover:border-night-foreground/35 hover:bg-night-foreground/10",
  {
    variants: {
      tone: {
        default: "",
        subtle: "bg-night-foreground/5",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export const footerLinkStyles = cva(
  "inline-flex min-h-11 items-center rounded-control text-sm font-medium text-night-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-night-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      intent: {
        default: "",
        prominent: "text-night-foreground hover:text-night-foreground",
      },
    },
    defaultVariants: { intent: "default" },
  },
);

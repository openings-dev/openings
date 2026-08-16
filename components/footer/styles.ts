import { cva } from "class-variance-authority";

export const footerSocialButtonStyles = cva(
  "size-9 rounded-lg border border-border/70 bg-surface-elevated text-muted-foreground shadow-soft-sm transition-colors hover:border-input hover:bg-surface hover:text-foreground",
  {
    variants: {
      tone: {
        default: "",
        subtle: "border-border/55 bg-transparent shadow-none dark:bg-transparent",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export const footerLinkStyles = cva(
  "inline-flex rounded-sm text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted",
  {
    variants: {
      intent: {
        default: "",
        prominent: "text-foreground/90 hover:text-foreground",
      },
    },
    defaultVariants: { intent: "default" },
  },
);

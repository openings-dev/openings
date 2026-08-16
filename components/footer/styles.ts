import { cva } from "class-variance-authority";

export const footerSocialButtonStyles = cva(
  "size-10 rounded-lg border-2 border-border bg-card text-foreground shadow-soft-sm transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-soft-md",
  {
    variants: {
      tone: {
        default: "",
        subtle: "bg-surface",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export const footerLinkStyles = cva(
  "inline-flex rounded-sm text-sm font-semibold text-muted-foreground decoration-2 underline-offset-4 transition-colors duration-200 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted",
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

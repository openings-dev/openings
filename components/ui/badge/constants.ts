import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex max-w-full items-center gap-1.5 rounded-pill border font-medium leading-snug tabular-nums [overflow-wrap:anywhere] [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        neutral: "border-line bg-surface-muted text-muted-foreground",
        primary:
          "border-primary/25 bg-primary-soft text-primary-deep",
        positive:
          "border-positive-foreground/25 bg-positive text-positive-foreground",
        warning:
          "border-warning-foreground/25 bg-warning text-warning-foreground",
        informational:
          "border-info-foreground/25 bg-info text-info-foreground",
      },
      size: {
        compact: "min-h-6 px-2 py-0.5 text-xs",
        default: "min-h-7 px-2.5 py-1 text-label",
      },
    },
    defaultVariants: {
      tone: "neutral",
      size: "default",
    },
  },
);

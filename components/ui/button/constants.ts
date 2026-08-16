import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex touch-manipulation items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-[color,background-color,border-color,box-shadow,transform] duration-150 disabled:pointer-events-none disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-primary/80 bg-primary text-primary-foreground shadow-soft-sm hover:bg-primary-hover hover:shadow-soft-md",
        destructive:
          "border border-red-500/80 bg-red-500 text-white shadow-soft-sm hover:bg-red-600",
        outline:
          "border border-border/90 bg-surface-elevated text-foreground shadow-soft-sm hover:border-input hover:bg-surface",
        secondary:
          "border border-transparent bg-surface text-foreground hover:bg-muted",
        ghost: "border border-transparent text-muted-foreground hover:bg-surface hover:text-foreground",
        link: "text-primary underline-offset-4 hover:text-primary-hover hover:underline",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 px-6",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 whitespace-nowrap rounded-control border border-transparent text-sm font-semibold leading-none transition-[color,background-color,border-color,box-shadow,filter] duration-200 disabled:pointer-events-none disabled:opacity-45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:brightness-[0.97] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "rounded-pill border-primary bg-primary text-primary-foreground hover:border-primary-hover hover:bg-primary-hover",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:brightness-95",
        outline:
          "border-control bg-transparent text-foreground hover:border-primary hover:bg-primary-soft",
        secondary:
          "border-control bg-surface text-foreground hover:bg-surface-muted",
        ghost:
          "border-transparent bg-transparent text-muted-foreground hover:bg-surface-muted hover:text-foreground",
        link:
          "border-transparent bg-transparent px-1 text-primary-deep underline-offset-4 hover:text-foreground hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-11 px-3.5 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "size-11 min-w-11 rounded-control p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

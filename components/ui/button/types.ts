import type * as React from "react";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "./constants";

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

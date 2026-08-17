import type * as React from "react";
import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "./constants";

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onClick" | "tabIndex">,
    VariantProps<typeof badgeVariants> {}

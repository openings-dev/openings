import type React from "react";
import { cn } from "@/lib/utils/tailwind";
import { badgeVariants } from "./constants";
import type { BadgeProps } from "./types";

export function Badge({
  className,
  tone,
  size,
  ...props
}: BadgeProps): React.ReactNode {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ tone, size, className }))}
      {...props}
    />
  );
}

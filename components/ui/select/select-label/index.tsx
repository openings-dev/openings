"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import type React from "react";
import { cn } from "@/lib/utils/tailwind";

export function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>): React.ReactNode {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  );
}

"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import type React from "react";
import { cn } from "@/lib/utils/tailwind";

export function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>): React.ReactNode {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

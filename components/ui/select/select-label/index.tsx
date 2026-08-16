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
      className={cn("px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-subtle-foreground", className)}
      {...props}
    />
  );
}

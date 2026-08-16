"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronUp } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils/tailwind";

export function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>): React.ReactNode {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <ChevronUp className="size-4" aria-hidden="true" />
    </SelectPrimitive.ScrollUpButton>
  );
}

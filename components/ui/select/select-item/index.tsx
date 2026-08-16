"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check } from "lucide-react";
import type React from "react";
import { cn } from "@/lib/utils/tailwind";

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>): React.ReactNode {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center gap-2 rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-muted/70 focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4" aria-hidden="true" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

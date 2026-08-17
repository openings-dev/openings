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
        "relative flex min-h-11 w-full min-w-0 cursor-default select-none items-center gap-2 rounded-control py-2 pl-8 pr-2.5 text-sm text-foreground outline-none transition-colors duration-150 focus:bg-primary-soft focus:text-primary-deep data-[disabled]:pointer-events-none data-[disabled]:opacity-40 data-[state=checked]:bg-primary-soft data-[state=checked]:font-medium data-[state=checked]:text-primary-deep",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-3.5 text-primary-deep" aria-hidden="true" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText className="min-w-0 flex-1 truncate">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

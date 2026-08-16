"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import type React from "react";

export function Select(
  props: React.ComponentProps<typeof SelectPrimitive.Root>,
): React.ReactNode {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import type React from "react";

export function SelectValue(
  props: React.ComponentProps<typeof SelectPrimitive.Value>,
): React.ReactNode {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

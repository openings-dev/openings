"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import type React from "react";

export function SelectGroup(
  props: React.ComponentProps<typeof SelectPrimitive.Group>,
): React.ReactNode {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

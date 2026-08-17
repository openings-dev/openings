"use client";

import * as React from "react";
import { cn } from "@/lib/utils/tailwind";
import type { InputProps } from "./types";

function hasInvalidState(
  value: React.AriaAttributes["aria-invalid"],
): boolean {
  return value !== undefined && value !== false && value !== "false";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      leadingVisual,
      trailingVisual,
      disabled,
      readOnly,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref,
  ): React.ReactNode => {
    const invalid = hasInvalidState(ariaInvalid);

    return (
      <span
        data-slot="input-root"
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        data-invalid={invalid || undefined}
        className={cn(
          "flex h-[2.875rem] min-h-[2.875rem] min-w-0 items-center gap-2 rounded-control border border-control bg-surface px-3 text-foreground transition-[background-color,border-color,box-shadow] duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring data-[disabled=true]:cursor-not-allowed data-[disabled=true]:bg-surface-muted data-[disabled=true]:opacity-50 data-[invalid=true]:border-destructive data-[invalid=true]:focus-within:border-destructive data-[invalid=true]:focus-within:ring-destructive data-[readonly=true]:bg-surface-muted/65",
          containerClassName,
        )}
      >
        {leadingVisual ? (
          <span
            className="pointer-events-none flex shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4"
            aria-hidden="true"
          >
            {leadingVisual}
          </span>
        ) : null}
        <input
          ref={ref}
          data-slot="input"
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={ariaInvalid}
          className={cn(
            "h-full min-w-0 flex-1 bg-transparent text-base font-normal text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed read-only:cursor-default md:text-sm",
            className,
          )}
          {...props}
        />
        {trailingVisual ? (
          <span
            className="pointer-events-none flex shrink-0 items-center justify-center text-muted-foreground [&_svg]:size-4"
            aria-hidden="true"
          >
            {trailingVisual}
          </span>
        ) : null}
      </span>
    );
  },
);

Input.displayName = "Input";

export { Input };

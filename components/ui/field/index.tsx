"use client";

import * as React from "react";
import { cn } from "@/lib/utils/tailwind";
import type { FieldControlProps, FieldProps } from "./types";

function joinDescriptionIds(...values: Array<string | undefined>): string | undefined {
  const identifiers = values.flatMap((value) => value?.split(/\s+/).filter(Boolean) ?? []);

  return identifiers.length > 0 ? [...new Set(identifiers)].join(" ") : undefined;
}

export function Field({
  label,
  hint,
  error,
  required = false,
  controlId,
  children,
  className,
  ...props
}: FieldProps): React.ReactNode {
  const generatedId = React.useId();
  const childProps = typeof children === "function" ? undefined : children.props;
  const resolvedControlId = controlId ?? childProps?.id ?? `${generatedId}-control`;
  const hintId = hint ? `${resolvedControlId}-hint` : undefined;
  const errorId = error ? `${resolvedControlId}-error` : undefined;
  const describedBy = joinDescriptionIds(
    childProps?.["aria-describedby"],
    hintId,
    errorId,
  );
  const isInvalid = Boolean(error) || childProps?.["aria-invalid"];
  const childAriaRequired = childProps?.["aria-required"];
  const isRequired =
    required ||
    childProps?.required === true ||
    childAriaRequired === true ||
    childAriaRequired === "true";
  const controlProps: FieldControlProps = {
    id: resolvedControlId,
    required: isRequired || undefined,
    "aria-required": isRequired || undefined,
    "aria-describedby": describedBy,
    "aria-invalid": isInvalid || undefined,
  };
  const control =
    typeof children === "function"
      ? children(controlProps)
      : React.cloneElement(children, controlProps);

  return (
    <div
      data-slot="field"
      data-invalid={Boolean(error) || undefined}
      className={cn("grid gap-1.5", className)}
      {...props}
    >
      <label
        htmlFor={resolvedControlId}
        className="text-label font-medium text-foreground"
      >
        {label}
        {isRequired ? (
          <span className="ml-1 text-destructive" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {control}
      {hint ? (
        <p id={hintId} className="text-metadata text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={errorId}
          className="text-metadata font-medium text-destructive"
          aria-live="polite"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

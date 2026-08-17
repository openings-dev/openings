import type * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingVisual?: React.ReactNode;
  trailingVisual?: React.ReactNode;
  containerClassName?: string;
}

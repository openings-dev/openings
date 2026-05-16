import { cva } from "class-variance-authority";

export const themeToggleWrapperStyles = cva("flex items-center");

export const themeToggleButtonStyles = cva(
  "size-9 rounded-md border-border/70 bg-transparent text-foreground/78 shadow-none hover:bg-muted/55 hover:text-foreground",
);

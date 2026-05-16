import { cva } from "class-variance-authority";

export const languageSwitcherWrapperStyles = cva("");

export const languageSwitcherTriggerStyles = cva(
  "h-9 gap-1.5 rounded-md border-0 bg-transparent px-2 text-sm font-medium text-foreground/75 shadow-none transition-colors hover:bg-muted/55 hover:text-foreground focus:ring-0 focus:ring-offset-0 data-[state=open]:bg-muted/55 data-[state=open]:text-foreground",
);

export const languageSwitcherContentStyles = cva(
  "min-w-[140px] rounded-lg border border-border/70 bg-card p-1 shadow-[0_18px_60px_-36px_rgb(0_0_0/0.6)] backdrop-blur-xl",
);

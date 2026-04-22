import { cva } from "class-variance-authority";

export const languageSwitcherWrapperStyles = cva("");

export const languageSwitcherTriggerStyles = cva(
  "h-8 gap-1.5 rounded-md border-0 bg-transparent px-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground focus:ring-0 focus:ring-offset-0 data-[state=open]:bg-muted/50 data-[state=open]:text-foreground",
);

export const languageSwitcherContentStyles = cva(
  "min-w-[140px] rounded-xl border border-border/50 bg-card p-1 shadow-lg backdrop-blur-xl",
);

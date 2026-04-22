import { cva } from "class-variance-authority";

export const brandLogoRootStyles = cva(
  "inline-flex items-center gap-2.5 rounded-lg px-1.5 py-1 transition-all hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

export const brandLogoMarkStyles = cva(
  "relative size-8 overflow-hidden rounded-[8px] shadow-sm ring-1 ring-border/50",
);

export const brandLogoTextStyles = cva("hidden sm:block");

export const brandLogoTitleStyles = cva(
  "text-[15px] font-medium tracking-tight text-foreground",
);

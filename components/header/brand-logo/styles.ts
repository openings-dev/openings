import { cva } from "class-variance-authority";

export const brandLogoRootStyles = cva(
  "inline-flex items-center gap-1 rounded-lg py-1 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted",
);

export const brandLogoWordStyles = cva(
  "text-3xl font-semibold leading-none text-foreground sm:text-[2rem]",
);

export const brandLogoBadgeStyles = cva(
  "mt-1 inline-flex rounded-[5px] bg-primary px-1.5 py-0.5 text-sm font-semibold leading-none text-primary-foreground sm:text-[15px]",
);

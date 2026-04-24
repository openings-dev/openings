import { cva } from "class-variance-authority";

export const documentPageMainStyles = cva(
  "mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-20 sm:px-6 lg:px-8",
);

export const documentPageIntroCardStyles = cva(
  "rounded-2xl border border-border/70 bg-card p-8 shadow-[0_12px_36px_-20px_rgb(0_0_0/0.22)]",
);

export const documentPageIntroKickerStyles = cva(
  "text-sm font-medium tracking-[0.02em] text-muted-foreground",
);

export const documentPageIntroTitleStyles = cva(
  "mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl",
);

export const documentPageIntroDescriptionStyles = cva(
  "mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg",
);

export const documentPageContentCardStyles = cva(
  "mt-8 rounded-2xl border border-border/70 bg-card px-6 py-7 shadow-[0_10px_30px_-24px_rgb(0_0_0/0.35)] sm:px-8 sm:py-9",
);

export const documentPageSourceStyles = cva(
  "mt-6 text-sm text-muted-foreground/95",
);

export const markdownArticleStyles = cva("space-y-5 text-[15px] leading-7 text-foreground/95");

export const markdownHeadingStyles = cva("font-semibold tracking-[-0.02em] text-foreground");

export const markdownH1Styles = cva("text-3xl sm:text-[2rem]");
export const markdownH2Styles = cva("text-2xl sm:text-[1.6rem]");
export const markdownH3Styles = cva("text-xl sm:text-[1.3rem]");
export const markdownH4Styles = cva("text-lg");

export const markdownParagraphStyles = cva("text-[15px] leading-7 text-foreground/90");

export const markdownListStyles = cva(
  "space-y-2 pl-5 text-[15px] leading-7 text-foreground/90 marker:text-muted-foreground",
);

export const markdownBlockquoteStyles = cva(
  "border-l-2 border-border pl-4 italic text-muted-foreground",
);

export const markdownCodeBlockStyles = cva(
  "overflow-x-auto rounded-xl border border-border/70 bg-muted/45 px-4 py-3 text-[13px] leading-6 text-foreground",
);

export const markdownInlineCodeStyles = cva(
  "rounded-sm bg-muted px-1.5 py-0.5 text-[13px] text-foreground",
);

export const markdownLinkStyles = cva(
  "font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary",
);

export const markdownDividerStyles = cva("border-border/70");

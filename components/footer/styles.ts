import { cva } from "class-variance-authority";

export const footerRootStyles = cva(
  "relative mt-20 border-t border-border/40 bg-background text-foreground dark:bg-background",
);

export const footerTopDividerStyles = cva(
  "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent",
);

export const footerSurfaceStyles = cva(
  "pointer-events-none absolute inset-0 bg-[radial-gradient(120%_140%_at_100%_0%,rgba(148,163,184,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(120%_150%_at_100%_0%,rgba(255,255,255,0.03)_0%,transparent_50%)]",
);

export const footerContainerStyles = cva(
  "relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-8 pt-12 sm:px-6 sm:pt-14 lg:px-8",
);

export const footerMainGridStyles = cva(
  "grid gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.65fr)] md:gap-8 lg:gap-10",
);

export const footerBrandRootStyles = cva("space-y-5");

export const footerBrandAnchorStyles = cva(
  "inline-flex items-center gap-3 rounded-lg px-1 py-1 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted",
);

export const footerBrandMarkStyles = cva(
  "relative size-9 overflow-hidden rounded-[10px] border border-border/70 bg-card shadow-[0_1px_2px_rgb(0_0_0/0.06)]",
);

export const footerBrandTextStyles = cva("flex flex-col leading-none");

export const footerBrandTitleStyles = cva(
  "text-sm font-semibold tracking-[-0.02em] text-foreground",
);

export const footerBrandTaglineStyles = cva("text-xs text-muted-foreground");

export const footerBrandDescriptionStyles = cva(
  "max-w-sm text-sm leading-6 text-muted-foreground",
);

export const footerSocialListStyles = cva("flex items-center gap-2");

export const footerSocialButtonStyles = cva(
  "h-9 w-9 rounded-lg border border-border/70 bg-background/70 text-muted-foreground shadow-sm transition-colors hover:bg-background hover:text-foreground dark:bg-background/20 dark:hover:bg-background/35",
  {
    variants: {
      tone: {
        default: "",
        subtle: "border-border/55 bg-transparent shadow-none dark:bg-transparent",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

export const footerLinksGridStyles = cva(
  "grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:gap-x-12",
);

export const footerLinksGroupStyles = cva("space-y-3");

export const footerLinksHeadingStyles = cva(
  "text-sm font-semibold tracking-[-0.01em] text-foreground/95",
);

export const footerLinksListStyles = cva("space-y-2.5");

export const footerLinkStyles = cva(
  "inline-flex rounded-sm text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-muted",
  {
    variants: {
      intent: {
        default: "",
        prominent: "text-foreground/90 hover:text-foreground",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  },
);

export const footerBottomRootStyles = cva(
  "flex flex-col gap-4 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between",
);

export const footerBottomMetaStackStyles = cva("space-y-1");

export const footerBottomTextStyles = cva("text-sm text-muted-foreground");

export const footerBottomActionsStyles = cva(
  "flex flex-wrap items-center gap-2 sm:justify-end",
);

export const footerSupportButtonStyles = cva(
  "h-8 rounded-md border border-border/70 bg-background/70 px-3 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:bg-background hover:text-foreground dark:bg-background/20 dark:hover:bg-background/35",
);

export const footerSignatureStyles = cva(
  "text-sm font-medium tracking-[-0.01em] text-foreground/90",
);

import { cva } from "class-variance-authority";

export const opportunitiesScreenStyles = "mx-auto flex w-full max-w-[90rem] flex-col gap-6 px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8 xl:px-10 xl:pt-12";

export const opportunitiesBodyStyles = "grid grid-cols-1 gap-5 lg:grid-cols-[minmax(230px,270px)_minmax(0,1fr)] lg:gap-5";

export const opportunitiesSidebarStyles = "grid grid-cols-1 gap-3 lg:sticky lg:top-20 lg:self-start";

export const opportunitiesMainStyles = "flex min-w-0 flex-col gap-4";

export const opportunitiesSnapshotStatusStyles = "rounded-xl border border-border/70 bg-surface/60 px-4 py-3 sm:px-5";

export const opportunitiesHeaderStyles = "max-w-4xl space-y-2.5";

export const opportunitiesKickerStyles = "text-[11px] font-bold uppercase tracking-[0.14em] text-primary";

export const opportunitiesTitleStyles = "font-display text-balance text-3xl font-bold leading-[1.08] tracking-[-0.045em] text-foreground sm:text-4xl lg:text-[2.75rem]";

export const opportunitiesDescriptionStyles = "max-w-2xl text-[15px] leading-6 text-muted-foreground sm:text-base sm:leading-7";

export const panelStyles = "rounded-xl border border-border/80 bg-surface-elevated p-4 shadow-soft-sm";

export const splitViewStyles = cva("grid gap-4", {
  variants: {
    open: {
      true: "xl:grid-cols-[minmax(0,1fr)_minmax(360px,420px)]",
      false: "grid-cols-1",
    },
  },
  defaultVariants: {
    open: false,
  },
});

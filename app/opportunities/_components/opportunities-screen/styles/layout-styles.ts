import { cva } from "class-variance-authority";

export const opportunitiesScreenStyles = "mx-auto flex w-full max-w-[90rem] flex-col gap-6 px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8 xl:px-10 xl:pt-12";

export const opportunitiesBodyStyles = "grid grid-cols-1 gap-5";

export const opportunitiesSidebarStyles = "hidden";

export const opportunitiesMainStyles = "flex min-w-0 flex-col gap-4";

export const opportunitiesSnapshotStatusStyles = "rounded-xl border-2 border-border bg-[#fdf2aa] px-4 py-3 text-[#231f20] shadow-soft-sm dark:bg-[#645911] dark:text-foreground sm:px-5";

export const opportunitiesHeaderStyles = "max-w-5xl space-y-2.5 rounded-xl border-2 border-border bg-accent p-6 shadow-soft-lg sm:p-8";

export const opportunitiesKickerStyles = "text-[11px] font-black uppercase tracking-[0.16em] text-accent-foreground";

export const opportunitiesTitleStyles = "font-display text-balance text-3xl font-black leading-[1.04] tracking-[-0.05em] text-foreground sm:text-5xl lg:text-[3.4rem]";

export const opportunitiesDescriptionStyles = "max-w-2xl text-[15px] leading-6 text-muted-foreground sm:text-base sm:leading-7";

export const panelStyles = "rounded-xl border-2 border-border bg-surface-elevated p-4 shadow-soft-md";

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

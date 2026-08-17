import { cva } from "class-variance-authority";

export const opportunitiesScreenStyles = "mx-auto flex w-full max-w-[90rem] flex-col gap-6 px-4 pb-16 pt-8 sm:px-6 sm:pt-10 lg:px-8 xl:px-10 xl:pt-12";

export const opportunitiesBodyStyles = "grid grid-cols-1 gap-5";

export const opportunitiesMainStyles = "flex min-w-0 flex-col gap-4";

export const opportunitiesHeaderStyles = "max-w-5xl space-y-3 border-b border-line pb-8 sm:pb-10";

export const opportunitiesKickerStyles = "text-label font-semibold text-primary-deep";

export const opportunitiesTitleStyles = "font-display text-balance text-page-title font-semibold tracking-[-0.045em] text-foreground";

export const opportunitiesDescriptionStyles = "max-w-2xl text-[15px] leading-6 text-muted-foreground sm:text-base sm:leading-7";

export const panelStyles = "rounded-floating border border-line bg-surface-elevated p-4 shadow-floating-md";

export const splitViewStyles = cva("grid gap-5", {
  variants: {
    open: {
      true: "xl:grid-cols-[minmax(0,1fr)_minmax(440px,500px)]",
      false: "grid-cols-1",
    },
  },
  defaultVariants: {
    open: false,
  },
});

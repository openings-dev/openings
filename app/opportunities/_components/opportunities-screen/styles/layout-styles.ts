import { cva } from "class-variance-authority";

export const opportunitiesScreenStyles = cva(
  "mx-auto flex w-full max-w-7xl flex-col gap-7 px-4 pb-16 pt-10 sm:px-6 lg:px-8 xl:pt-12",
);

export const opportunitiesBodyStyles = cva(
  "grid grid-cols-1 gap-5 lg:grid-cols-[minmax(230px,270px)_minmax(0,1fr)] lg:gap-5",
);

export const opportunitiesSidebarStyles = cva(
  "grid grid-cols-1 gap-3 lg:sticky lg:top-20 lg:self-start",
);

export const opportunitiesMainStyles = cva("flex min-w-0 flex-col gap-4");

export const opportunitiesSnapshotStatusStyles = cva(
  "rounded-lg border border-border/70 bg-card/42 px-4 py-3 shadow-[0_18px_60px_-52px_rgb(0_0_0/0.5)] backdrop-blur sm:px-5",
);

export const opportunitiesHeaderStyles = cva("max-w-4xl space-y-3");

export const opportunitiesKickerStyles = cva(
  "text-xs font-medium uppercase tracking-[0.14em] text-primary/80",
);

export const opportunitiesTitleStyles = cva(
  "text-balance text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-[3.4rem]",
);

export const opportunitiesDescriptionStyles = cva(
  "max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg",
);

export const panelStyles = cva(
  "rounded-lg border border-border/70 bg-card/54 p-4 shadow-[0_22px_80px_-62px_rgb(0_0_0/0.6)] backdrop-blur-xl",
);

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

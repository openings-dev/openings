import type { TranslationMessages } from "@/lib/translations/types";

export enum ShowcaseSectionId {
  Foundations = "foundations",
  Brand = "brand",
  Primitives = "primitives",
  ProductPatterns = "product-patterns",
  Content = "content",
  States = "states",
  Responsive = "responsive",
  Usage = "usage",
}

export interface ShowcaseNavigationItem {
  id: ShowcaseSectionId;
  labelKey: keyof TranslationMessages["designSystem"]["sections"];
}

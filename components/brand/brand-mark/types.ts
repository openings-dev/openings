export enum BrandMarkSize {
  Micro = "micro",
  Compact = "compact",
  Standard = "standard",
  Display = "display",
  Feature = "feature",
}

export interface BrandMarkProps {
  className?: string;
  size?: BrandMarkSize;
}

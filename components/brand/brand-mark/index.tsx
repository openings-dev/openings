import { cn } from "@/lib/utils/tailwind";
import {
  BRAND_ARTWORK_PATH,
  BRAND_ARTWORK_TRANSFORM,
  BRAND_MARK_VIEW_BOX,
} from "../geometry";
import { BrandMarkSize, type BrandMarkProps } from "./types";

const BRAND_MARK_SIZE_CLASS_NAME = {
  [BrandMarkSize.Micro]: "h-4 w-auto",
  [BrandMarkSize.Compact]: "h-6 w-auto",
  [BrandMarkSize.Standard]: "h-8 w-auto",
  [BrandMarkSize.Display]: "h-10 w-auto",
  [BrandMarkSize.Feature]: "h-12 w-auto",
} satisfies Record<BrandMarkSize, string>;

export function BrandMark({
  className,
  size = BrandMarkSize.Compact,
}: BrandMarkProps): React.ReactNode {
  return (
    <svg
      width="285"
      height="219"
      viewBox={BRAND_MARK_VIEW_BOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMid meet"
      className={cn(
        "shrink-0 text-current",
        BRAND_MARK_SIZE_CLASS_NAME[size],
        className,
      )}
      aria-hidden="true"
      focusable="false"
    >
      <g transform={BRAND_ARTWORK_TRANSFORM}>
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d={BRAND_ARTWORK_PATH}
        />
      </g>
    </svg>
  );
}

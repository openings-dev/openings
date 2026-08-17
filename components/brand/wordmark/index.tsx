import { cn } from "@/lib/utils/tailwind";
import {
  BRAND_ARTWORK_PATH,
  BRAND_ARTWORK_TRANSFORM,
  WORDMARK_VIEW_BOX,
} from "../geometry";
import { WordmarkSize, type WordmarkProps } from "./types";

const WORDMARK_SIZE_CLASS_NAME = {
  [WordmarkSize.Compact]: "h-8 w-auto",
  [WordmarkSize.Display]: "h-14 w-auto",
} satisfies Record<WordmarkSize, string>;

export function Wordmark({
  className,
  size = WordmarkSize.Compact,
}: WordmarkProps): React.ReactNode {
  return (
    <svg
      width="1202"
      height="219"
      viewBox={WORDMARK_VIEW_BOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMid meet"
      className={cn(
        "block shrink-0 text-foreground",
        WORDMARK_SIZE_CLASS_NAME[size],
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

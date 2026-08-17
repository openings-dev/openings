export enum WordmarkSize {
  Compact = "compact",
  Display = "display",
}

export interface WordmarkProps {
  className?: string;
  size?: WordmarkSize;
}

import type { MarkdownHeading } from "@/lib/content/markdown-headings";

export interface DocumentTableOfContentsProps {
  headings: MarkdownHeading[];
  ariaLabel: string;
}

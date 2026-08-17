export interface MarkdownHeading {
  id: string;
  text: string;
  level: number;
  sourceLine: number;
}

export interface MarkdownHeadingSlugger {
  getId: (text: string) => string;
}

function plainHeadingText(value: string): string {
  return value
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/\\([\\`*_{}\[\]()#+.!-])/g, "$1")
    .trim();
}

export function createMarkdownHeadingSlugger(prefix = "section"): MarkdownHeadingSlugger {
  let headingIndex = 0;

  return {
    getId(): string {
      headingIndex += 1;
      return `${prefix}-${headingIndex}`;
    },
  };
}

export function removeLeadingMarkdownTitle(markdown: string): string {
  const lines = markdown.replace(/^\uFEFF/, "").split("\n");
  const firstContentIndex = lines.findIndex((line) => line.trim().length > 0);

  if (firstContentIndex < 0 || !/^\s{0,3}#\s+/.test(lines[firstContentIndex])) {
    return lines.join("\n");
  }

  lines.splice(firstContentIndex, 1);
  if (lines[firstContentIndex]?.trim() === "") lines.splice(firstContentIndex, 1);
  return lines.join("\n");
}

export function extractMarkdownHeadings(
  markdown: string,
  prefix = "section",
): MarkdownHeading[] {
  const slugger = createMarkdownHeadingSlugger(prefix);
  const headings: MarkdownHeading[] = [];
  let fenceMarker: "`" | "~" | null = null;
  let fenceLength = 0;

  for (const [lineIndex, line] of markdown.split("\n").entries()) {
    const fence = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (fence) {
      const marker = fence[1][0] as "`" | "~";
      if (fenceMarker === null) {
        fenceMarker = marker;
        fenceLength = fence[1].length;
      } else if (marker === fenceMarker && fence[1].length >= fenceLength) {
        fenceMarker = null;
        fenceLength = 0;
      }
      continue;
    }

    if (fenceMarker !== null) continue;

    const match = line.match(/^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;

    const text = plainHeadingText(match[2]);
    if (!text) continue;
    const level = Math.max(2, match[1].length);
    headings.push({
      id: slugger.getId(text),
      text,
      level,
      sourceLine: lineIndex + 1,
    });
  }

  return headings;
}

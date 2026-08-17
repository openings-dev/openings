import { formatTemplate } from "@/lib/utils/format-template";

interface RangeLabelParams {
  totalCount: number;
  visibleCount: number;
  locale: string;
  zeroResultsLabel: string;
  rangeTemplate: string;
}

export function buildRangeLabel({
  totalCount,
  visibleCount,
  locale,
  zeroResultsLabel,
  rangeTemplate,
}: RangeLabelParams) {
  if (totalCount === 0) {
    return zeroResultsLabel;
  }

  const end = Math.min(visibleCount, totalCount);
  return formatTemplate(rangeTemplate, {
    start: (1).toLocaleString(locale),
    end: end.toLocaleString(locale),
    total: totalCount.toLocaleString(locale),
  });
}

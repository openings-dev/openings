import {
  normalizeDirectoryQuery,
  validDateToMs,
} from "@/lib/opportunities/summary-helpers";
import { DirectorySortMode } from "./types";

interface DirectorySortableItem {
  name: string;
  opportunitiesCount: number;
  lastPostedAt: string | null;
}

interface FilterAndSortDirectoryItemsParams<TItem extends DirectorySortableItem> {
  items: TItem[];
  locale: string;
  query: string;
  sort: DirectorySortMode;
  getIdentity: (item: TItem) => string;
  getSearchValues: (item: TItem) => string[];
}

interface FilterDirectoryItemsByQueryParams<TItem> {
  items: TItem[];
  locale: string;
  query: string;
  getSearchValues: (item: TItem) => string[];
}

function stableTextCompare(
  left: string,
  right: string,
  collator: Intl.Collator,
) {
  return collator.compare(left, right) ||
    left.localeCompare(right, "en", { sensitivity: "variant", numeric: true });
}

function compareActivityDescending(
  left: string | null,
  right: string | null,
) {
  const leftTimestamp = validDateToMs(left);
  const rightTimestamp = validDateToMs(right);

  if (leftTimestamp === null && rightTimestamp === null) return 0;
  if (leftTimestamp === null) return 1;
  if (rightTimestamp === null) return -1;
  return rightTimestamp - leftTimestamp;
}

export function filterDirectoryItemsByQuery<TItem>({
  items,
  locale,
  query,
  getSearchValues,
}: FilterDirectoryItemsByQueryParams<TItem>) {
  const normalizedQuery = normalizeDirectoryQuery(query, locale);

  if (!normalizedQuery) return items;

  return items.filter((item) =>
    getSearchValues(item).some((value) =>
      normalizeDirectoryQuery(value, locale).includes(normalizedQuery),
    ),
  );
}

export function filterAndSortDirectoryItems<TItem extends DirectorySortableItem>({
  items,
  locale,
  query,
  sort,
  getIdentity,
  getSearchValues,
}: FilterAndSortDirectoryItemsParams<TItem>) {
  const visibleItems = filterDirectoryItemsByQuery({
    items,
    locale,
    query,
    getSearchValues,
  });
  const collator = new Intl.Collator(locale, {
    usage: "sort",
    sensitivity: "base",
    numeric: true,
  });

  return [...visibleItems].sort((left, right) => {
    const identityComparison = () => stableTextCompare(
      getIdentity(left),
      getIdentity(right),
      collator,
    );
    const nameComparison = () =>
      stableTextCompare(left.name, right.name, collator) || identityComparison();

    if (sort === DirectorySortMode.Name) return nameComparison();

    const activityComparison = compareActivityDescending(
      left.lastPostedAt,
      right.lastPostedAt,
    );

    if (sort === DirectorySortMode.Recent) {
      return activityComparison ||
        right.opportunitiesCount - left.opportunitiesCount ||
        nameComparison();
    }

    return right.opportunitiesCount - left.opportunitiesCount ||
      activityComparison ||
      nameComparison();
  });
}

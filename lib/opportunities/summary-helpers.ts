export function dateToMs(value: unknown): number | null {
  const parsed = Date.parse(typeof value === "string" ? value : "");
  return Number.isFinite(parsed) ? parsed : null;
}

export function validDateToMs(value: string | null | undefined) {
  return dateToMs(value);
}

export function normalizeDirectoryQuery(value: string, locale: string) {
  return value
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase(locale);
}

const unavailableLocationValues = new Set([
  "n/a",
  "na",
  "none",
  "not available",
  "null",
  "undefined",
  "unknown",
]);

export function normalizeLocationValue(value: string | null | undefined) {
  const normalized = value?.trim() ?? "";
  return unavailableLocationValues.has(normalized.toLocaleLowerCase())
    ? ""
    : normalized;
}

export function uniqueLocationSegments(
  values: Array<string | null | undefined>,
) {
  const seen = new Set<string>();
  const segments: string[] = [];

  for (const value of values) {
    const segment = normalizeLocationValue(value);
    const key = segment.normalize("NFKC").toLowerCase();
    if (!segment || seen.has(key)) continue;
    seen.add(key);
    segments.push(segment);
  }

  return segments;
}

export function formatLocationSegments(
  values: Array<string | null | undefined>,
) {
  return uniqueLocationSegments(values).join(" · ");
}

function toLocation(country: string, region: string) {
  return `${country}:::${region}`;
}

function fromLocation(value: string) {
  const [country, region] = value.split(":::");
  return {
    country: normalizeLocationValue(country),
    region: normalizeLocationValue(region),
  };
}

export function locationKey(country: string, region: string) {
  const normalizedCountry = normalizeLocationValue(country);
  const normalizedRegion = normalizeLocationValue(region);

  return normalizedCountry || normalizedRegion
    ? toLocation(normalizedCountry, normalizedRegion)
    : null;
}

export function mostFrequentLocation(locations: Map<string, number>) {
  const entries = [...locations.entries()];
  if (entries.length === 0) return { country: "", region: "" };
  entries.sort((left, right) =>
    right[1] - left[1] ||
    (left[0] < right[0] ? -1 : left[0] > right[0] ? 1 : 0),
  );
  return fromLocation(entries[0]?.[0] ?? "");
}

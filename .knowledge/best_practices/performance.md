# Performance

> Protect static generation, client bundle size, and responsive interaction without speculative optimization.

## Priorities

1. Keep Server Components and build-time data reads as the default.
2. Keep Client Component boundaries narrow.
3. Avoid duplicated remote requests and repeated parsing of the same generated artifact.
4. Keep state near its consumers to limit unrelated renders.
5. Measure before adding memoization, dynamic imports, or virtualization.

## Remote data

Preserve explicit cache or revalidation behavior on static routes. Batch segmented snapshot reads with bounded concurrency and deduplicate identifiers before item loading. Do not trade correctness for hidden fallback data.

## React

Derive inexpensive values during render. Use `useMemo`, `useCallback`, and `React.memo` only at an identified expensive or referential boundary. Stable keys come from domain identifiers rather than array indexes for reorderable collections.

## Assets and dependencies

Use Next.js image and font facilities where they preserve static export. Keep explicit image dimensions. Remove a dependency only after searches and a successful production build prove it unused.

## Verification

Run `npm run build` after changes to routing, data loading, rendering boundaries, fonts, images, or dependency configuration. A cleaner code shape is not itself evidence of a performance improvement.

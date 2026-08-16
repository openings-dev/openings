# Final Refactor Verification

Date: 2026-08-15

## Command results

| Command | Exit status | Result |
| --- | ---: | --- |
| `npm run lint` | 0 | PASS; no diagnostics after removing the final unused type import |
| `npm run test:outreach` | 0 | PASS; maintainer outreach contract is valid |
| `./node_modules/.bin/tsc --noEmit` | 0 | PASS |
| `npm run build` | 0 | PASS; compilation, type checking, public data reads, and static generation completed |
| `git diff --check` | 0 | PASS; no whitespace errors |

The build generated 148 HTML pages, matching Spec 01: 11 framework/static
entries and 137 community detail pages. The only warning was Next.js workspace
root inference caused by the main checkout and isolated worktree both containing
their tracked lockfile. This matches the baseline worktree warning and does not
affect application output.

## Invariant comparison

- Public route sources, query parameter names, community paths, compatibility
  redirects, and the generated route count are unchanged.
- `output: "export"`, unoptimized images, GitHub image hosts, remote URL
  precedence, and public-data-only runtime access remain intact.
- The six-locale set and dictionary contract remain intact. Locale, theme,
  responsive filters, list/grid selection, opportunity drawer, pagination, and
  URL-backed filters retain their existing state owners.
- No API route, backend proxy, authentication feature, local opportunity
  dataset, visual redesign, or test framework was added.
- `next-themes` was removed only after the project-owned theme provider was
  verified as the runtime owner. All remaining dependencies have a verified
  source or configuration consumer.

## Architecture audit

- Ordinary components use kebab-case folders with `index.tsx`; the only named
  TSX helper outside that pattern is the document page factory, which is not an
  ordinary rendered component.
- Searches found no application `any`, disabled exhaustive-dependency rule,
  CSS Module, styled-components usage, or custom application class.
- CVA remains only for real variants; fixed style recipes use Tailwind strings.
- Remote data is separated into URL configuration, unknown validation, JSON
  transport, cached artifact reads, pure index operations, and query facades.
- Route entries remain Server Components and browser-only legacy pathname logic
  stays in its focused Client Component.
- Generated `.next/` and `out/` artifacts are ignored and absent from the staged
  diff.

The complete refactor diff is structural: 134 files changed before final
evidence, with more source removed than added. No unexplained baseline
difference remains.

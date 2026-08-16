# Final Calm Professional Visual Audit

Date: 2026-08-16

## Completed visual system

- Manrope provides distinctive display typography; Geist Sans remains optimized
  for controls and dense product content; Geist Mono/tabular features improve
  numerical scanning.
- Light and dark themes share cool-neutral semantic surfaces, a blue-violet
  Openings accent, concentric radii, and layered elevation.
- Header, main routes, documents, directories, and footer align to one maximum
  application grid and responsive gutter system.
- Shared buttons, selects, native fields, toasts, filters, cards, sheets, and
  Markdown use consistent border, focus, selected, disabled, and hover language.

## Responsive and state audit

- Mobile layouts retain 16-pixel form text, practical 44-pixel primary controls,
  filter disclosure, wrapping toolbars, single-column results, and bottom-sheet
  opportunity details with safe-area padding.
- Tablet layouts retain two-column directory/results grids without enabling the
  desktop filter sidebar prematurely.
- Desktop layouts retain the filter/results relationship and a bounded details
  context sheet; the 90rem grid supports wide screens without stretching copy.
- Long titles, repositories, handles, localized labels, tags, tables, code, and
  Markdown use explicit wrapping, truncation, line clamp, or overflow behavior.
- Hover, focus-visible, active, selected, disabled, open, loading, empty,
  fetching, and exhausted states remain represented. Reduced-motion globally
  shortens nonessential animation and transition duration.

## Preserved product contracts

- No route, query key, remote schema, environment precedence, locale, sorting,
  pagination, filter dependency, selected-opportunity lifecycle, external
  destination, or compatibility redirect changed.
- Static export, public-data-only access, Server/Client boundaries, and the 137
  generated community detail paths remain intact.
- No new UI library, API route, backend, local dataset, authentication, or test
  framework was added.

## Verification results

| Command | Exit status | Result |
| --- | ---: | --- |
| `npm run lint` | 0 | PASS; no diagnostics |
| `npm run test:outreach` | 0 | PASS; maintainer outreach contract valid |
| `./node_modules/.bin/tsc --noEmit` | 0 | PASS |
| `npm run build` | 0 | PASS; 148 static pages generated |
| `git diff --check` | 0 | PASS; no whitespace errors |

The build produced 137 community details and the same 148-page total as the
pre-redesign baseline. The only warning was workspace-root inference caused by
tracked lockfiles across the repository and isolated worktree; it does not
affect output.

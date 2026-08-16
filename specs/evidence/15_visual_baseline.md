# Visual Refinement Baseline

Date: 2026-08-16  
Branch: `design/visual-refinement`  
Starting commit: `65151b6`

## Foundations before redesign

- Typography: Geist Sans for all interface and display text; Geist Mono is
  loaded but used sparingly. Headings mostly use semibold weight and tracking
  utilities without a dedicated display family or closed type scale.
- Light theme: warm off-white background, warm graphite text, brown primary,
  pale warm cards, and one 10-pixel base radius.
- Dark theme: blue-graphite background and cards with amber primary.
- Background: two radial gradients create a warm ambient wash behind every
  route.
- Surfaces: cards frequently combine translucent backgrounds, borders,
  backdrop blur, and isolated custom shadows.
- Widths: shell, opportunity content, directories, documents, header, and
  footer use related but not fully unified maximum widths and gutters.
- Breakpoints: mobile-first Tailwind layouts primarily change at `sm`, `md`,
  `lg`, and `xl`; the opportunity filter panel becomes persistently available
  at 1024 pixels.

## Shared interaction states

- Buttons and selects expose hover, disabled, and focus-visible states through
  shared primitives.
- Opportunity cards expose hover and selected states; lists include initial
  loading, incremental loading, empty, and exhausted states.
- Filters expose expanded, selected-chip, disabled-option, and reset states.
- Details expose open/closed, desktop context panel, mobile sheet, backdrop,
  close, and external-action states.
- Theme and locale controls expose hover, open, selected, and toast feedback.

## Route surface map

| Route | Header/context | Primary surface | Secondary surface |
| --- | --- | --- | --- |
| `/` | Opportunity product header | Quick filters, toolbar, results | Advanced filters, details sheet |
| `/community` | Directory header | Community grid | Location filters |
| `/community/[owner]/[name]` | Community profile header | Opportunity results | Filters, details sheet |
| `/users` | Directory header | User grid | Location filters |
| `/overview` | Document title | Markdown article | Application shell |
| `/docs/api` | Document title | Markdown article | Application shell |
| `/docs/contributing` | Document title | Markdown article | Application shell |
| `/docs/maintainers` | Document title | Markdown article | Application shell |
| `/privacy` | Document title | Markdown article | Application shell |
| `/terms` | Document title | Markdown article | Application shell |
| `/_not-found` | Not-found title | Recovery card | Legacy route redirect |

All routes share the application header, main content area, and footer.

## Protected product invariants

- Static export remains enabled and produces 148 pages, including 137 generated
  community detail pages.
- Public remote data, environment precedence, query parameters, sorting,
  pagination, forced community/author scope, selected opportunity URLs, and
  compatibility redirects remain unchanged.
- English, Portuguese, Spanish, Italian, French, and German dictionaries remain
  complete.
- System/light/dark theme behavior, responsive filter disclosure, drawer
  dismissal, keyboard access, semantic markup, and external destinations remain
  functional.

## Required visual review matrix

- Widths: 375, 768, 1024, and 1440 CSS pixels.
- Themes: light and dark.
- Result modes: loading, empty, sparse, dense, list, grid, selected, fetching
  more, and exhausted.
- Controls: rest, hover, focus-visible, active, open, selected, and disabled.
- Content stress: long opportunity title, repository, handle, localized label,
  tag, and Markdown line.
- Motion: default and reduced-motion preference.

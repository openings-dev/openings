# 57 — Canonical supplied logo and mint primary

Status: Approved for implementation

Depends on: Spec 56

> **For agentic workers:** Replace the current Openings identity with the
> user-supplied `opn-logo.svg` geometry and migrate the primary interaction
> system to `#B0EC9C`. Preserve static export, theme parity, contrast,
> accessibility, routes, copy, and remote-data behavior. Do not add or run an
> automated test framework.

## Goal

Make the supplied Openings logo the only production identity and establish a
fresh mint primary system that remains legible, restrained, and consistent
across every public surface.

## Approved direction

The user selected **Option B — Adaptive monochrome** after comparing three
directions in the visual companion:

1. preserve the uploaded black rectangle unchanged;
2. extract the exact symbol and lettering onto transparency and adapt it to the
   surrounding theme;
3. recolor the symbol mint and append a new `.dev` suffix.

Option 2 is approved. It preserves the submitted geometry without forcing a
heavy black container into light surfaces or modifying the supplied lockup.

## Brand contract

- The supplied SVG is the geometry source for the production logo.
- Remove its baked black background through a lossless vector mask/extraction;
  do not redraw, approximate, trace, or replace the submitted paths.
- The full visual lockup reads `openings`, exactly as supplied. Do not append
  `.dev` to the vector logo.
- `openings.dev` remains the product and domain name in metadata, URLs,
  accessible names, documentation prose, and other textual contexts.
- Use the full lockup in header, footer, README, and design-system brand
  specimens.
- Use only the submitted stacked-page symbol when the full wordmark cannot
  remain legible, including favicons and compact 16–32 px specimens.
- The logo is monochrome and theme-aware: Community Ink on light surfaces and
  white or Night Foreground on dark/inverse surfaces.
- Do not place the extracted logo inside a decorative container, border,
  shadow, gradient, or fixed black rectangle.
- Preserve the supplied aspect ratio and internal clear space. Never stretch,
  rotate, animate, or recolor individual letters.

## Color contract

The new primary family is:

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| Primary | `#B0EC9C` | `#B0EC9C` | prioritized filled action and selected emphasis |
| Primary foreground | `#21302E` | `#0D1211` | text and icons on primary fill |
| Primary hover | `#9BD887` | `#C0F2AF` | interactive hover without geometry movement |
| Primary soft | `#EAF9E4` | `#213625` | selected rows, chips, quiet emphasis |
| Primary deep | `#2F6B3A` | `#B0EC9C` | links, labels, icons, and readable accent text |
| Primary selection | `rgba(176,236,156,.42)` | `rgba(176,236,156,.28)` | text selection |
| Focus | `#2F6B3A` | `#B0EC9C` | visible focus outline/ring |

Required contrast evidence:

- `#B0EC9C` with Community Ink `#21302E`: `10.04:1`;
- Primary Deep `#2F6B3A` on Paper `#FFFEFA`: `6.33:1`;
- Primary Deep `#2F6B3A` on Canvas `#F5F3EF`: `5.77:1`;
- `#B0EC9C` on dark Canvas `#0D1211`: `13.78:1`.

The light mint fill is not a general-purpose text or outline color on light
surfaces. Use Primary Deep for light-theme text, links, boundaries, and focus.
Primary remains controlled: one prioritized action, selected state, focus, and
brand-adjacent emphasis within a local composition.

Soft Grape stops being the primary identity. Lavender may remain a supporting
editorial field where it does not communicate selection or priority. Fresh Mint
and positive semantics remain separate aliases even when visually related, so
success/open meaning is not coupled to brand action.

## Architecture

### Canonical geometry

`components/brand/geometry.ts` remains the single React geometry boundary. It
will own the submitted full-lockup paths and compact symbol extraction. React
brand components and public SVG exports must consume or mechanically reproduce
that same geometry; no Figtree-derived legacy wordmark paths remain active.

The uploaded SVG uses negative space inside a black canvas. Extract the artwork
with an SVG mask that inverts the canvas relationship while preserving every
source path. Export transparent, monochrome light and dark assets from that
canonical result.

### Component contract

- `Wordmark` continues to render the full logo and keeps its existing public
  size contract where practical.
- `BrandMark` renders only the submitted stacked-page symbol.
- Replace the old brand/monochrome suffix tone distinction with a simple
  current-color or light/dark tone only if a typed variant is still required.
- Header and footer keep their existing accessible link names and navigation
  behavior while changing only the rendered geometry and calibrated size.

### Token contract

`app/globals.css` remains the sole token system. Replace the Soft Grape
compatibility mapping with semantic mint roles and expose `primary-deep`
directly from the mint family. Existing `bg-primary`, `text-primary-deep`,
`ring-ring`, `bg-primary-soft`, and primitive variants update without per-page
hex overrides.

## Scope

### Create or replace

- Canonical transparent full-lockup SVG exports for light and dark contexts.
- Canonical compact-mark SVG exports and both favicons.
- README brand asset based on the supplied lockup.

### Modify

- `components/brand/geometry.ts`
- `components/brand/brand-mark/index.tsx`
- `components/brand/brand-mark/types.ts`
- `components/brand/wordmark/index.tsx`
- `components/brand/wordmark/types.ts`
- `components/header/brand-logo/index.tsx`
- `components/footer/footer-brand/index.tsx`
- `app/globals.css`
- `app/layout.tsx` only if icon metadata paths change
- `app/design-system/_components/foundation-specimens/index.tsx`
- `README.md`
- `DESIGN.md`
- `.knowledge/design_system/README.md`
- `.knowledge/design_system/brand_and_copy.md`
- `.knowledge/design_system/foundations.md`
- `.knowledge/best_practices/styling.md`
- `specs/README.md`

### Replace public assets

- `public/brand-mark-light.svg`
- `public/brand-mark-dark.svg`
- `public/light-mode-favicon.svg`
- `public/dark-mode-favicon.svg`
- `public/openings-wordmark-light.svg`
- `public/openings-wordmark-dark.svg`

### Preserve

- all routes and static-export behavior;
- all six locale dictionaries and visible copy;
- remote-data loading, filters, URL state, profiles, directories, and docs;
- typography, spacing, shape, elevation, responsive composition, and motion;
- semantic positive, warning, destructive, and informational state roles.

## Implementation sequence

1. Import and normalize the supplied SVG geometry without changing its paths.
2. Build transparent full-lockup and compact-mark outputs from one source.
3. Replace React brand primitives and every static brand export.
4. Replace primary/focus/selection mappings with the approved mint family.
5. Review primitives and page consumers for assumptions that primary text is
   white or that primary itself has sufficient contrast as light-theme text.
6. Update header, footer, README, favicon metadata, and design-system specimens.
7. Update design authority and knowledge documentation so future work does not
   restore the former wordmark or Soft Grape primary.
8. Audit the repository for old geometry, `.dev` vector suffix paths, active
   Soft Grape primary mappings, and direct hex drift.

## Acceptance criteria

- The supplied stacked-page symbol and `openings` lettering are visually
  preserved without their original black rectangle.
- Header, footer, README, design-system specimens, favicons, and public exports
  use the new canonical geometry.
- No active production surface renders the previous irregular `O` mark or the
  Figtree-derived `openings.dev` vector.
- The visual logo reads `openings`; textual and accessible product naming
  remains `openings.dev` where appropriate.
- `#B0EC9C` is the primary filled action in both themes with dark readable
  foreground text.
- Light-theme primary text, focus, and necessary boundaries use Primary Deep,
  not low-contrast mint.
- Dark-theme primary, focus, and selected states remain visible without glow,
  gradients, or excessive green coverage.
- Buttons, links, badges, selects, inputs, dialogs, cards, filters, toasts,
  profiles, directories, documents, 404, and the design-system showcase inherit
  the new roles without local color patches.
- Positive/open semantic states remain distinguishable from primary actions by
  label, context, and their semantic token contract.
- There is no horizontal overflow, logo clipping, or illegible wordmark at
  320, 390, 768, 1024, 1280, and 1440 CSS pixels.
- Static export keeps valid direct loads and theme-specific favicons.

## Validation

- Inspect logo and compact mark at 16, 24, 32, 48, header, footer, and display
  sizes in light, dark, Paper, Canvas, Elevated, and Night contexts.
- Inspect primary default, hover, focus, selected, disabled, and destructive
  adjacency in the `/design-system` showcase.
- Verify computed contrast for all approved pairs and keyboard focus on light
  and inverse surfaces.
- Review `/`, `/community`, `/users`, one community profile, one GitHub-author
  profile, `/overview`, `/docs/api`, `/design-system`, and 404 at representative
  mobile/tablet/desktop widths.
- Run `npm run lint`.
- Run `npx tsc --noEmit`.
- Run `npm run build` and confirm the static export includes the replacement
  assets and existing routes.
- Run `git diff --check`.
- Do not add or run an automated test framework.

## Commit boundary

`feat(brand): adopt supplied logo and mint primary`

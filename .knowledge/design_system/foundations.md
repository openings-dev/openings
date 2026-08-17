# Design Foundations

> Define the shared visual grammar for every Openings surface.

## Typography

Figtree owns display, interface, and body roles. Prefer 400–650 weights and create hierarchy with scale, spacing, and contrast. Newsreader is a rare editorial accent for short public-facing phrases; never use it in filters, buttons, dense cards, or routine product UI. Geist Mono owns code, paths, dates, API examples, and compact numerical data.

Do not use `font-black`. Product labels remain at least 12 px. Uppercase with wide tracking is reserved for an occasional marketing eyebrow.

## Color roles

- Community Ink and Warm Paper form the dominant light foundation.
- Night, dark paper, and dark elevated surfaces form a three-level dark hierarchy.
- Night supporting text uses its solid `night-muted-foreground` role; do not lower meaningful footer text with opacity.
- Brand Mint marks one priority action and selection. Primary Deep provides accessible light-theme accent text and focus.
- Lavender Mist supports selected and editorial surfaces.
- Fresh Mint supports open, positive, and community context.
- Warm Peach supplies occasional editorial contrast.
- Semantic destructive and warning roles remain separate from editorial accents.

Components consume semantic variables from `app/globals.css`. Raw palette values belong in the token layer or brand assets, not repeated JSX.

## Spacing and layout

Use the existing 4 px base rhythm and compose mainly with 8, 12, 16, 24, 32, 48, 64, 96, and 128 px.

- Public marketing and profile content uses a `1180–1280px` editorial grid.
- Opportunity discovery may extend to `1440px` for list/detail scanning.
- Documentation keeps the article measure around `68–74ch`.
- Mobile compositions reorder and collapse according to content priority rather than scaling the desktop layout down.

## Shape and elevation

- Default boundary: 1 px low-contrast hairline.
- Form and outline-control boundaries use the dedicated `control-border` role at a minimum `3:1` contrast against their surface; do not strengthen every content hairline.
- Controls: 10–14 px radius.
- Cards: 14–18 px radius.
- Large editorial panels: 18–24 px radius.
- Pills: marketing CTA, chips, segmented controls, and compact toggles only.
- Diffuse shadow: popovers, dialogs, drawers, and rare floating editorial objects only.

Hard offset shadows, 2 px default outlines, and hover translation as a universal interaction are retired.

## Icons and imagery

Use Lucide for general interface actions with consistent size and stroke. Use custom SVG only for the wordmark, compact mark, flags, or product-specific forms Lucide cannot represent.

Prefer product evidence over generic illustration. Opportunity rows, source issues, community identity, profiles, tags, and filters are valid visual subjects. Generic blobs, glows, 3D cubes, sparkles, and borrowed platform logos are not.

## Themes

Light and dark modes share semantic roles, not literal values. Dark mode uses distinct canvas, surface, and elevated luminance; translucent hairlines; luminous Brand Mint; and recalibrated Lavender, Fresh Mint, Peach, error, and warning roles. It is not an inverted light theme.

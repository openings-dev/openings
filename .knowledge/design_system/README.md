# Design System

> Record the Buffer Bold visual and interaction system used by Openings.

## Foundations

The interface uses semantic CSS variables exposed through Tailwind for background, foreground, card, surface, elevated surface, muted, subtle foreground, border, input, ring, primary, and accent roles. Light mode uses a warm cream canvas, white cards, warm-black ink, lavender fields, and Soft Grape actions. Dark mode uses warm graphite surfaces with equivalent semantic contrast. Components consume semantic roles instead of duplicating raw color values.

Manrope owns bold display headings, Geist Sans owns interface and body text, and Geist Mono or tabular features own compact numerical metadata. A shared application grid, a 4-pixel spacing rhythm, compact radii, 2-pixel outlines, and hard offset shadows create consistency across routes.

## Components

Application-wide primitives live under `components/ui/`. Shared shell components live under `components/`. Feature components may compose primitives but must not fork their interaction or accessibility contracts.

The three offset connection blocks in `app/_components/openings-motif/` are the product's reusable visual signature. Use them sparingly in primary title blocks and intentional empty states. Do not turn the motif into background decoration or repeat it inside dense lists.

Use Tailwind directly for fixed appearance. CVA remains appropriate for genuine component variants. Lucide is the default for generic interface icons; logos, flags, and brand-specific marks may remain custom SVG components or assets.

## Interaction

- Preserve keyboard access and visible focus.
- Preserve link-versus-button semantics.
- Preserve disabled, loading, selected, expanded, and error states.
- Keep search, location, and stack available as quick filters; put advanced opportunity filters in the native modal dialog.
- Keep all three primary destinations available through the desktop navigation and the native mobile-navigation dialog.
- Public community and user profiles expose a direct opportunities action and a native share/copy action.
- Preserve drawers, theme changes, language selection, and restrained motion behavior.
- Keep icon-only controls named for assistive technology.
- Respect reduced-motion preferences when animation is not essential.

## Change constraint

Visual changes must extend Buffer Bold rather than introducing another token system. The system borrows the energy of creator tools through strong outlines, hard shadows, flat pastel fields, and confident typography, but must not copy another product's logos, illustrations, branded assets, or copy. Preserve product behavior, routes, data contracts, locale coverage, responsive usability, theme parity, and accessibility.

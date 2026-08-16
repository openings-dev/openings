# Design System

> Record the Calm Professional visual and interaction system.

## Foundations

The interface uses semantic CSS variables exposed through Tailwind for background, foreground, card, surface, elevated surface, muted, subtle foreground, border, input, ring, primary, and accent roles. Light mode uses quiet cool-neutral surfaces with a blue-violet accent; dark mode uses deep graphite surfaces with equivalent semantic contrast. Components consume semantic roles instead of duplicating raw color values.

Manrope owns display headings, Geist Sans owns interface and body text, and Geist Mono or tabular features own compact numerical metadata. A shared application grid, a 4-pixel spacing rhythm, concentric radii, and layered shadows create consistency across routes.

## Components

Application-wide primitives live under `components/ui/`. Shared shell components live under `components/`. Feature components may compose primitives but must not fork their interaction or accessibility contracts.

Use Tailwind directly for fixed appearance. CVA remains appropriate for genuine component variants. Lucide is the default for generic interface icons; logos, flags, and brand-specific marks may remain custom SVG components or assets.

## Interaction

- Preserve keyboard access and visible focus.
- Preserve link-versus-button semantics.
- Preserve disabled, loading, selected, expanded, and error states.
- Preserve responsive filter panels, drawers, theme changes, language selection, and motion behavior.
- Keep icon-only controls named for assistive technology.
- Respect reduced-motion preferences when animation is not essential.

## Change constraint

Visual changes must extend Calm Professional rather than introducing another token system or copying another product's branded shell. Preserve product behavior, routes, data contracts, locale coverage, responsive usability, theme parity, and accessibility while evolving appearance through an approved product task.

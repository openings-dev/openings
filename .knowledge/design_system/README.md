# Design System

> Record the visual and interaction invariants that code refactoring must preserve.

## Foundations

The interface uses semantic CSS variables exposed through Tailwind for background, foreground, card, muted, border, input, ring, and primary roles. Light mode uses warm light surfaces; dark mode uses near-black and graphite surfaces. Components consume semantic roles instead of duplicating raw color values.

Geist Sans and Geist Mono are loaded by the root layout. Typography, density, responsive breakpoints, and brand assets must remain visually equivalent during refactoring.

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

## Refactor constraint

The repository-wide refactor is not a redesign. Any Tailwind, CVA, Framer Motion, or Lucide change must retain the existing visual hierarchy and behavior. A desired visual adjustment requires a separate approved product task.

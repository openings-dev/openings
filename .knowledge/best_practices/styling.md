# Styling

> Implement the approved Openings editorial system through explicit Tailwind ownership.

## Current system

Tailwind CSS 4 is imported from `app/globals.css`. CSS custom properties define semantic light and dark roles and `@theme inline` exposes them as utilities. The active target is documented in [`DESIGN.md`](../../DESIGN.md): Figtree-led typography, a Warm Paper and Community Ink foundation, controlled Brand Mint interaction, low-contrast 1-pixel hairlines, and diffuse elevation only for real floating layers. Newsreader is a rare editorial accent and Geist Mono supports technical and numerical content. Framer Motion supplies functional orientation and Lucide supplies general interface icons.

When sources disagree, follow [`DESIGN.md`](../../DESIGN.md), then the production tokens and primitives that implement it, then `/design-system` as an inspection surface. The showcase never owns a parallel token, component, or asset contract.

## Target rules

- Write fixed Tailwind utilities directly in the owning JSX.
- Use CVA only when a component has a real typed variant contract or slot recipe that benefits from it.
- Keep closed variant mappings in colocated constants and type them against the corresponding enum.
- Keep global CSS limited to Tailwind setup, semantic theme tokens, and truly document-wide element behavior.
- Prefer Lucide for general interface icons; retain custom components for brand marks or icons Lucide cannot represent equivalently.
- Do not introduce CSS Modules, styled-components, component stylesheets, or a second token system.

## Visual contract

Keep content dominant through typography, spacing, composition, and tonal contrast. Default boundaries are 1-pixel low-contrast hairlines. Use 10–14 px radii for controls, 14–18 px for cards, and 18–24 px for large editorial panels. Pills belong to primary marketing actions, chips, segmented controls, and compact toggles—not every button.

The submitted logo stays monochrome. Brand Mint belongs to a prioritized fill and selected state, while Primary Deep provides accessible light-theme accent text and focus. Lavender supports editorial selection, Fresh Mint signals open/positive context, and Peach supplies occasional editorial contrast. Do not change those roles between routes.

Shadows are diffuse, quiet, and limited to popovers, dialogs, drawers, selected floating layers, and rare editorial objects. Do not use hard offset shadows, 2-pixel default outlines, repeated hover translation, `font-black`, or 10-pixel uppercase product labels. Light and dark themes must preserve the same hierarchy through their own tonal systems.

Marketing is generous, discovery is compact, profiles are identity-led, and documentation is reading-led. These are composition densities within one token and primitive system.

## Accessibility

Use semantic elements, visible `focus-visible` states, native disabled behavior, accessible names for icon-only controls, and non-color signals where practical. Motion must respect reduced-motion preferences wherever the existing interaction depends on animation.

# Styling

> Extend the Calm Professional interface through explicit Tailwind ownership.

## Current system

Tailwind CSS 4 is imported from `app/globals.css`. CSS custom properties define the semantic light and dark theme, surface hierarchy, accent roles, radii, and layered shadows; `@theme inline` exposes them as utilities. Manrope is the display family, Geist Sans is the interface family, and Geist Mono supports technical and numerical content. Framer Motion supplies functional orientation and Lucide supplies general interface icons.

## Target rules

- Write fixed Tailwind utilities directly in the owning JSX.
- Use CVA only when a component has a real typed variant contract or slot recipe that benefits from it.
- Keep closed variant mappings in colocated constants and type them against the corresponding enum.
- Keep global CSS limited to Tailwind setup, semantic theme tokens, and truly document-wide element behavior.
- Prefer Lucide for general interface icons; retain custom components for brand marks or icons Lucide cannot represent equivalently.
- Do not introduce CSS Modules, styled-components, component stylesheets, or a second token system.

## Visual contract

Keep content dominant and chrome quiet. Use typography and spacing before containers, reserve primary color for actions and selection, use elevated surfaces sparingly, keep child radii no larger than parent radii, and increase contrast on interaction. Light and dark themes must be equally intentional. Preserve responsive usability, reduced motion, and semantic states.

## Accessibility

Use semantic elements, visible `focus-visible` states, native disabled behavior, accessible names for icon-only controls, and non-color signals where practical. Motion must respect reduced-motion preferences wherever the existing interaction depends on animation.

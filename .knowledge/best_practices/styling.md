# Styling

> Preserve the existing interface while converging on explicit Tailwind ownership.

## Current system

Tailwind CSS 4 is imported from `app/globals.css`. CSS custom properties define semantic light and dark theme colors and radius values, and `@theme inline` exposes them as utilities. Components use a mixture of direct utilities and CVA recipes. Framer Motion supplies existing motion and Lucide supplies most general interface icons.

## Target rules

- Write fixed Tailwind utilities directly in the owning JSX.
- Use CVA only when a component has a real typed variant contract or slot recipe that benefits from it.
- Keep closed variant mappings in colocated constants and type them against the corresponding enum.
- Keep global CSS limited to Tailwind setup, semantic theme tokens, and truly document-wide element behavior.
- Prefer Lucide for general interface icons; retain custom components for brand marks or icons Lucide cannot represent equivalently.
- Do not introduce CSS Modules, styled-components, component stylesheets, or a second token system.

## Preservation contract

Refactoring styles must preserve layout, spacing, typography, colors, borders, radii, responsive breakpoints, hover and focus treatment, dark mode, reduced motion, and semantic states. Tailwind or Lucide replacement is allowed only when it is visually and behaviorally equivalent.

## Accessibility

Use semantic elements, visible `focus-visible` states, native disabled behavior, accessible names for icon-only controls, and non-color signals where practical. Motion must respect reduced-motion preferences wherever the existing interaction depends on animation.

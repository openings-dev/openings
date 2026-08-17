# Design System

> Index the durable visual, brand, copy, and interaction rules used by Openings.

## Authority

[`DESIGN.md`](../../DESIGN.md) records the approved product and visual direction. Production tokens in `app/globals.css` and production brand/UI primitives implement it. The static `/design` route inspects those sources without replacing them. This is the authority order: `DESIGN.md` → production tokens and primitives → `/design`. This folder translates that direction into focused implementation guidance, while [`AGENTS.md`](../../AGENTS.md) remains the canonical instruction file for repository work.

Historical Specs 34–45 document the retired “Buffer Bold” implementation. Their thick outlines, hard offset shadows, repeated black weights, and boxed compositions are not the current baseline.

## Documentation map

- [Foundations](foundations.md) — typography, color, spacing, shape, elevation, iconography, and themes
- [Brand and copy](brand_and_copy.md) — wordmark, visual subject, positioning, voice, claims, and CTA vocabulary
- [Experience patterns](experience_patterns.md) — marketing, discovery, profiles, directories, documentation, and showcase behavior
- [Accessibility and motion](accessibility_and_motion.md) — semantic, focus, responsive, overlay, and reduced-motion contracts

## Durable rules

- Use one token and primitive system across marketing, discovery, profiles, and documentation.
- Use the exact supplied `openings.dev` vector through the shared `Wordmark` and `BrandMark` components; do not redraw, typeset, or independently recolor it.
- Change density and composition by context; do not fork visual foundations.
- Build hierarchy with type, whitespace, and tonal contrast before adding decoration.
- Use public opportunities, communities, repositories, publishers, filters, and source context as the visual subject.
- Keep quick search, location, and stack visible; advanced opportunity filters remain in the accessible dialog.
- Keep community and publisher profiles shareable, identity-led destinations.
- Preserve all six locales, light and dark modes, responsive reflow, and static export.
- Do not copy third-party brand assets, illustrations, layouts, or proprietary copy.
- Do not introduce a second token system, component stylesheet strategy, or generic AI-SaaS visual layer.

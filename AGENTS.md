<!-- BEGIN:nextjs-agent-rules -->
# Next.js version notice

This project uses Next.js 16.2. Before changing framework behavior, inspect the relevant guide in `node_modules/next/dist/docs/` and follow its deprecation notices. Do not assume older Next.js APIs still apply.
<!-- END:nextjs-agent-rules -->

# Openings Agent Instructions

`AGENTS.md` is the single canonical instruction file for assistants working in this repository. `CLAUDE.md` delegates here. Detailed factual guidance lives in [`.knowledge/`](.knowledge/README.md), and the approved product and visual direction lives in [`DESIGN.md`](DESIGN.md). Local implementation plans and visual explorations are development artifacts and are not versioned.

## Product and stack

Openings is a statically exported Next.js application for discovering technology opportunities published in public GitHub community repositories. It reads generated public JSON from the separate `openings-dev/data` repository. Do not add local opportunity datasets, mocks, API routes, a backend proxy, authentication, or credentials.

- Next.js 16.2 App Router with `output: "export"`
- React 19 and strict TypeScript
- Tailwind CSS 4
- Radix primitives, CVA, Framer Motion, and Lucide React
- Typed dictionaries for `en`, `pt`, `es`, `it`, `fr`, and `de`
- npm with Node.js 20.9 or newer

The current visual baseline is the Openings editorial system defined in `DESIGN.md`: Buffer-like warmth and composition, Resend-like precision, the supplied `openings.dev` stacked-page lockup, Figtree-led typography, Warm Paper and Community Ink neutrals, controlled Brand Mint actions, 1-pixel hairlines, and rare diffuse elevation. Design authority is ordered: `DESIGN.md`, then production tokens and primitives, then the `/design` showcase that inspects what ships. Marketing, discovery, profiles, and documentation use different densities without creating separate systems. Preserve product behavior, responsive usability, theme parity, and accessibility. Do not copy third-party logos, illustrations, branded assets, layouts, or copy. Do not add a test framework.

## Required workflow

1. Read the relevant `.knowledge/` documents and the specification being executed.
2. Inspect the current implementation before changing it; specs describe intent but code may have moved.
3. Keep each change inside the active specification's boundary.
4. Preserve routes, remote-data contracts, locale coverage, themes, responsive behavior, accessibility, and static export.
5. Run the validation required by the active specification. At minimum use `npm run lint`; use `npm run build` for routing, rendering, data, asset, or configuration changes.
6. Use concise English conventional commits when a commit is requested by the workflow.

## Architecture and ownership

- Keep pages and layouts as Server Components unless browser behavior requires a Client Component.
- Add `"use client"` at the smallest coherent interactive boundary.
- Keep route-private UI under `app/<route>/_components/`.
- Keep UI shared across routes under `app/_components/`.
- Keep application-wide shell and primitives under `components/`.
- Keep remote access, parsing, and domain transformations outside React components.
- Promote code only when reuse crosses its current ownership boundary.
- Do not introduce Atomic Design folders, speculative layers, or class-based services.

## Components

- Every ordinary component lives in a kebab-case folder with `index.tsx`.
- Put component-specific props in a colocated `types.ts` when props exist.
- Use `PropsWithChildren` directly when `children` is the only prop.
- Declare an explicit `React.ReactNode` return type on components.
- Export ordinary components by name; framework entry files retain required default exports.
- Put component-owned microcomponents in their own folders directly inside the owner.
- Do not create aggregate component files such as `icons.tsx` or `ui.tsx`.
- Use semantic HTML, links for navigation, buttons for actions, and accessible names for icon-only controls.
- Do not extract one-off wrappers without reuse, centralized accessibility, or a clear responsibility boundary.

## Functional code, types, and naming

- Application code is functional. Do not declare custom classes.
- Export named functions for hooks, helpers, parsing, data access, and behavior.
- Source files use lowercase kebab-case; component and route folders use kebab-case; knowledge files use snake_case.
- Components, types, and enums use PascalCase. Functions and runtime values use camelCase. Fixed semantic constants use SCREAMING_SNAKE_CASE.
- Use string enums for stable named closed sets used in comparisons, mappings, persisted values, or variants.
- Keep domain types at their domain boundary and component props in the component folder.
- Prefer `import type`; avoid `any`, unsafe assertions, magic values, and duplicated domain unions.
- Do not create `index.ts` barrels that only re-export symbols. Import concrete modules.
- Use relative imports inside one ownership boundary and the configured `@/` alias across boundaries.

## Styling and icons

- Use Tailwind utilities directly in JSX for fixed styles.
- Use CVA only for a real finite variant or reusable slot contract.
- Keep theme tokens and truly global element behavior in `app/globals.css`; do not create another token system.
- Do not introduce CSS Modules, component stylesheets, styled-components, or CSS-in-JS.
- Prefer Lucide for generic interface icons. Keep custom SVGs for brand marks, flags, or shapes Lucide cannot represent equivalently.
- Extend the approved Openings foundations, experience patterns, themes, breakpoints, motion, focus, and semantic states without introducing a second visual system.
- Do not use 2-pixel borders, hard offset shadows, `font-black`, repeated 10-pixel uppercase labels, generic AI gradients, or nested cards as default visual language.
- Keep the submitted logo monochrome. Use Brand Mint `#B0EC9C` for prioritized fills and selection, Primary Deep for accessible light-theme accent text and focus, and do not apply either to every tag, icon, border, or surface.
- Use Figtree for display, interface, and body roles, Newsreader only as a rare editorial accent, and Geist Mono for technical content.

## State, hooks, and effects

- Use validated URL state for shareable filters and navigation.
- Keep ephemeral state at the lowest owner and lift only to the nearest shared consumer.
- Use context only for stable cross-cutting values with distant consumers; it is not a remote-data cache.
- Derive values during render. Memoize only for meaningful computation or referential contracts.
- Use custom hooks for cohesive React state, lifecycle, subscription, or external synchronization behavior.
- Use effects only to synchronize with external systems. Include every reactive dependency and clean up resources.
- Never disable exhaustive-dependency rules or hide a required dependency.

## Remote data

- Preserve public URL configuration and environment-variable precedence.
- Keep URL construction, fetch, unknown-data validation, normalization, and domain queries in explicit functional boundaries.
- Treat fetched JSON as unknown until validated.
- Support cancellation where client requests can become stale.
- Preserve meaningful HTTP, parsing, and network failures; do not fabricate fallback domain data.
- Do not add service classes, retries, local snapshots, API routes, secrets, or React imports to data modules.

## Internationalization and content

- Keep all six locale dictionaries complete against one shared message type.
- Put visible UI copy, placeholders, alternative text, accessible labels, and UI errors in dictionaries.
- Keep domain values, repository identifiers, paths, and remote filter values language-neutral.
- Keep long-form localized content in the existing Markdown document structure.
- Keep filesystem document loading server-only and Markdown rendering separate from lookup.

## Validation commands

```bash
npm run lint
npm run test:outreach
npm run build
```

There is intentionally no unit-test runner. Do not claim a refactor is complete until the checks required by its specification pass. The final repository refactor specification runs all three commands.

# Components

> Keep React components focused, accessible, and placed at their true ownership boundary.

## Placement

- `app/<route>/_components/` for route-private feature UI
- `app/_components/` for UI shared across route segments
- `components/` for application-wide shell and reusable primitives
- a component-owned child folder directly inside the owning component folder

Promote a component only when reuse crosses its current boundary. Do not reach into another component's private child and do not introduce `atoms`, `molecules`, or other abstract taxonomies.

## Folder contract

Every ordinary component uses a kebab-case folder and `index.tsx`. Add `types.ts` for component-specific props. A component that accepts only `children` uses `PropsWithChildren` directly and does not need a redundant local type file.

Next.js special files keep their framework filenames. Small pure controller functions are not components and use descriptive kebab-case filenames.

## Server and client boundaries

Keep pages, layouts, and presentational composition server-compatible by default. Add `"use client"` only when hooks, browser APIs, event handlers, context, or a client-only library require it. Push the boundary down to the smallest coherent interactive subtree and pass serializable props into it.

## Component contract

- Export named ordinary components; framework entry files may use required default exports.
- Declare `React.ReactNode` return types on components.
- Keep props narrow and domain meaningful.
- Put shared domain types in their domain module, not a component `types.ts`.
- Use semantic HTML, links for navigation, and buttons for actions.
- Give icon-only controls an accessible name and decorative icons `aria-hidden`.
- Extract only repeated behavior, centralized accessibility, stable visual patterns, or clearly independent responsibilities.

## Styling and variants

Fixed utilities stay in JSX. A shared primitive may use CVA for a real finite variant contract. Model stable variant values with enums and type mappings exhaustively. Do not move static utility strings into a `styles.ts` function solely to shorten JSX.

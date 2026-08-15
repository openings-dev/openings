# Content and Routes

> Keep App Router entries thin and localized Markdown loading explicit.

## Route entries

Route `page.tsx` files own route parameters, static parameter generation, route-level revalidation, data loading, metadata when applicable, and composition. Interactive presentation belongs in a focused Client Component below the route boundary.

Consult the installed Next.js 16 documentation before changing dynamic parameters, static export, caching, metadata, navigation, or not-found behavior.

## Navigation

Use `next/link` for destinations and buttons for actions. Treat pathnames and validated search parameters as the source of truth for shareable route state. Preserve direct links, refresh, back and forward navigation, and encoded community or author identifiers.

## Markdown documents

`lib/content/markdown.ts` maps document keys and locales to repository Markdown files, parses front matter where supported, and produces bundles rendered by shared document components. Keep filesystem access server-only and keep Markdown rendering independent from file lookup.

Document routes should compose the shared document-page factory rather than repeat loading behavior. Preserve GFM rendering, safe link behavior, heading structure, and the existing localized fallback contract.

## Compatibility behavior

The current `app/not-found.tsx` performs verified compatibility redirects for removed routes before rendering the fallback. Treat this as routing behavior, not merely visual error markup, and preserve it unless a separate product change removes the compatibility requirement.

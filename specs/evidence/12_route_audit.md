# Route and Rendering Boundary Audit

Date: 2026-08-15

The installed Next.js 16.2 guidance confirms that static export executes Server
Components at build time, dynamic export routes require
`generateStaticParams`, Client Component props must be serializable, and browser
APIs belong behind a Client Component boundary. The existing route entries
already follow those constraints after the not-found boundary extraction.

| Route source | Boundary | Data and parameters | Interactive descendant |
| --- | --- | --- | --- |
| `app/page.tsx` | Server | Static composition | `OpportunitiesScreen` |
| `app/community/page.tsx` | Server | Public snapshot, `revalidate = 10800` | `CommunitiesScreen` |
| `app/community/[owner]/[name]/page.tsx` | Server | Public snapshot; async owner/name params; `generateStaticParams`; `dynamicParams = false`; metadata; `revalidate = 10800` | `OpportunitiesScreen` |
| `app/users/page.tsx` | Server | Public snapshot, `revalidate = 10800` | `UsersScreen` |
| `app/overview/page.tsx` | Server factory | Repository Markdown | `DocumentPage` descendants |
| `app/docs/api/page.tsx` | Server factory | Repository Markdown | `DocumentPage` descendants |
| `app/docs/contributing/page.tsx` | Server factory | Repository Markdown | `DocumentPage` descendants |
| `app/docs/maintainers/page.tsx` | Server factory | Repository Markdown | `DocumentPage` descendants |
| `app/privacy/page.tsx` | Server factory | Repository Markdown | `DocumentPage` descendants |
| `app/terms/page.tsx` | Server factory | Repository Markdown | `DocumentPage` descendants |
| `app/not-found.tsx` | Server | Static fallback | `LegacyRouteRedirect` owns pathname inspection |
| `app/layout.tsx` | Server | Static metadata and fonts | Theme, locale and toast providers |

## Verified contracts

- `next.config.ts` retains `output: "export"`, unoptimized images, and the two
  existing GitHub image hosts.
- Community static parameters and `repositoryFromCommunitySegments` remain
  inverse operations for the owner/name identifiers returned by the snapshot.
- The only dynamic route has `generateStaticParams` and rejects paths outside
  the generated set.
- Route files do not use browser APIs. Legacy pathname compatibility remains in
  `app/_components/legacy-route-redirect/index.tsx`.
- Build-time snapshot reads stay in the server route/query graph; interactive
  opportunity pagination reads the public generated JSON endpoint.
- No API route, request-dependent route handler, authentication boundary, or
  server runtime was introduced.

<p align="center">
  <a href="https://openings.dev">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/openings-wordmark-dark.svg" />
      <img src="public/openings-wordmark-light.svg" alt="openings.dev" width="260" />
    </picture>
  </a>
</p>

<p align="center">
  Find technology jobs shared through public GitHub communities, then continue at the original source.
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/openings-dev/openings" alt="GitHub stars" />
  <img src="https://img.shields.io/github/license/openings-dev/openings" alt="License" />
  <img src="https://img.shields.io/github/contributors/openings-dev/openings" alt="Contributors" />
</p>

## Overview

`openings.dev` is a public search interface for technology jobs shared through supported GitHub communities. It keeps each result connected to its original listing without replacing the source. The application is exported as static pages and reads raw JSON files published by the separate [`openings-dev/data`](https://github.com/openings-dev/data) repository.

The production job catalog does not use local job data, mocks, fixtures, or JSON snapshots. All opportunity, facet, repository, community, user, and job-detail data is loaded through remote raw URLs.

## Architecture

```txt
app/
  _components/             shared route-level components
  _hooks/                  route-level React hooks
  community/               community directory and repository routes
  docs/                    rendered project documentation pages
  jobs/                    canonical static job pages and social images
  opportunities/           opportunities screen and feature UI
  users/                   GitHub author directory and profile routes
components/
  footer/                  global footer components
  header/                  global header components
  icons/                   shared icon components
  providers/               app providers
  ui/                      low-level UI primitives
lib/
  constants/               locale constants
  content/                 markdown document loading
  metadata/                canonical metadata and social-card rendering
  opportunities/           remote data services, routing helpers, and domain types
  translations/            UI copy by locale
  utils/                   framework-agnostic utilities
docs/
  */                       localized markdown rendered by the app
```

Key boundaries:

- `app/**/page.tsx` files define App Router routes and static params.
- `app/opportunities/_components/**` owns the opportunities feature UI and UI-only controller hooks.
- `lib/opportunities/api.ts` reads the remote static API files.
- `lib/opportunities/snapshot.ts` reads the remote segmented snapshot index for static community/user route generation.
- `lib/opportunities/static-api.ts` centralizes raw data base URLs.
- `lib/opportunities/types.ts` owns shared opportunity domain types.
- `lib/metadata/social-card.tsx` renders the shared Product Sheet social image.

## Data Source

Default remote data endpoints:

```txt
https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities
https://raw.githubusercontent.com/openings-dev/data/main
```

The app consumes:

- `api/manifest.json` for metadata, facets, and static API file pointers.
- `api/order/recent.json` for ordered opportunity IDs.
- `api/page-lookup.json` and `api/pages/*.json` for paginated list loading.
- `api/jobs/*.json` and `api/job-ids.json` for opportunity-detail lookup and static identifiers.
- `index.json` plus `countries/*` shards for community and user static params.
- `src/modules/catalog/repositories.json` through the remote repository base URL for valid filter options.

There is no local API route for opportunities and no local JSON import in the front-end.

## Configuration

Create `.env.local` only when you need to override the production data source:

```bash
NEXT_PUBLIC_OPENINGS_DATA_BASE_URL=https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities
NEXT_PUBLIC_OPENINGS_DATA_REPOSITORY_BASE_URL=https://raw.githubusercontent.com/openings-dev/data/main
```

Server-side equivalents are also supported for build-time usage:

```bash
OPENINGS_DATA_BASE_URL=https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities
OPENINGS_DATA_REPOSITORY_BASE_URL=https://raw.githubusercontent.com/openings-dev/data/main
OPENINGS_DATA_SNAPSHOT_URL=https://raw.githubusercontent.com/openings-dev/data/main/snapshots/opportunities/index.json
```

## Development

Requirements:

- Node.js `>=20.9.0`
- npm

Install and run locally:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
```

`npm run build` runs the production Next.js static export and writes the generated site to `out/`.

Job pages, community and GitHub-author profiles, route-specific social images,
metadata, and route lists are generated during that build. Publishing a new
data snapshot therefore requires a fresh site build; these pages do not update
through ISR.

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening a pull request.

Source repository and snapshot changes belong in the [`openings-dev/data`](https://github.com/openings-dev/data) repository. Front-end changes should keep data access centralized in `lib/opportunities` and must not add local datasets or mock JSON files.

## License

[MIT](./LICENSE)

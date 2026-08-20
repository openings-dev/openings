# openings.dev Overview

Openings helps people find technology jobs shared through public GitHub communities. It makes those listings searchable without replacing their original source.

The front-end is a Next.js App Router project exported as static pages. It does not store opportunity data locally. The application reads raw JSON files published by the separate `openings-dev/data-pipeline` repository as a public static-data interface.

## What the Platform Does

- Lists open technology jobs from configured public GitHub repositories.
- Provides filters for repository, region, country, tags, authors, sort order, and view mode.
- Generates static community and user pages from the remote dataset. Job details open in the discovery route through the `?job=<id>` query.
- Renders project documentation and policy pages from local markdown content.
- Keeps source provenance by linking back to the original public listing and repository.

## Data Flow

1. The `openings-dev/data-pipeline` pipeline reads configured public GitHub repositories.
2. The data pipeline normalizes public listings, builds facets, writes paginated static data files, and publishes them to GitHub.
3. The front-end reads those files from `raw.githubusercontent.com`.
4. UI filtering and pagination resolve IDs, pages, and job detail buckets from the remote static API.
5. Static params for community and user pages are generated from the same remote dataset at build time.

## Current Boundaries

- Front-end: `openings-dev/web`.
- Data pipeline and raw static data: `openings-dev/data-pipeline`.
- Local front-end data files: none.
- Local opportunity API route: none.
- Supported source types: public GitHub issues, discussions, and community boards.

## Architecture Summary

- `app/` owns routes and route-local screens.
- `components/` owns reusable shell and UI primitives.
- `lib/opportunities/` owns remote data services, routing helpers, and opportunity domain types.
- `lib/utils/` owns framework-agnostic utilities.
- `docs/` and root markdown files provide content for documentation routes.

## Current Scope

The project is focused on discoverability for public technology opportunities already posted in community repositories. It is not a company ATS, not a resume platform, and not a replacement for the original source repository.

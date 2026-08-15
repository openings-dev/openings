# Openings Documentation and Repository Refactor Design

> Define the documentation authority and the decomposition strategy for a repository-wide, behavior-preserving refactor.

## Goal

Align the copied `.knowledge/` and agent instructions with the current Openings repository, then describe a complete sequence of executable refactor specifications that moves the codebase toward those standards without changing product behavior or visual design.

## Scope

The work covers the Next.js application under `openings/`, including `app/`, `components/`, `lib/`, configuration, documentation, and dependencies. The refactor may replace equivalent styling and icon implementations with Tailwind CSS and Lucide, but it must preserve rendered appearance, accessibility, URLs, remote-data contracts, localization, static export behavior, and user interactions.

The work does not introduce a test framework, redesign screens, change copy, change the public data schema, create a backend, or add product functionality.

## Documentation authority

`AGENTS.md` is the single canonical instruction file. It contains the rules needed on every task and links to focused `.knowledge/` documents for rationale and project-specific detail. `AGENTS copy.md` is removed after useful rules are incorporated.

The knowledge base describes the repository that exists today and separately labels refactor targets. It uses English, snake_case documentation names, focused topics, verified paths, and cross-links instead of repeating entire rule sets.

## Refactor architecture

The refactor is decomposed by architectural boundary rather than only by directory. This keeps related changes together when a concern crosses `app/`, `components/`, and `lib/`.

The ordered workstreams are:

1. establish a verified baseline and invariants;
2. normalize naming, files, types, enums, and constants;
3. consolidate Tailwind styling and shared utilities;
4. refactor shared primitives and providers;
5. refactor the application shell, header, and footer;
6. refactor Markdown content rendering and document routes;
7. normalize internationalization boundaries;
8. split and strengthen remote data access and domain models;
9. refactor community and user directories;
10. decompose the opportunities controller and filter state;
11. refactor opportunities presentation components;
12. audit routes and Server/Client Component boundaries;
13. remove obsolete code and dependencies and verify the full static export.

Each specification produces a coherent, reviewable state. Later specifications may depend on earlier foundations, and `specs/README.md` records that order.

## Invariants

- Routes and compatible legacy redirects remain unchanged.
- Static export remains enabled.
- Remote JSON remains the only opportunity, community, and user data source.
- Environment-variable precedence and default URLs remain unchanged.
- All six supported locales remain complete and selectable.
- Existing light and dark themes, responsive layouts, motion, and accessible behavior remain equivalent.
- No local data snapshots, API routes, backend proxy, or test runner are added.
- No custom classes are introduced; application behavior remains functional.

## Validation strategy

There is no new automated test suite. Every implementation specification uses the repository's available checks in proportion to its scope:

- `npm run lint` for source and convention changes;
- `npm run test:outreach` for maintainer-document changes;
- `npm run build` for rendering, routing, remote-data, or static-export changes;
- targeted searches and manual route checks where lint and build cannot prove an invariant.

The final specification runs every available check and compares the result against the baseline captured by the first specification.

## Execution model

Specifications are executed in numeric order. Every task uses small steps, names exact files or file groups, states preservation requirements, supplies validation commands and expected outcomes, and ends at a sensible commit boundary. A specification is complete only when its checks pass and its invariants remain true.

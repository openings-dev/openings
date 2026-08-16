# 32 — Dedicated user pages and social metadata

Status: Complete

## Tasks

- [x] Generate static `/users/[handle]` routes from snapshot authors.
- [x] Resolve the user summary at build time and render the existing scoped opportunity experience.
- [x] Update user links to the dedicated route without removing query compatibility.
- [x] Add accurate canonical, Open Graph, and Twitter metadata to community and user profile pages.
- [x] Preserve static export and unknown-profile not-found behavior.

## Validation

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

# 41 — Mobile navigation and responsive shell

Status: Complete

## Goal

Make every primary destination reachable on small screens while preserving the Buffer Bold shell and existing routes.

## Tasks

- [x] Add a compact mobile-navigation action to the shared header.
- [x] Render navigation, theme, language, and GitHub controls in an accessible native dialog.
- [x] Close the menu after internal navigation and preserve keyboard/Escape behavior.
- [x] Refine narrow-screen header spacing and touch targets without changing desktop behavior.

## Validation

- `npm run lint`
- `./node_modules/.bin/tsc --noEmit`

# 27 — Locale persistence and interface language

Status: Complete

## Goal

Keep the chosen interface language stable and remove remaining English-only accessibility labels from localized screens.

## Tasks

- [x] Persist only validated locale codes in browser storage.
- [x] Synchronize locale changes across tabs and update the document language.
- [x] Add typed translations for primary navigation, theme switching, social links, and profile summary terms in all six dictionaries.
- [x] Consume the localized labels at their ownership boundaries.

## Validation

- `npm run lint`
- `npm run build`

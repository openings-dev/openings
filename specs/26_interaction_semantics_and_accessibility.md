# 26 — Interaction semantics and accessibility

Status: Complete

## Goal

Make interactive structures predictable for pointer, keyboard, and assistive-technology users.

## Tasks

- [x] Replace the button-like opportunity-card container with a non-interactive article and a dedicated, named details button layer.
- [x] Keep community and author controls independently operable above the details action.
- [x] Mark the active primary navigation destination with `aria-current="page"`.
- [x] Programmatically label the mobile details dialog and restore focus after it closes.
- [x] Mark decorative interface icons as hidden from assistive technology.
- [x] Expose asynchronously changing result and snapshot copy with appropriate live-region semantics.

## Validation

- `npm run lint`
- `npm run build`

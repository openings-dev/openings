# 40 — Buffer Bold responsive and final verification

Status: Complete

## Tasks

- [x] Audit shared route surfaces at narrow, medium, and wide breakpoints.
- [x] Confirm the native advanced-filter dialog closes with Escape, restores focus, traps focus, and remains usable with long localized labels.
- [x] Confirm light/dark parity, focus visibility, reduced motion, and minimum touch targets.
- [x] Remove stale Calm Professional wording from canonical documentation.
- [x] Run lint, TypeScript, and the static production build.
- [x] Record evidence and mark specs 35–40 complete.

## Evidence

- `npm run lint` — passed.
- `./node_modules/.bin/tsc --noEmit` — passed.
- `PATH=/Users/guilherme/.nvm/versions/node/v24.14.1/bin:$PATH npm run build` — passed; 464 static pages generated.

## Validation

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

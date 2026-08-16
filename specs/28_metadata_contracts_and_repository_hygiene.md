# 28 — Metadata, contracts, and repository hygiene

Status: Complete

## Goal

Align public metadata and repository mechanics with the documented product and code standards.

## Tasks

- [x] Use accurate product metadata and a stable title template.
- [x] Add explicit component return types where the repository contract is currently violated.
- [x] Declare the supported Node.js runtime and npm package manager in `package.json` and its lockfile.
- [x] Remove the non-canonical Yarn lockfile.
- [x] Refresh knowledge notes that still describe already-resolved refactor pressure points.

## Validation

- `npm run lint`
- `npm run build`

# Services and Remote Data

> Keep public data access functional, validated, and independent from React.

## Current boundary

Openings uses native `fetch` through functions under `lib/opportunities/`. The code reads public generated JSON from the data repository. There is no authenticated API client, backend-for-frontend, local database, service class, or bearer credential.

## Responsibilities

- URL modules resolve configured base URLs and resource paths.
- fetch helpers perform a concrete read and report HTTP or parsing failure.
- validators and normalizers turn unknown JSON into domain data.
- domain query functions implement opportunity, community, and author use cases.
- React controllers own loading and interaction state but do not construct remote paths.

Large modules may be split along these responsibilities. Keep names about the public Openings data contract rather than GitHub internals or framework mechanisms.

## Functional rules

- Export named functions and native data structures; do not declare custom classes.
- Accept an `AbortSignal` where client cancellation is relevant.
- Keep repeated paths in named constants or focused URL builders.
- Treat fetched JSON as unknown until validated.
- Do not swallow unexpected failures or fabricate fallback opportunities.
- Do not add retries without an explicit product requirement.
- Do not import React from remote-data modules.
- Do not create barrel files that only re-export domain functions.

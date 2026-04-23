# API Reference

This document describes the public API direction for openings.dev.

The API is designed to expose the same normalized jobs index used by the web app, so third-party products can build search, analytics, and automation workflows on top of community job data.

## Status

The API is public-facing and evolving. Contract details may change as coverage, normalization rules, and filters continue to mature.

## Response design goals

- Consistent schema across source repositories.
- Predictable pagination behavior.
- Stable identifiers for de-duplication and sync.
- Explicit fields for stack, seniority, remote policy, and location.

## Filtering goals

API consumers should be able to filter by common job-discovery dimensions, including:

- Technology stack
- Seniority
- Remote status
- Country or region
- Source repository

## Versioning

Backward-incompatible updates should be versioned and communicated in changelog updates.

## Support

For API questions, examples, and integration help, open an issue in the repository:

- [GitHub Issues](https://github.com/openings-dev/openings/issues)

# Project Overview

> Describe what Openings does, what it depends on, and what it intentionally does not own.

## Product scope

Openings indexes technology job listings shared through public GitHub communities. Supported sources include GitHub issues, discussions, and community boards. Visitors can browse and filter jobs, inspect communities and listing authors, switch language and theme, and read project documents.

The frontend owns presentation, filtering interaction, route generation, localization, and consumption of generated data. The separate `openings-dev/data` repository owns collection, normalization, and publication of the dataset.

## Stack

- Next.js 16.2 App Router with static export
- React 19 and strict TypeScript
- Tailwind CSS 4
- Radix Select and Slot primitives
- Class Variance Authority, `clsx`, and `tailwind-merge`
- Framer Motion for existing motion behavior
- Lucide React for general interface icons
- `react-markdown` with GitHub Flavored Markdown
- The theme provider is project-owned and synchronizes system, light, and dark preferences.
- npm and Node.js 20.9 or newer

## User-facing routes

- `/` — opportunity discovery
- `/community` and `/community/[owner]/[name]` — repository communities
- `/users` and `/users/[handle]` — opportunity-author directory and shareable profiles
- `/overview`, `/privacy`, and `/terms` — project documents
- `/docs/api`, `/docs/contributing`, and `/docs/maintainers` — contributor documents

Some removed dynamic routes are handled through the current not-found compatibility behavior. Preserve verified compatibility paths during refactoring.

## Non-goals

- No application database or API routes
- No checked-in opportunity snapshot or fixture dataset
- No authentication or private user state
- No new automated test framework in the current refactor program
- No second visual system or unrelated product behavior change

# Refactor Baseline Evidence

> Capture the verified repository state before production code is refactored.

## Repository state

- Date: 2026-08-15
- Starting commit: `3d5444a1bdd4b96f37a4775b668b76c985cec6a0`
- Branch: `refactor/codebase`
- Runtime used for validation: Node.js `v24.19.0`, npm `11.11.0`
- Initial tracked state: clean before dependency installation
- Package installation note: `npm install` rewrote `yarn.lock`; that generated change was restored because npm and `package-lock.json` are the documented package-manager contract

## Routes

| Source | Public route | Data/static behavior |
| --- | --- | --- |
| `app/page.tsx` | `/` | static |
| `app/community/page.tsx` | `/community` | static, `revalidate = 10800` |
| `app/community/[owner]/[name]/page.tsx` | `/community/[owner]/[name]` | `generateStaticParams`, `revalidate = 10800` |
| `app/docs/api/page.tsx` | `/docs/api` | static Markdown document |
| `app/docs/contributing/page.tsx` | `/docs/contributing` | static Markdown document |
| `app/docs/maintainers/page.tsx` | `/docs/maintainers` | static Markdown document |
| `app/overview/page.tsx` | `/overview` | static Markdown document |
| `app/privacy/page.tsx` | `/privacy` | static Markdown document |
| `app/terms/page.tsx` | `/terms` | static Markdown document |
| `app/users/page.tsx` | `/users` | static, `revalidate = 10800` |
| `app/not-found.tsx` | `/_not-found` plus legacy client redirects | static fallback with client pathname compatibility behavior |

The successful baseline build generated 148 static pages: the static routes above plus 137 community detail paths reported by Next.js.

## Configuration invariants

- `next.config.ts` uses `output: "export"`.
- Images remain unoptimized for static export.
- Remote image patterns allow `github.com` and `avatars.githubusercontent.com`.
- `OPENINGS_DATA_SNAPSHOT_URL` selects the build-time snapshot index.
- `NEXT_PUBLIC_OPENINGS_DATA_BASE_URL` selects the public generated opportunity API base.
- `NEXT_PUBLIC_OPENINGS_DATA_REPOSITORY_BASE_URL` selects the public data repository base.
- Code also supports server-only `OPENINGS_DATA_BASE_URL` and `OPENINGS_DATA_REPOSITORY_BASE_URL` overrides as documented in `README.md`.

## Dependency intent

| Dependency group | Packages and verified responsibility |
| --- | --- |
| Framework | `next`, `react`, `react-dom` |
| UI primitives | `@radix-ui/react-select`, `@radix-ui/react-slot` |
| Styling | `tailwindcss`, `@tailwindcss/postcss`, `class-variance-authority`, `clsx`, `tailwind-merge` |
| Interaction and icons | `framer-motion`, `lucide-react`, `sonner` |
| Theme | `next-themes` is a cleanup candidate because the current project-owned provider must be compared with verified imports before removal |
| Markdown | `react-markdown`, `remark-gfm` |
| Type and lint tooling | `typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `eslint`, `eslint-config-next` |

## Baseline validation

| Command | Result | Evidence |
| --- | --- | --- |
| `npm run lint` | PASS | ESLint exited 0 with no diagnostics |
| `npm run test:outreach` | PASS | `Maintainer outreach contract is valid.` |
| `npm run build` in restricted network | BLOCKED | Google Fonts could not be reached; no source error was reported before the font fetch failure |
| `npm run build` with network access | PASS | compilation and TypeScript passed; 148 static pages generated |

The successful build emitted one environment warning: Next.js detected the main repository and worktree `package-lock.json` files and inferred the main repository as the workspace root. This is worktree-only baseline noise, not an application regression.

# Markdown Content and Document Routes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split document lookup, metadata, and Markdown rendering into focused server and presentation boundaries.

**Architecture:** Server-only modules resolve localized files and parse document metadata. Shared React components render already-loaded bundles. Route entries remain thin and use one document-page factory.

**Tech Stack:** Next.js App Router, Node filesystem APIs, React Markdown, remark-gfm

---

### Task 1: Split document loading responsibilities

**Files:**
- Split: `lib/content/markdown.ts`
- Create: `lib/content/document-key.ts`, `lib/content/document-config.ts`, `lib/content/read-document.ts`, `lib/content/document-types.ts`
- Modify: all document route and component imports

- [ ] **Step 1: Preserve the verified document map**

Move the closed document-key values and the exact root/localized file mapping into focused modules. Preserve API, contributing, maintainers, overview, privacy, and terms paths and locale fallbacks.

- [ ] **Step 2: Separate parsing from lookup**

Keep filesystem reads and path resolution server-only. Move front-matter or title parsing into pure functions with explicit inputs and outputs. Preserve current error behavior for missing required files.

- [ ] **Step 3: Remove the broad module**

Update concrete imports and remove `lib/content/markdown.ts` only after no consumer remains. Do not create `lib/content/index.ts`.

### Task 2: Refactor document components

**Files:**
- Refactor: `app/_components/document-page/**`
- Split: `app/_components/document-page/document-markdown/index.tsx`

- [ ] **Step 1: Decompose Markdown rendering**

Extract independently nameable renderers for headings, links, code blocks, tables, and lists only when the current 263-line component gives them distinct behavior. Keep owned children inside `document-markdown/` and preserve GFM output and class utilities.

- [ ] **Step 2: Keep the page factory server-only**

Place the document-page factory in a descriptive kebab-case functional module rather than disguising it as a component. It must load a bundle and return the shared DocumentPage without adding a client boundary.

- [ ] **Step 3: Colocate props**

Keep DocumentPage and DocumentMarkdown props with their component owners. Keep the document bundle type in `lib/content/` because it crosses the data/presentation boundary.

### Task 3: Normalize document routes

**Files:**
- Refactor: `app/overview/page.tsx`, `app/privacy/page.tsx`, `app/terms/page.tsx`
- Refactor: `app/docs/api/page.tsx`, `app/docs/contributing/page.tsx`, `app/docs/maintainers/page.tsx`

- [ ] **Step 1: Use one route composition contract**

Each page passes one typed document key to the shared factory and retains its current metadata and static behavior. Do not duplicate file lookup or Markdown parsing in route files.

- [ ] **Step 2: Validate documents**

Run: `npm run test:outreach`

Expected: exit code 0 and unchanged maintainer outreach requirements.

- [ ] **Step 3: Run lint and build**

Run: `npm run lint && npm run build`

Expected: exit code 0; all six document routes export.

- [ ] **Step 4: Commit**

Run: `git add app lib && git commit -m "refactor: separate document loading and rendering"`

Expected: one content-boundary commit.

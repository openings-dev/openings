# Routes and Rendering Boundaries Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Audit every route against Next.js 16 static-export and Server/Client Component rules after feature refactoring.

**Architecture:** Route entries own parameters, metadata, static generation, and server data. Client boundaries own only browser interaction. Compatibility redirects and remote build-time reads remain explicit.

**Tech Stack:** Next.js 16.2 App Router, React 19, static export

---

### Task 1: Review installed Next.js guidance

**Files:**
- Read: relevant files under `node_modules/next/dist/docs/`
- Inspect: `next.config.ts`, every file under `app/` named `page.tsx`, `layout.tsx`, or `not-found.tsx`

- [ ] **Step 1: Read static export guidance**

Read the installed documentation for static exports, dynamic routes and `generateStaticParams`, route parameters, metadata, Server and Client Components, caching/revalidation, and not-found behavior. Record only guidance that changes an implementation decision in the commit notes.

- [ ] **Step 2: Build a route audit table**

For every route, record server/client status, data source, dynamic params, static params, revalidation, metadata, and interactive descendant. Compare it with Spec 01.

### Task 2: Correct route boundaries

**Files:**
- Refactor as required: `app/layout.tsx`, `app/page.tsx`, `app/not-found.tsx`
- Refactor as required: every route `page.tsx` under `app/`

- [ ] **Step 1: Remove unnecessary client directives**

Keep route entries server-renderable unless installed Next.js rules or direct browser interaction require otherwise. Move browser behavior into an owned child and pass serializable props.

- [ ] **Step 2: Keep route entries thin**

Move reusable parsing, formatting, and domain querying out of route files. Retain route parameters, static generation, revalidation, not-found decisions, metadata, and top-level composition.

- [ ] **Step 3: Preserve compatibility routing**

Keep the current legacy redirect resolution in `app/not-found.tsx` behaviorally equivalent. Isolate browser pathname inspection if required, but do not turn ordinary not-found rendering into a global client boundary unnecessarily.

### Task 3: Verify static generation contracts

**Files:**
- Inspect: `app/community/[owner]/[name]/page.tsx`
- Inspect: remote-data functions used by static routes
- Inspect: `next.config.ts`

- [ ] **Step 1: Verify dynamic path encoding**

Confirm community owner/name static params and route reconstruction are inverses for every generated repository identifier. Preserve URL encoding and not-found handling.

- [ ] **Step 2: Verify build-time remote reads**

Confirm server-only modules perform snapshot reads and client bundles do not import Node filesystem APIs or build-only environment access.

- [ ] **Step 3: Keep export configuration**

Preserve `output: "export"`, unoptimized image behavior required for static output, and current remote image patterns.

### Task 4: Validate and commit

**Files:**
- Modify: route and boundary files changed above

- [ ] **Step 1: Run lint and build**

Run: `npm run lint && npm run build`

Expected: exit code 0, no Server/Client serialization error, and the same public route set as Spec 01.

- [ ] **Step 2: Inspect generated output**

Confirm `out/` contains the expected root, opportunity, directory, document, privacy, terms, and generated community pages. Confirm no API route or server runtime artifact was introduced.

- [ ] **Step 3: Commit**

Run: `git add app lib next.config.ts && git commit -m "refactor: tighten rendering boundaries"`

Expected: one routing-boundary commit.

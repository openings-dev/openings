# Community and User Directories Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give community and user directories shared list mechanics with domain-specific mapping at the route boundary.

**Architecture:** Server route entries fetch domain summaries and pass serializable view models into focused Client Components only where filters require interaction. Shared directory components own layout and accessibility without depending on opportunity transport shapes.

**Tech Stack:** Next.js static generation, React, Tailwind CSS, Lucide React

---

### Task 1: Refactor shared directory components

**Files:**
- Refactor: `app/_components/directory/**`
- Refactor: `app/_components/location-filters/**`
- Refactor: `app/_hooks/use-responsive-filter-panel.ts`

- [ ] **Step 1: Define shared view models**

Keep directory card details, list-shell counts, screen copy, and location filters as presentation contracts independent from `CommunitySummary` and `UserSummary`. Map domains to these contracts at their feature boundary.

- [ ] **Step 2: Isolate interactive location filters**

Keep country and region selection, reset, responsive disclosure, and derived option counts in focused hooks/components. Preserve current sorting, disabled states, labels, and responsive behavior.

- [ ] **Step 3: Preserve generic list semantics**

Keep empty states, result counts, stable keys, link destinations, and semantic list markup. Do not make the generic shell aware of community or user URL construction.

### Task 2: Refactor community routes and components

**Files:**
- Refactor: `app/community/page.tsx`
- Refactor: `app/community/[owner]/[name]/page.tsx`
- Refactor: `app/community/_components/communities-screen/**`

- [ ] **Step 1: Keep route data server-owned**

Fetch community summaries and static params in server route files or server-only query modules. Pass serializable summaries and locale messages to the interactive screen.

- [ ] **Step 2: Decompose the communities screen**

Give CommunitiesScreen, CommunitiesList, and CommunityCard their own folders and props. Use the shared directory card where its contract matches; do not duplicate card markup for domain labels alone.

- [ ] **Step 3: Preserve community path behavior**

Keep owner/name encoding, repository reconstruction, not-found behavior, opportunity-filter destination, avatar fallback, counts, and revalidation unchanged.

### Task 3: Refactor the user directory

**Files:**
- Refactor: `app/users/page.tsx`
- Refactor: `app/users/_components/users-screen/**`

- [ ] **Step 1: Decompose user components**

Give UsersScreen, UsersList, and UserCard their own folders and prop types. Reuse shared directory presentation where behavior and layout are identical.

- [ ] **Step 2: Preserve user filter destinations**

Keep normalized author handles, opportunity-filter links, avatar fallback, location filtering, counts, localization, and route revalidation unchanged.

### Task 4: Validate and commit

**Files:**
- Modify: all files changed above

- [ ] **Step 1: Run lint and build**

Run: `npm run lint && npm run build`

Expected: exit code 0; community index, generated community details, and user index export.

- [ ] **Step 2: Compare route counts**

Compare generated community detail route count and directory counts with Spec 01 evidence. Expected: no unexplained difference caused by presentation refactoring.

- [ ] **Step 3: Commit**

Run: `git add app && git commit -m "refactor: align community and user directories"`

Expected: one directory-feature commit.

# Remote Data and Domain Models Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split broad remote-data modules into explicit configuration, transport, validation, indexing, and domain-query boundaries.

**Architecture:** Public URL builders remain centralized. A small JSON transport reports HTTP and parse failures. Domain modules validate unknown input and implement opportunity, community, and user queries without React or custom classes.

**Tech Stack:** TypeScript, native fetch, Next.js build-time execution, public JSON snapshots

---

### Task 1: Consolidate data URL configuration

**Files:**
- Refactor: `lib/opportunities/static-api.ts`
- Refactor: configuration portions of `lib/opportunities/snapshot.ts`
- Inspect: `.env.example`, `README.md`

- [ ] **Step 1: Record exact precedence**

Write down which server and public environment variable wins for snapshot, API, and repository URLs and the exact default values. Preserve this order in focused URL functions.

- [ ] **Step 2: Create focused path builders**

Separate base URL resolution from resource path composition. Normalize trailing slashes exactly once and keep dynamic identifiers encoded at the boundary that owns them.

- [ ] **Step 3: Preserve environment documentation**

Update `.env.example` or README only if current documented precedence is inaccurate. Do not add variables or change defaults.

### Task 2: Create a shared public JSON transport

**Files:**
- Extract from: `lib/opportunities/api.ts`, `lib/opportunities/snapshot.ts`
- Create: `lib/opportunities/fetch-json.ts`, `lib/opportunities/fetch-json-batches.ts`

- [ ] **Step 1: Implement one concrete fetch contract**

The helper accepts a URL and optional `AbortSignal`, checks `response.ok`, parses JSON as `unknown`, and throws a native Error carrying a safe resource description. It must not log, retry, import React, or assert a domain type.

- [ ] **Step 2: Preserve bounded batch behavior**

Move segmented snapshot batching into a focused function and preserve the current batch size, order, and failure semantics.

### Task 3: Split opportunity API responsibilities

**Files:**
- Split: `lib/opportunities/api.ts`
- Create focused modules for manifest loading, ordering, page lookup, item loading, search, facet counting, and the public page query
- Modify: controller and route consumers

- [ ] **Step 1: Separate pure index operations**

Move search normalization, ID union/intersection, pagination parsing, deduplication, and facet counting into pure functions with explicit types. Preserve filter combination semantics and result order exactly.

- [ ] **Step 2: Separate artifact reads**

Give manifest, order, lookup, page, job, and search reads named functions using the shared transport. Keep artifact paths centralized and preserve current caching behavior.

- [ ] **Step 3: Keep one page-query facade**

Retain a concrete `fetchOpportunitiesPage`-equivalent function that coordinates the modules and returns the existing serializable payload contract. Consumers must not assemble generated API internals.

### Task 4: Split snapshot, community, and user normalization

**Files:**
- Split: `lib/opportunities/snapshot.ts`
- Refactor: `lib/opportunities/communities.ts`, `lib/opportunities/users.ts`, `lib/opportunities/summary-helpers.ts`

- [ ] **Step 1: Centralize unknown-value readers**

Extract shared `asRecord` and nullable string readers only when their verified semantics match. Keep them pure and return null for rejected unknown values.

- [ ] **Step 2: Separate dataset loading from summaries**

Keep segmented dataset loading, sorting/deduplication, community aggregation, user aggregation, and summary formatting in independent modules. Preserve current sorting, normalization, and counts.

- [ ] **Step 3: Remove duplicated normalization**

Search for duplicate author handle, repository label, date conversion, and location key logic. Choose one domain owner for each verified identical rule and update concrete imports.

### Task 5: Validate and commit

**Files:**
- Modify: all files changed above

- [ ] **Step 1: Run lint**

Run: `npm run lint`

Expected: exit code 0 and no React imports under the remote-data modules.

- [ ] **Step 2: Run build**

Run: `npm run build`

Expected: exit code 0, successful public data reads, and the baseline static route set.

- [ ] **Step 3: Commit**

Run: `git add .env.example README.md app lib && git commit -m "refactor: separate remote data boundaries"`

Expected: one domain-data commit.

# Baseline and Invariants Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Capture a reproducible baseline and a concrete preservation checklist before structural refactoring starts.

**Architecture:** This stage changes documentation only. It records the current routes, scripts, dependencies, remote configuration, and validation results so later stages can distinguish regressions from pre-existing behavior.

**Tech Stack:** Next.js 16.2, React 19, TypeScript, npm, ESLint, static export

---

### Task 1: Record the repository baseline

**Files:**
- Create: `specs/evidence/01_baseline.md`
- Inspect: `package.json`, `next.config.ts`, `.env.example`, `app/**/page.tsx`, `app/not-found.tsx`

- [ ] **Step 1: Record repository state**

Add the current commit hash, branch, Node version, npm version, and a note listing any pre-existing uncommitted files to `specs/evidence/01_baseline.md`. Do not modify or discard unrelated changes.

- [ ] **Step 2: Record routes and configuration**

List every current `page.tsx`, its public pathname, dynamic parameters, exported `revalidate` value, and whether it uses `generateStaticParams`. Record the five Openings data environment variables and `output: "export"`.

- [ ] **Step 3: Record dependency intent**

Copy the names—not versions—of current runtime and development dependencies into the evidence file and classify each from verified imports or configuration. Mark an apparently unused dependency as a cleanup candidate, not as unused fact.

### Task 2: Run the pre-refactor checks

**Files:**
- Modify: `specs/evidence/01_baseline.md`

- [ ] **Step 1: Run lint**

Run: `npm run lint`

Expected: exit code 0. Record the command, date, and exit code. If it fails, record the exact failing rule and location as baseline debt before changing source.

- [ ] **Step 2: Run outreach validation**

Run: `npm run test:outreach`

Expected: exit code 0. Record any existing failure exactly.

- [ ] **Step 3: Run the static export**

Run: `npm run build`

Expected: exit code 0 and generated static output under `out/`. Record emitted routes and any warnings relevant to later stages.

- [ ] **Step 4: Commit the evidence**

Run: `git add specs/evidence/01_baseline.md && git commit -m "docs: record refactor baseline"`

Expected: one documentation-only commit.

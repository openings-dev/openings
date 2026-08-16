# Cleanup and Final Verification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove proven obsolete code and dependencies, reconcile documentation, and verify the complete refactor against the recorded baseline.

**Architecture:** Cleanup follows—not precedes—feature refactoring so searches and builds can prove what is unused. Final verification compares routes, data contracts, locale coverage, architecture rules, and every available repository check.

**Tech Stack:** npm, ESLint, Next.js static export, Git

---

### Task 1: Remove obsolete source artifacts

**Files:**
- Inspect: all of `app/`, `components/`, `lib/`
- Modify/remove: only files proven to have no runtime, type, configuration, script, or documentation consumer

- [x] **Step 1: Find dead modules and barrels**

Search imports and exports for unused modules, barrel-only `index.ts` files, empty folders, stale style modules, duplicated helpers, and legacy types superseded by earlier specs. For each removal, identify the replacement or prove zero consumers.

- [x] **Step 2: Find convention regressions**

Search for ordinary component `.tsx` files outside component folders, custom classes, `any`, disabled exhaustive-dependency rules, raw migrated enum comparisons, CSS Modules, styled-components, and new local data files. Resolve every match or document why it is a legitimate framework/configuration exception.

- [x] **Step 3: Remove generated local artifacts from review**

Ensure `.next/`, `out/`, logs, caches, and editor files remain ignored and are not staged. Do not delete or reset unrelated user files.

### Task 2: Audit dependencies and configuration

**Files:**
- Modify if proven: `package.json`, `package-lock.json`
- Inspect: `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json`, `next.config.ts`

- [x] **Step 1: Prove dependency usage**

Search imports and configuration for every dependency recorded in Spec 01. Remove a package only when it has no verified source, build, styling, or runtime consumer after all refactors.

- [x] **Step 2: Use npm for dependency removal**

Run `npm uninstall <proven-unused-package>` separately for each confirmed candidate so `package.json` and `package-lock.json` remain synchronized. Do not hand-edit lockfile entries.

- [x] **Step 3: Normalize configuration conservatively**

Remove only obsolete options made unnecessary by the refactor. Preserve strict TypeScript, the `@/*` alias, Tailwind PostCSS, Next.js lint presets, image behavior, and static export.

### Task 3: Reconcile documentation

**Files:**
- Modify: `README.md`, `AGENTS.md`, `.knowledge/**/*.md`, `specs/README.md`

- [x] **Step 1: Compare docs with final paths**

Check every documented source path, route, command, environment variable, locale, dependency, and boundary against the final repository. Correct stale facts without copying implementation details into multiple documents.

- [x] **Step 2: Mark completed specs**

Update the status table in `specs/README.md` only for stages whose checks and commits actually completed. Keep the design and execution history; do not rewrite specs to pretend the repository always had the final structure.

- [x] **Step 3: Scan documentation quality**

Search `.knowledge/` and `specs/` for `Otafox`, broken relative links, missing files, contradictory locale counts, placeholder language, and references to a test runner. Expected: zero stale Otafox references and no unfinished instruction.

### Task 4: Run final verification

**Files:**
- Create: `specs/evidence/13_final_verification.md`
- Compare: `specs/evidence/01_baseline.md`

- [x] **Step 1: Run lint**

Run: `npm run lint`

Expected: exit code 0. Record date and exit code.

- [x] **Step 2: Run outreach validation**

Run: `npm run test:outreach`

Expected: exit code 0. Record date and exit code.

- [x] **Step 3: Run production build**

Run: `npm run build`

Expected: exit code 0 and static output under `out/`. Record route count and build warnings.

- [x] **Step 4: Compare invariants**

Compare routes, environment variables, remote defaults, locale set and dictionary shape, static params, revalidation, themes, responsive states, filter query behavior, directory counts, and compatibility redirects with Spec 01. Explain every difference; expected differences are structural code organization only.

- [x] **Step 5: Review the complete diff**

Run: `git diff --check` and inspect the complete diff from the baseline commit. Expected: no whitespace errors, generated artifacts, local datasets, visual redesign, product feature, backend code, or test framework.

- [x] **Step 6: Commit cleanup and evidence**

Run: `git add package.json package-lock.json README.md AGENTS.md .knowledge specs app components lib && git commit -m "refactor: complete repository architecture migration"`

Expected: one final cleanup/evidence commit after all checks pass.

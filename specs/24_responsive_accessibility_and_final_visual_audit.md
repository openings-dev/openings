# Responsive, Accessibility, and Final Visual Audit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconcile the complete Calm Professional redesign across themes, responsive states, accessibility, documentation, and static export.

**Architecture:** This stage fixes only cross-cutting inconsistencies discovered after all surfaces use the new foundations. Evidence records the final state against Specs 14 and 15.

**Tech Stack:** Next.js, React, Tailwind CSS, ESLint, TypeScript, Git

---

### Task 1: Audit responsive and state consistency

**Files:**
- Inspect/modify as proven: `app/**`, `components/**`, `app/globals.css`
- Create: `specs/evidence/24_final_visual_audit.md`

- [x] **Step 1:** Audit 375, 768, 1024, and 1440 widths for header, filters, results, details, directories, documents, and footer.
- [x] **Step 2:** Audit light/dark, hover, focus-visible, active, selected, disabled, open, loading, empty, error, reduced-motion, and long-content states.
- [x] **Step 3:** Resolve clipped text, unintended horizontal scroll, inconsistent gutters, mismatched radii, weak contrast, and undersized targets.

### Task 2: Reconcile design documentation

**Files:**
- Modify: `.knowledge/design_system/README.md`, `.knowledge/best_practices/styling.md`, `AGENTS.md`, `specs/README.md`

- [x] **Step 1:** Replace the old visual-preservation contract with the final Calm Professional foundations and ownership rules.
- [x] **Step 2:** Mark Specs 15–24 complete only after their checks and commits exist.
- [x] **Step 3:** Scan for stale font, color, visual-preservation, placeholder, and unfinished-spec statements.

### Task 3: Run final verification

**Files:**
- Modify: `specs/evidence/24_final_visual_audit.md`

- [x] **Step 1:** Run `npm run lint`; record exit code.
- [x] **Step 2:** Run `npm run test:outreach`; record exit code.
- [x] **Step 3:** Run `./node_modules/.bin/tsc --noEmit`; record exit code.
- [x] **Step 4:** Run `npm run build`; record exit code, warnings, and 148-page count.
- [x] **Step 5:** Run `git diff --check` and review the complete diff for behavior, route, data, or feature changes.
- [x] **Step 6:** Commit with `feat: complete calm professional redesign`.

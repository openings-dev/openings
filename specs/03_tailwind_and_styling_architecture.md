# Tailwind and Styling Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Converge fixed component styling on Tailwind JSX while retaining semantic theme tokens and genuine CVA variants.

**Architecture:** Preserve global semantic tokens and document behavior, inline fixed style recipes at their owners, and keep CVA only where callers select a finite variant. This is a mechanical styling refactor, not a visual redesign.

**Tech Stack:** Tailwind CSS 4, CVA, `clsx`, `tailwind-merge`, Framer Motion

---

### Task 1: Audit the global stylesheet

**Files:**
- Modify only if normalization is behavior-equivalent: `app/globals.css`
- Inspect: `app/layout.tsx`, every use of `bg-background`, `text-foreground`, and related semantic utilities

- [ ] **Step 1: Classify global rules**

Keep the Tailwind import, light and dark semantic variables, `@theme inline`, document-wide border behavior, body background and typography, selection color, and pointer affordances. Document any rule that cannot be expressed locally because it intentionally targets the document.

- [ ] **Step 2: Remove only duplicated global behavior**

If a global selector is already provided equivalently by component utilities, move it to the actual owner and remove it. Do not change token values, gradient stops, font fallback order, or cursor behavior.

### Task 2: Replace fixed CVA recipes

**Files:**
- Refactor: `components/header/**/styles.ts`
- Refactor: `components/footer/styles.ts`
- Refactor: `app/_components/document-page/styles.ts`
- Refactor: `app/opportunities/_components/opportunities-screen/styles.ts`
- Refactor: `app/opportunities/_components/opportunities-screen/styles/*.ts`
- Modify: every owning component

- [ ] **Step 1: Separate variants from fixed classes**

For every exported style function, identify whether callers pass a real variant. Inline recipes with no variant choice into the owning JSX. Keep a typed CVA definition only for recipes with a finite caller-controlled variant or reusable slot contract.

- [ ] **Step 2: Preserve class order and merging**

Use `cn()` when consumer `className` must override defaults or conditional classes must merge. Preserve every responsive, dark, focus, hover, motion, and state utility from the original recipe.

- [ ] **Step 3: Remove empty style modules**

Remove each `styles.ts` file only after all imports are gone. Keep a focused `constants.ts` when typed variants remain; do not rename fixed style collections into constants as a substitute stylesheet.

### Task 3: Verify visual invariants statically

**Files:**
- Inspect: all files changed in Tasks 1 and 2

- [ ] **Step 1: Compare utility coverage**

For each migrated recipe, compare old and new utility sets and record intentional ordering differences in the commit description. Expected: no missing semantic token, breakpoint, dark-mode, focus, disabled, animation, or layout utility.

- [ ] **Step 2: Search unsupported styling**

Search for CSS Modules, styled-components, styled JSX, new global component selectors, and raw duplicate theme colors. Expected: no new styling system and no second token source.

- [ ] **Step 3: Run lint and build**

Run: `npm run lint && npm run build`

Expected: exit code 0 and the baseline route set.

- [ ] **Step 4: Commit**

Run: `git add app components && git commit -m "refactor: simplify Tailwind style ownership"`

Expected: one behavior-preserving styling commit.

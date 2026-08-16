# Visual Foundations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Establish the typography, color, spacing, radius, shadow, and motion foundations for Calm Professional.

**Architecture:** `app/layout.tsx` loads display and interface fonts. `app/globals.css` remains the single semantic token source consumed through Tailwind utilities.

**Tech Stack:** Next.js fonts, Tailwind CSS 4, OKLCH, CSS custom properties

---

### Task 1: Establish the font system

**Files:**
- Modify: `app/layout.tsx`, `app/globals.css`

- [x] **Step 1:** Load Manrope as `--font-display`; retain Geist Sans as `--font-sans` and Geist Mono as `--font-mono`, with Latin subsets and variable delivery.
- [x] **Step 2:** Define document-wide font smoothing, numeric features, heading balance, and reusable Tailwind theme aliases without global component selectors.
- [x] **Step 3:** Apply display type only to intentional page and section headings; controls and dense content remain Geist Sans.

### Task 2: Refine semantic themes

**Files:**
- Modify: `app/globals.css`

- [x] **Step 1:** Replace warm brown primary roles with accessible Openings blue-violet roles and cool-neutral surfaces in light mode.
- [x] **Step 2:** Define deep graphite dark surfaces with equivalent semantic contrast; add secondary surface, elevated surface, subtle foreground, and accent roles only when consumed.
- [x] **Step 3:** Define consistent radius and layered shadow tokens; reduce page gradients to one restrained ambient treatment.
- [x] **Step 4:** Add global focus-visible, selection, color-scheme, and reduced-motion behavior without weakening component semantics.

### Task 3: Validate foundations

- [x] **Step 1:** Run `npm run lint` and `npm run build`; expect exit code 0 and 148 pages.
- [x] **Step 2:** Review token contrast in both themes and font fallback behavior.
- [x] **Step 3:** Commit with `feat: establish calm professional foundations`.

# Shared Primitives and Providers Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give application-wide controls and providers focused contracts with minimal client boundaries.

**Architecture:** Shared primitives centralize reusable accessibility and variants. Providers expose one cross-cutting concern each, with pure helpers and types separated only when responsibilities warrant it.

**Tech Stack:** React 19, Radix UI, Next.js, Tailwind CSS, next-themes-compatible theme semantics

---

### Task 1: Refactor Button, Select, and Toaster contracts

**Files:**
- Refactor: `components/ui/button/**`
- Refactor: `components/ui/select/**`
- Refactor: `components/ui/sonner/**`
- Modify: all consumers

- [ ] **Step 1: Audit primitive behavior**

Record Button variants and sizes, Radix Select parts, ref forwarding, portal behavior, keyboard behavior, and Toaster theme behavior. These are preservation requirements.

- [ ] **Step 2: Narrow exports and props**

Keep only symbols with verified consumers. Keep component props in colocated types and variant definitions in focused constants. Preserve `asChild` composition and native attributes.

- [ ] **Step 3: Normalize icons**

Use existing Lucide icons for generic Select affordances and keep their size, stroke, `aria-hidden`, and motion behavior equivalent. Do not replace brand assets.

### Task 2: Refactor the i18n provider

**Files:**
- Move/refactor: `components/providers/i18n-provider.tsx` into `components/providers/i18n-provider/`
- Create as justified: `context.ts`, `types.ts`, `use-i18n.ts`, `index.tsx`
- Modify: provider consumers

- [ ] **Step 1: Separate context ownership**

Keep context creation, provider implementation, consumer hook, and provider-specific types in focused files when each contains real logic. Do not create empty symmetry files.

- [ ] **Step 2: Preserve locale behavior**

Preserve the default locale, current selection behavior, dictionary resolution, and consumer error outside the provider. Stabilize actions or provider values only when consumer identity depends on it.

### Task 3: Refactor the theme provider

**Files:**
- Move/refactor: `components/providers/theme-provider.tsx` into `components/providers/theme-provider/`
- Create as justified: `context.ts`, `constants.ts`, `helpers.ts`, `types.ts`, `use-theme.ts`, `index.tsx`
- Modify: `app/layout.tsx`, `components/header/theme-toggle/index.tsx`, `components/ui/sonner/index.tsx`

- [ ] **Step 1: Separate pure theme operations**

Move theme validation, resolution, storage snapshot, system-theme lookup, and document-class application into focused helpers or constants. Keep browser access inside the client boundary.

- [ ] **Step 2: Preserve external synchronization**

Keep storage and media-query subscriptions cleaned up. Preserve default theme, system-theme behavior, hydration safety, the `dark` class, and Toaster theme resolution.

- [ ] **Step 3: Keep one public consumer hook**

Expose the smallest verified provider value and a concrete `useTheme` module. Do not add a generic provider framework or context selector dependency.

### Task 4: Validate and commit

**Files:**
- Modify: all files changed above

- [ ] **Step 1: Run lint and build**

Run: `npm run lint && npm run build`

Expected: exit code 0; root layout remains server-renderable and every baseline route exports.

- [ ] **Step 2: Inspect client directives**

Search provider consumers for newly added `"use client"`. Expected: only components that directly use client hooks, context, browser APIs, or client libraries are marked.

- [ ] **Step 3: Commit**

Run: `git add app components && git commit -m "refactor: focus shared primitives and providers"`

Expected: one shared-foundations commit.

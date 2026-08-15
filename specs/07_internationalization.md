# Internationalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Normalize locale definitions, dictionary contracts, and formatting without changing visible translations.

**Architecture:** Locale identity is one closed domain set. English establishes the structural message contract and every dictionary satisfies it. Components receive or consume typed messages without comparing translated text.

**Tech Stack:** TypeScript, React Context, Intl APIs

---

### Task 1: Normalize locale identity

**Files:**
- Refactor: `lib/constants/locales.ts`
- Create as required by Spec 02: `lib/translations/locale-code.ts`, `lib/translations/locale-options.ts`
- Modify: all locale consumers

- [ ] **Step 1: Establish one enum**

Use one `LocaleCode` string enum with the exact values `en`, `pt`, `es`, `it`, `fr`, and `de`. Build available locale options and the default locale from enum members.

- [ ] **Step 2: Preserve validation**

Keep `isLocaleCode` as the only runtime validator for unknown locale strings. Implement it from the canonical closed values and preserve English fallback behavior.

### Task 2: Split the message contract by responsibility

**Files:**
- Refactor: `lib/translations/types.ts`
- Modify: `lib/translations/en.ts`, `pt.ts`, `es.ts`, `it.ts`, `fr.ts`, `de.ts`

- [ ] **Step 1: Group message types**

Split large message interfaces by product area only where dictionaries already have stable nested sections: shell, opportunities, directory, documents, and shared feedback. Compose one complete `TranslationMessages` type from concrete modules without a re-export barrel.

- [ ] **Step 2: Keep all dictionaries complete**

Make each locale dictionary satisfy the complete type. Do not translate, rewrite, or remove copy in this refactor. Compare top-level and nested keys across all six files and expect identical key structure.

### Task 3: Normalize runtime lookup and formatting

**Files:**
- Refactor: `lib/translations/index.ts`
- Refactor: `lib/utils/format-template.ts`
- Modify: formatting consumers under `app/` and `components/`

- [ ] **Step 1: Remove the translation barrel behavior**

Move `getTranslations` to a descriptive concrete module and import each dictionary directly there. Remove `lib/translations/index.ts` after consumers use the concrete lookup module.

- [ ] **Step 2: Type the locale mapping exhaustively**

Use `Record<LocaleCode, TranslationMessages>` so every locale is required. Resolve fallback only for unvalidated external input, not for enum members.

- [ ] **Step 3: Keep formatting explicit**

Preserve template placeholder behavior and pass locale explicitly to `Intl` formatting. Do not compare or persist translated strings as filter or route state.

### Task 4: Validate and commit

**Files:**
- Modify: all files changed above

- [ ] **Step 1: Run key parity search or script**

Use TypeScript compilation through the production build plus a read-only key comparison if needed. Expected: all six dictionaries have the same structural keys.

- [ ] **Step 2: Run lint and build**

Run: `npm run lint && npm run build`

Expected: exit code 0 and every locale remains reachable in the language selector.

- [ ] **Step 3: Commit**

Run: `git add app components lib && git commit -m "refactor: normalize localization contracts"`

Expected: one localization-only commit.

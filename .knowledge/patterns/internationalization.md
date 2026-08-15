# Internationalization

> Keep six complete locale dictionaries behind one typed runtime contract.

## Supported locales

English (`en`), Portuguese (`pt`), Spanish (`es`), Italian (`it`), French (`fr`), and German (`de`) are defined in `lib/constants/locales.ts`. English is the default.

The selected locale is client state owned by `I18nProvider`. Locale-neutral routes remain unchanged. The language switcher renders native language labels and flags.

## Message contract

`lib/translations/types.ts` defines the complete UI message shape. Every locale dictionary must satisfy it. Add or remove a message key in the type and all six dictionaries in one change.

Keep visible interface copy, placeholders, alternative text, accessible labels, errors, empty states, and formatted message templates in dictionaries. Stable domain identifiers, remote filter values, repository names, and URLs remain language-neutral.

## Formatting

Pass the active locale explicitly to date and number formatting. Keep template substitution in the shared formatting helper and do not introduce a second message system without a demonstrated grammatical requirement.

## Documents

Long-form project documents are localized Markdown rather than translation dictionary entries. `lib/content/markdown.ts` selects the corresponding file and falls back according to its verified contract. Preserve root English documents and localized files under `docs/`.

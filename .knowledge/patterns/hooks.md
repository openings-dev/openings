# Hooks

> Use custom hooks for cohesive React behavior, not as a generic abstraction layer.

## When a hook fits

A custom hook is appropriate when behavior depends on React state, effects, refs, context, subscriptions, or lifecycle and has a coherent contract. It may be feature-private when one complex component needs controller decomposition; reuse is helpful but not mandatory when the hook owns a clearly named responsibility.

Pure transformations belong in helpers. Remote request functions belong in data modules. Event functions that exist only once may remain in the component.

## Effects

Use effects only to synchronize with an external system such as the URL, history, storage, media queries, document classes, timers, or an imperative browser API. Event responses and derived render values do not belong in effects.

Include every reactive value read by an effect. If an object or callback restarts synchronization unnecessarily, correct its ownership or stabilize it at the actual boundary. Never suppress `react-hooks/exhaustive-deps` or omit a dependency as an optimization.

## Controller hooks

The opportunities feature currently has a large controller hook coordinating URL filters, remote pages, derived items, and drawer state. Refactor it by extracting cohesive state machines and command hooks with explicit inputs and outputs. Do not fragment simple expressions into hooks or create circular dependencies among controllers.

## Cleanup and errors

Clean up timers, listeners, observers, and abort controllers. Preserve current failure and cancellation semantics. Hooks may coordinate UI error state, but parsing and transport errors originate in the remote-data boundary.

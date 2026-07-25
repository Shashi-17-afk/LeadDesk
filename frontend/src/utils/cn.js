/**
 * cn — className utility.
 *
 * Filters out falsy values and merges class strings.
 * This implementation covers 90% of use cases without adding clsx/tailwind-merge
 * as dependencies. If conditional class complexity grows in Phase 5, we can
 * upgrade with zero API change.
 *
 * Usage:
 *   cn('base-class', isActive && 'active-class', 'another-class')
 *   → 'base-class active-class another-class'
 */
export const cn = (...classes) => classes.filter(Boolean).join(' ');

// cn() = className merge utility
// Combines multiple class strings cleanly
// Filters out falsy values (undefined, false, null)
// 
// Example usage:
// cn('base-class', isActive && 'active-class', 'another-class')
// → 'base-class active-class another-class'

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
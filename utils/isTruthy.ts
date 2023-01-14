/**
 * Type predicate for use with Array.filter
 * @see https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */
export function isTruthy<T>(x: T): x is NonNullable<T> {
  return Boolean(x);
}

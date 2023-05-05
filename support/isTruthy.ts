/**
 * Type predicate for use with `Array.filter`.
 *
 * @example
 * ```ts
 * [0, 1, {}, true, false, null, undefined].filter(isTruthy) // [1, {}, true]
 * ```
 *
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates | TS type predicates}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter | Array.filter on MDN}
 */
export function isTruthy<T>(x: T): x is NonNullable<T> {
  return Boolean(x);
}

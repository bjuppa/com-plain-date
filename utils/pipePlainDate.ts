import type { ComPlainDate } from "../PlainDate.ts";

/**
 * Get a function curried with a pipeline of functions
 * to apply to its plain-date arguments, from left to right.
 *
 * @param fns Functions that take a plain-date and return a plain-date
 * @returns A function taking a plain-date to pass through the pipeline
 */
export function pipePlainDate<T extends ComPlainDate>(
  ...fns: Array<(date: T) => T>
): (date: T) => T {
  return (date) => date.pipe(...fns);
}

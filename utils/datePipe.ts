import { ComPlainDate } from "../PlainDate.ts";

/**
 * Get a function curried with a pipeline of functions
 * to apply to its plain-date arguments, from left to right.
 */
export function datePipe<T extends ComPlainDate>(
  ...fns: Array<(date: T) => T>
): (date: T) => T {
  return (date) => date.pipe(...fns);
}

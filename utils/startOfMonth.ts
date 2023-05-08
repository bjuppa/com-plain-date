import { ComPlainDate } from "../PlainDate.ts";

/**
 * Jump to the first day of a plain-date's month.
 */
export function startOfMonth<T extends ComPlainDate>(date: T): T {
  return date.map((x) => ({ ...x, day: 1 }));
}

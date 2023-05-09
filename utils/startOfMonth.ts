import { ComPlainDate } from "../PlainDate.ts";

/**
 * Jump to the first day of a plain-date's month.
 *
 * @param date A plain-date
 * @returns A new plain-date that is the 1st day of the given plain-date's month
 */
export function startOfMonth<T extends ComPlainDate>(date: T): T {
  return date.map((x) => ({ ...x, day: 1 }));
}

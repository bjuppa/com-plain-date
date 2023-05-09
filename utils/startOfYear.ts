import { ComPlainDate } from "../PlainDate.ts";

/**
 * Jump to January 1 of a plain-date's year.
 *
 * @param date A plain-date
 * @returns A new plain-date that is the 1st day of the given plain-date's year
 */
export function startOfYear<T extends ComPlainDate>(date: T): T {
  return date.map((x) => ({
    year: x.year,
    month: 1,
    day: 1,
  }));
}

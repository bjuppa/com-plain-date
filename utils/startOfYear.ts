import { ComPlainDate } from "../PlainDate.ts";

/**
 * Jump to January 1 of a plain-date's year.
 */
export function startOfYear<T extends ComPlainDate>(date: T): T {
  return date.map((x) => ({
    year: x.year,
    month: 1,
    day: 1,
  }));
}

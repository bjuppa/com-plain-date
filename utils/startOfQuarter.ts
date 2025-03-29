import type { ComPlainDate } from "../PlainDate.ts";
import { quarter } from "./quarter.ts";

/**
 * Jump to the first day of a plain-date's quarter.
 *
 * @param date A plain-date
 * @returns A new plain-date that is the 1st day of the given plain-date's quarter
 */
export function startOfQuarter<T extends ComPlainDate>(date: T): T {
  return date.map((x) => ({
    year: x.year,
    month: quarter(x) * 3 - 2,
    day: 1,
  }));
}

import type { ComPlainDate } from "../PlainDate.ts";
import { differenceInYears } from "./differenceInYears.ts";
import { quarter } from "./quarter.ts";

/**
 * Get a function curried with a plain-date, from which to get the number of
 * crossings over quarters between it and other plain-dates.
 *
 * @param from A plain-date to calculate the difference from
 * @returns A curried function that operates on plain-dates
 */
export function differenceInQuarters(
  from: ComPlainDate,
): (to: ComPlainDate) => number {
  return (to) => differenceInYears(from)(to) * 4 + quarter(to) - quarter(from);
}

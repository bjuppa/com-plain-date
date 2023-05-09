import { ComPlainDate } from "../PlainDate.ts";
import { differenceInYears } from "./differenceInYears.ts";

/**
 * Get a function curried with a date, from which to get the number of
 * crossings over months between it and other dates.
 *
 * @param from A plain-date to calculate the difference from
 * @returns A curried function that operates on plain-dates
 */
export function differenceInMonths(from: ComPlainDate) {
  return (to: ComPlainDate): number =>
    differenceInYears(from)(to) * 12 + to.month - from.month;
}

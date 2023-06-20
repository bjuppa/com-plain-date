import { SloppyDate } from "../support/date-time-types.ts";

/**
 * Get a function curried with a plain-date, from which to get the number of
 * crossings over years between it and other plain-dates.
 *
 * @param from A date to calculate the difference from
 * @returns A curried function that operates on dates
 */
export function differenceInYears(
  from: SloppyDate,
): (to: SloppyDate) => number {
  return (to) => Number(to.year) - Number(from.year);
}

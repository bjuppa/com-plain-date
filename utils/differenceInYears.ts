import { SloppyDate } from "../support/date-time-types.ts";

/**
 * Get a function curried with a date, from which to get the number of
 * crossings over years between it and other dates.
 *
 * @param from A date to calculate the difference from
 * @returns A curried function that operates on dates
 */
export function differenceInYears(from: SloppyDate) {
  return (to: SloppyDate): number => Number(to.year) - Number(from.year);
}

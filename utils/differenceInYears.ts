import { SloppyDate } from "../support/sloppy-types.ts";

/**
 * Get a function curried with a date, from which to get the number of
 * crossings over years between it and other dates.
 */
export function differenceInYears(from: SloppyDate) {
  return (to: SloppyDate): number => Number(to.year) - Number(from.year);
}

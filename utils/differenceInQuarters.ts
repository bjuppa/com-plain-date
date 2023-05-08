import { ComPlainDate } from "../PlainDate.ts";
import { differenceInYears } from "./differenceInYears.ts";
import { quarter } from "./quarter.ts";

/**
 * Get a function curried with a date, from which to get the number of
 * crossings over quarters between it and other dates.
 */
export function differenceInQuarters(from: ComPlainDate) {
  return (to: ComPlainDate): number =>
    differenceInYears(from)(to) * 4 + quarter(to) - quarter(from);
}

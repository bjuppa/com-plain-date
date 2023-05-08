import { ComPlainDate } from "../PlainDate.ts";
import { differenceInYears } from "./differenceInYears.ts";
import { quarter } from "./quarter.ts";

/**
 * Get a function curried with a date, from which to get the number of
 * crossings over quarters between it and other dates.
 */
export const differenceInQuarters =
  (from: ComPlainDate) => (to: ComPlainDate) =>
    differenceInYears(from)(to) * 4 + quarter(to) - quarter(from);

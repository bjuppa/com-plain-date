import { ComPlainDate } from "../PlainDate.ts";
import { differenceInYears } from "./differenceInYears.ts";

/**
 * Get a function curried with a date, from which to get the number of
 * crossings over months between it and other dates.
 */
export const differenceInMonths = (from: ComPlainDate) => (to: ComPlainDate) =>
  differenceInYears(from)(to) * 12 + to.month - from.month;

import { ComPlainDate } from "../PlainDate.ts";
import { HOURS_IN_DAY, MS_IN_HOUR } from "../constants.ts";
import { differenceInMilliseconds } from "./differenceInMilliseconds.ts";

/**
 * Get a function curried with a date, from which to get the number of
 * crossings into days between it and other dates.
 */
export const differenceInDays = (from: ComPlainDate) => (to: ComPlainDate) =>
  Math.round(
    differenceInMilliseconds(from.toUtcInstant())(to.toUtcInstant()) /
      (MS_IN_HOUR * HOURS_IN_DAY),
  );

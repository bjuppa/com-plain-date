import { HOURS_IN_DAY, MS_IN_HOUR } from "../constants.ts";
import { HOPlainDatesDifferenceFn } from "../support/function-signatures.ts";
import { differenceInMilliseconds } from "./differenceInMilliseconds.ts";

/**
 * Get a function curried with a date, from which to get the number of
 * crossings into days between it and other dates.
 */
export const differenceInDays: HOPlainDatesDifferenceFn = (from) => (to) =>
  Math.round(
    differenceInMilliseconds(from.toUtcInstant())(to.toUtcInstant()) /
      (MS_IN_HOUR * HOURS_IN_DAY),
  );

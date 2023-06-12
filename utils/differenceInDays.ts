import { ComPlainDate } from "../PlainDate.ts";
import { HOURS_IN_DAY, MS_IN_HOUR } from "../constants.ts";
import { differenceInMilliseconds } from "./differenceInMilliseconds.ts";

/**
 * Get a function curried with a plain-date, from which to get the number of
 * crossings into days between it and other plain-dates.
 *
 * @param from A plain-date to calculate the difference from
 * @returns A curried function that operates on plain-dates
 */
export function differenceInDays(from: ComPlainDate) {
  return (to: ComPlainDate): number =>
    Math.round(
      differenceInMilliseconds(from.toUtcInstant())(to.toUtcInstant()) /
        (MS_IN_HOUR * HOURS_IN_DAY),
    );
}

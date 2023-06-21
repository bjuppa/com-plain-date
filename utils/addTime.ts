import { SloppyTime } from "../support/date-time-types.ts";
import { tallyMilliseconds } from "../support/tallyMilliseconds.ts";

/**
 * Get a function curried with a time duration
 * to add to its native JS `Date` arguments.
 *
 * @param {SloppyTime} duration Object of hour, minute, second & millisecond, where each may be negative
 * @returns A curried function that operates on JS `Date` objects
 */
export function addTime({
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0,
}: SloppyTime) {
  return (instant: Date): Date =>
    new Date(
      instant.valueOf() +
        tallyMilliseconds({ hour, minute, second, millisecond }),
    );
}

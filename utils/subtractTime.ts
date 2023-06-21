import { SloppyTime } from "../support/date-time-types.ts";
import { tallyMilliseconds } from "../support/tallyMilliseconds.ts";

/**
 * Get a function curried with a time duration to subtract
 * from its native JS `Date` arguments.
 *
 * @param time Object of hour, minute, second & millisecond, where each may be negative
 * @returns A curried function that operates on JS `Date` objects
 */
export function subtractTime(time: SloppyTime) {
  return (instant: Date): Date =>
    new Date(instant.valueOf() - tallyMilliseconds(time));
}

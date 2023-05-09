import { SloppyTime } from "../support/date-time-types.ts";
import { tallyMilliseconds } from "../support/tallyMilliseconds.ts";

/**
 * Get a function curried with a time duration to subtract
 * from its native JS `Date` arguments.
 */
export function subtractTime({
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0,
}: SloppyTime) {
  return (instant: Date): Date =>
    new Date(
      instant.valueOf() -
        tallyMilliseconds({ hour, minute, second, millisecond }),
    );
}

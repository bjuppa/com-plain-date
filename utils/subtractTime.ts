import { tallyMilliseconds } from "../support/tallyMilliseconds.ts";

/**
 * Get a function curried with a time duration to subtract
 * from its native JS `Date` arguments.
 *
 * @param duration Object of `hour`, `minute`, `second` & `millisecond`, where each may be negative
 * @returns A curried function that operates on JS `Date` objects
 */
export function subtractTime({
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0,
}: {
  hour?: number | string;
  minute?: number | string;
  second?: number | string;
  millisecond?: number | string;
}) {
  return (instant: Date): Date =>
    new Date(
      instant.valueOf() -
        tallyMilliseconds({ hour, minute, second, millisecond }),
    );
}

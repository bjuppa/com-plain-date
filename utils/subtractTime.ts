import { tallyMilliseconds } from "../support/tallyMilliseconds.ts";

/**
 * Get a function curried with a time duration to subtract
 * from its native JS `Date` arguments.
 *
 * @param duration Object of `hours`, `minutes`, `seconds` & `milliseconds`, where each may be negative
 * @returns A curried function that operates on JS `Date` objects
 */
export function subtractTime({
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
}: {
  hours?: number | string;
  minutes?: number | string;
  seconds?: number | string;
  milliseconds?: number | string;
}): (instant: Date) => Date {
  return (instant: Date): Date =>
    new Date(
      instant.valueOf() -
        tallyMilliseconds(hours, minutes, seconds, milliseconds),
    );
}

import { NativeDateMapFn } from "../support/function-signatures.ts";
import { SloppyTime } from "../support/sloppy-types.ts";
import { tallyMilliseconds } from "../support/tallyMilliseconds.ts";

/**
 * Get a function curried with a time duration to subtract from its native JS Date arguments.
 */
export function subtractTime({
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0,
}: SloppyTime): NativeDateMapFn {
  return (instant) =>
    new Date(
      instant.valueOf() -
        tallyMilliseconds({ hour, minute, second, millisecond }),
    );
}

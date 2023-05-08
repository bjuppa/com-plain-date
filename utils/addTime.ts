import { NativeDateMapFn } from "../support/function-signatures.ts";
import { SloppyTime } from "../support/sloppy-types.ts";
import { tallyMilliseconds } from "../support/tallyMilliseconds.ts";

/**
 * Get a function curried with a time duration to add to its native JS Date arguments.
 */
export const addTime = ({
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0,
}: SloppyTime): NativeDateMapFn =>
(instant) =>
  new Date(
    instant.valueOf() +
      tallyMilliseconds({ hour, minute, second, millisecond }),
  );

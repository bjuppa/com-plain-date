import { MS_IN_HOUR, MS_IN_MINUTE, MS_IN_SECOND } from "../constants.ts";

/**
 * Sum durations to a total number of milliseconds.
 */
export function tallyMilliseconds(
  hours: number | string = 0,
  minutes: number | string = 0,
  seconds: number | string = 0,
  milliseconds: number | string = 0,
): number {
  return Number(hours) * MS_IN_HOUR + Number(minutes) * MS_IN_MINUTE +
    Number(seconds) * MS_IN_SECOND + Number(milliseconds);
}

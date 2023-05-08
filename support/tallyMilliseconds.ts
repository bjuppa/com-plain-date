import { MS_IN_HOUR, MS_IN_MINUTE, MS_IN_SECOND } from "../constants.ts";
import { SloppyTime } from "./date-time-types.ts";

/**
 * Convert a sloppy time object to a total number of milliseconds.
 */
export function tallyMilliseconds({
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0,
}: SloppyTime): number {
  return Number(hour) * MS_IN_HOUR + Number(minute) * MS_IN_MINUTE +
    Number(second) * MS_IN_SECOND + Number(millisecond);
}

import { MS_IN_HOUR, MS_IN_MINUTE, MS_IN_SECOND } from "../constants.ts";
import { SloppyTime } from "./date-time-types.ts";

/**
 * Convert a sloppy time object to a total number of milliseconds.
 *
 * @param time Object of hour, minute, second & millisecond, where each may be negative
 */
export function tallyMilliseconds(time: SloppyTime): number {
  return Number(time.hour) * MS_IN_HOUR + Number(time.minute) * MS_IN_MINUTE +
    Number(time.second) * MS_IN_SECOND + Number(time.millisecond);
}

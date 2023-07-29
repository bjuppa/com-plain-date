import { MS_IN_HOUR, MS_IN_MINUTE, MS_IN_SECOND } from "../constants.ts";

/**
 * Convert a time duration object to a total number of milliseconds.
 */
export function tallyMilliseconds({
  hours = 0,
  minutes = 0,
  seconds = 0,
  milliseconds = 0,
}: {
  hours?: number | string;
  minutes?: number | string;
  seconds?: number | string;
  milliseconds?: number | string;
}): number {
  return Number(hours) * MS_IN_HOUR + Number(minutes) * MS_IN_MINUTE +
    Number(seconds) * MS_IN_SECOND + Number(milliseconds);
}

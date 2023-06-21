import { SloppyDate } from "../support/date-time-types.ts";
import { createUtcInstant } from "./createUtcInstant.ts";

/**
 * Check if a date is in a leap year.
 *
 * @param date Object of year
 */
export function isLeapYear(date: SloppyDate): boolean {
  return createUtcInstant({ ...date, month: 2, day: 29 }).getUTCDate() === 29;
}

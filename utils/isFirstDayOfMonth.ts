import { SloppyDate } from "../support/date-time-types.ts";

/**
 * Check if a date is the first day of its month.
 *
 * @param date Object of day
 */
export function isFirstDayOfMonth(date: SloppyDate): boolean {
  return Number(date.day) === 1;
}

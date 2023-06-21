import { SloppyDate } from "../support/date-time-types.ts";

/**
 * Check if a date is the first day of its year.
 *
 * @param date Object of month & day
 */
export function isFirstDayOfYear(date: Partial<SloppyDate>): boolean {
  return Number(date.month) === 1 && Number(date.day) === 1;
}

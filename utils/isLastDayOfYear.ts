import { SloppyDate } from "../support/date-time-types.ts";

/**
 * Check if a date is the last day of its year.
 *
 * @param date Object of month & day
 */
export function isLastDayOfYear(date: Partial<SloppyDate>): boolean {
  return Number(date.month) === 12 && Number(date.day) === 31;
}

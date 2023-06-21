import { PlainDate } from "../PlainDate.ts";
import { SloppyDate } from "../support/date-time-types.ts";

/**
 * Get the number of days in a month for a given year.
 *
 * February has 29 days in a leap year, otherwise 28.
 *
 * @param date Object of year & month
 */
export function daysInMonth(date: SloppyDate): number {
  return 32 - PlainDate({ ...date, day: 32 }).day;
}

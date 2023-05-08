import { PlainDate } from "../PlainDate.ts";
import { SloppyDate } from "../support/date-time-types.ts";

/**
 * Get the number of days in a month for a given year.
 *
 * @remarks
 *
 * February has 29 days in a leap year, otherwise 28.
 */
export function daysInMonth({ year, month }: SloppyDate): number {
  return 32 - PlainDate({ year, month, day: 32 }).day;
}

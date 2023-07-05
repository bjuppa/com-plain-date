import { PlainDate } from "../PlainDate.ts";

/**
 * Get the number of days in a month for a given date.
 *
 * February has 29 days in a leap year, otherwise 28.
 */
export function daysInMonth({ year, month }: {
  year: number | string;
  month: number | string;
}): number {
  return 32 - PlainDate({ year, month, day: 32 }).day;
}

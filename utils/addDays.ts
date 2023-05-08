import { ComPlainDate } from "../PlainDate.ts";

/**
 * Get a function curried with a number of days to add to its plain-date arguments.
 *
 * @param days - The number of days to add or subtract
 * @returns A curried function that operates on plain-dates
 */
export function addDays(days = 0): <T extends ComPlainDate>(date: T) => T {
  return (date) => date.map((x) => ({ ...x, day: x.day + days }));
}

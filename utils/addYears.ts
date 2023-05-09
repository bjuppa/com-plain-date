import { ComPlainDate } from "../PlainDate.ts";

/**
 * Get a function curried with a number of years to add to its plain-date arguments.
 *
 * @param {number} years The number of years to add or subtract
 * @returns A curried function that operates on plain-dates
 */
export function addYears(years = 0): <T extends ComPlainDate>(date: T) => T {
  return (date) => date.map((x) => ({ ...x, year: x.year + years }));
}

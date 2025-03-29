import type { ComPlainDate } from "../PlainDate.ts";
import { addMonths } from "./addMonths.ts";

/**
 * Get a function curried with a number of quarters
 * to add to its plain-date arguments.
 *
 * The resulting day-of-month will always be within the expected quarter,
 * days will not spill over into the next quarter.
 *
 * @param quarters The number of quarters to add or subtract
 * @returns A curried function that operates on plain-dates
 */
export function addQuarters(
  quarters: number,
): <T extends ComPlainDate>(date: T) => T {
  return (date) => addMonths(3 * quarters)(date);
}

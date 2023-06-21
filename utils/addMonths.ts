import { ComPlainDate } from "../PlainDate.ts";
import { addDays } from "./addDays.ts";
import { startOfMonth } from "./startOfMonth.ts";

/**
 * Get a function curried with a number of months
 * to add to its plain-date arguments.
 *
 * The resulting day-of-month will always be within the expected month,
 * days will not spill over into the next month.
 *
 * @param months The number of months to add or subtract
 * @returns A curried function that operates on plain-dates
 */
export function addMonths(
  months: number,
): <T extends ComPlainDate>(date: T) => T {
  return (date) =>
    date
      .map((x) => ({ ...x, month: x.month + months }))
      .map((d) => d.day < date.day ? addDays(-1)(startOfMonth(d)) : d);
}

import { PlainDateMapFn } from "../support/function-signatures.ts";
import { addDays } from "./addDays.ts";
import { startOfMonth } from "./startOfMonth.ts";

/**
 * Get a function curried with a number of months to add to its plain-date arguments.
 *
 * @remarks
 *
 * The resulting day-of-month will always be within the expected month,
 * days will not spill over into the next month.
 */
export function addMonths(months = 0): PlainDateMapFn {
  return (date) =>
    date
      .map((x) => ({ ...x, month: x.month + months }))
      .map((d) => d.day < date.day ? addDays(-1)(startOfMonth(d)) : d);
}

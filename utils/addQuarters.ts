import { PlainDateMapFn } from "../support/function-signatures.ts";
import { addMonths } from "./addMonths.ts";

/**
 * Get a function curried with a number of quarters to add to its plain-date arguments.
 *
 * @remarks
 *
 * The resulting day-of-month will always be within the expected quarter,
 * days will not spill over into the next quarter.
 */
export function addQuarters(quarters = 0): PlainDateMapFn {
  return (date) => addMonths(3 * quarters)(date);
}

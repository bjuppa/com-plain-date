import { PlainDateMapFn } from "../support/function-signatures.ts";

/**
 * Get a function curried with a number of years to add to its plain-date arguments.
 */
export function addYears(years = 0): PlainDateMapFn {
  return (date) => date.map((x) => ({ ...x, year: x.year + years }));
}

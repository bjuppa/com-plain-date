import { PlainDateMapFn } from "../support/function-signatures.ts";

/**
 * Get a function curried with a number of days to add to its plain-date arguments.
 */
export function addDays(days = 0): PlainDateMapFn {
  return (date) => date.map((x) => ({ ...x, day: x.day + days }));
}

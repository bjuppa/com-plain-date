import { HOTimeUnitPlainDateMapFn } from "../support/function-signatures.ts";

/**
 * Get a function curried with a number of years to add to its plain-date arguments.
 */
export const addYears: HOTimeUnitPlainDateMapFn = (years = 0) => (date) =>
  date.map((x) => ({ ...x, year: x.year + years }));

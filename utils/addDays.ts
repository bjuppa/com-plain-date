import { HOTimeUnitPlainDateMapFn } from "../support/function-signatures.ts";

/**
 * Get a function curried with a number of days to add to its plain-date arguments.
 */
export const addDays: HOTimeUnitPlainDateMapFn = (days = 0) => (date) =>
  date.map((x) => ({ ...x, day: x.day + days }));

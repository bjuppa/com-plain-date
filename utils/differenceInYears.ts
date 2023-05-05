import { HOPlainDatesDifferenceFn } from "../support/function-signatures.ts";

/**
 * Get a function curried with a date, from which to get the number of
 * crossings over years between it and other dates.
 */
export const differenceInYears: HOPlainDatesDifferenceFn = (from) => (to) =>
  to.year - from.year;

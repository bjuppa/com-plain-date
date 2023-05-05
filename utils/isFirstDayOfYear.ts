import { PlainDatePredicateFn } from "../support/function-signatures.ts";

/**
 * Check if a plain-date is the first day of its year.
 */
export const isFirstDayOfYear: PlainDatePredicateFn = (date) =>
  date.month === 1 && date.day === 1;

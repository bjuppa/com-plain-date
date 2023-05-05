import { PlainDatePredicateFn } from "../support/function-signatures.ts";

/**
 * Check if a plain-date is the last day of its year.
 */
export const isLastDayOfYear: PlainDatePredicateFn = (date) =>
  date.month === 12 && date.day === 31;

import { PlainDatePredicateFn } from "../support/function-signatures.ts";

/**
 * Check if a plain-date is the first day of its month.
 */
export const isFirstDayOfMonth: PlainDatePredicateFn = ({ day }) => day === 1;

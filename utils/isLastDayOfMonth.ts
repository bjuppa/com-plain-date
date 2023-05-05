import { PlainDatePredicateFn } from "../support/function-signatures.ts";
import { daysInMonth } from "./daysInMonth.ts";

/**
 * Check if a plain-date is the last day of its month.
 */
export const isLastDayOfMonth: PlainDatePredicateFn = (date) =>
  date.day === daysInMonth(date);

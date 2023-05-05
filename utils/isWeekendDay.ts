import { PlainDatePredicateFn } from "../support/function-signatures.ts";
import { isBusinessDay } from "./isBusinessDay.ts";

/**
 * Check if a plain-date is a Saturday or Sunday.
 */
export const isWeekendDay: PlainDatePredicateFn = (date) =>
  !isBusinessDay(date);

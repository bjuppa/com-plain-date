import { PlainDatePredicateFn } from "../support/function-signatures.ts";
import { isBusinessDay } from "./isBusinessDay.ts";

/** Check if a plain-date is Saturday or Sunday */
export const isWeekendDay: PlainDatePredicateFn = (plainDate) =>
  !isBusinessDay(plainDate);

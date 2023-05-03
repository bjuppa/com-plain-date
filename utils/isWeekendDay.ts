import { PlainDatePredicateFn } from "../support/function-signatures.ts";
import { isBusinessDay } from "./isBusinessDay.ts";

export const isWeekendDay: PlainDatePredicateFn = (plainDate) =>
  !isBusinessDay(plainDate);

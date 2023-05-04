import { PlainDatePredicateFn } from "../support/function-signatures.ts";

export const isFirstDayOfYear: PlainDatePredicateFn = (date) =>
  date.month === 1 && date.day === 1;

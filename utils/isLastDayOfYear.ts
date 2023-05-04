import { PlainDatePredicateFn } from "../support/function-signatures.ts";

export const isLastDayOfYear: PlainDatePredicateFn = (date) =>
  date.month === 12 && date.day === 31;

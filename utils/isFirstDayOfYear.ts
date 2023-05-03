import { PlainDatePredicateFn } from "../support/function-signatures.ts";

export const isFirstDayOfYear: PlainDatePredicateFn = (plainDate) =>
  plainDate.month === 1 && plainDate.day === 1;

import { PlainDatePredicateFn } from "../support/function-signatures.ts";

export const isLastDayOfYear: PlainDatePredicateFn = (plainDate) =>
  plainDate.month === 12 && plainDate.day === 31;

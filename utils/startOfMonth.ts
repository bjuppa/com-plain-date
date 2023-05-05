import { PlainDateMapFn } from "../support/function-signatures.ts";

/**
 * Jump to the first day of a plain-date's month.
 */
export const startOfMonth: PlainDateMapFn = (date) =>
  date.map((x) => ({ ...x, day: 1 }));

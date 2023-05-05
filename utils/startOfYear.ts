import { PlainDateMapFn } from "../support/function-signatures.ts";

/**
 * Jump to January 1 of a plain-date's year.
 */
export const startOfYear: PlainDateMapFn = (date) =>
  date.map((x) => ({
    year: x.year,
    month: 1,
    day: 1,
  }));

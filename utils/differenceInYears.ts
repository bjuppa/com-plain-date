import { ComPlainDate } from "../PlainDate.ts";

// TODO: take SloppyDates
/**
 * Get a function curried with a date, from which to get the number of
 * crossings over years between it and other dates.
 */
export const differenceInYears = (from: ComPlainDate) => (to: ComPlainDate) =>
  Number(to.year) - Number(from.year);

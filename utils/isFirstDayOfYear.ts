import { ComPlainDate } from "../PlainDate.ts";

/**
 * Check if a plain-date is the first day of its year.
 */
export const isFirstDayOfYear = (date: ComPlainDate) =>
  date.month === 1 && date.day === 1;

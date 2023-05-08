import { ComPlainDate } from "../PlainDate.ts";

// TODO: take SloppyDate instead!
/**
 * Check if a plain-date is the last day of its year.
 */
export const isLastDayOfYear = (date: ComPlainDate) =>
  date.month === 12 && date.day === 31;

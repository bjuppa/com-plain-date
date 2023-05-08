import { ComPlainDate } from "../PlainDate.ts";
import { daysInMonth } from "./daysInMonth.ts";

/**
 * Check if a plain-date is the last day of its month.
 */
export const isLastDayOfMonth = (date: ComPlainDate) =>
  date.day === daysInMonth(date);

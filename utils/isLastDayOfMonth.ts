import { SloppyDate } from "../support/sloppy-types.ts";
import { daysInMonth } from "./daysInMonth.ts";

/**
 * Check if a date is the last day of its month.
 */
export const isLastDayOfMonth = (date: SloppyDate): boolean =>
  Number(date.day) === daysInMonth(date);

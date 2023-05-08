import { SloppyDate } from "../support/sloppy-types.ts";
import { daysInMonth } from "./daysInMonth.ts";

/**
 * Check if a date is the last day of its month.
 */
export function isLastDayOfMonth(date: SloppyDate): boolean {
  return Number(date.day) === daysInMonth(date);
}

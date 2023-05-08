import { ComPlainDate } from "../PlainDate.ts";
import { isBusinessDay } from "./isBusinessDay.ts";

/**
 * Check if a plain-date is a Saturday or Sunday.
 */
export function isWeekendDay(date: ComPlainDate): boolean {
  return !isBusinessDay(date);
}

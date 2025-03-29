import type { ComPlainDate } from "../PlainDate.ts";
import { WeekDay } from "../constants.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/**
 * Check if a plain-date is within Monday to Friday.
 */
export function isBusinessDay(date: ComPlainDate): boolean {
  return weekDayNumber(date) < WeekDay.SATURDAY;
}

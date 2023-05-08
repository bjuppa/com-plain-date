import { ComPlainDate } from "../PlainDate.ts";
import { isBusinessDay } from "./isBusinessDay.ts";

/**
 * Check if a plain-date is a Saturday or Sunday.
 */
export const isWeekendDay = (date: ComPlainDate): boolean =>
  !isBusinessDay(date);

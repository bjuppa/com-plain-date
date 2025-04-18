import type { ComPlainDate } from "../PlainDate.ts";
import { WeekDay } from "../constants.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/**
 * Jump to the Monday of a plain-date's week.
 *
 * @param date A plain-date
 * @returns A new plain-date that is the Monday of the given plain-date's week
 */
export function startOfBusinessWeek<T extends ComPlainDate>(date: T): T {
  return addDays(WeekDay.MONDAY - weekDayNumber(date))(date);
}

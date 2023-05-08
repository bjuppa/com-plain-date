import { ComPlainDate } from "../PlainDate.ts";
import { DAYS_IN_WEEK, WeekDay } from "../constants.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/**
 * Get a function curried with a weekday to jump to from its plain-date arguments.
 */
export function firstWeekDay(
  targetWeekDay: WeekDay,
): <T extends ComPlainDate>(date: T) => T {
  return (date) =>
    addDays(
      (
        ((targetWeekDay - weekDayNumber(date)) % DAYS_IN_WEEK) +
        DAYS_IN_WEEK
      ) % DAYS_IN_WEEK,
    )(date);
}

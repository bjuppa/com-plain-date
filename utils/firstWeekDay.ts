import type { ComPlainDate } from "../PlainDate.ts";
import { DAYS_IN_WEEK, type WeekDayNumber } from "../constants.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/**
 * Get a function curried with a weekday to jump to
 * from its plain-date arguments.
 *
 * The curried function will return the given date if matching the target weekday.
 *
 * @param targetWeekDay ISO weekday number (1-7) starting with Monday
 * @returns A curried function that operates on plain-dates
 *
 * @example
 * ```ts
 * // Seeking the first Monday backwards from `date`
 * const addOneDay = addDays(1);
 * const subOneWeek = addDays(-7);
 * const firstMonday = firstWeekDay(WeekDay.MONDAY);
 * subOneWeek(firstMonday(addOneDay(date)));
 * ```
 */
export function firstWeekDay(
  targetWeekDay: WeekDayNumber,
): <T extends ComPlainDate>(date: T) => T {
  return (date) =>
    addDays(
      (
        ((targetWeekDay - weekDayNumber(date)) % DAYS_IN_WEEK) +
        DAYS_IN_WEEK
      ) % DAYS_IN_WEEK,
    )(date);
}

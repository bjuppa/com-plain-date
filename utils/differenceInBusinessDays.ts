import { differenceInDays } from "./differenceInDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";
import { BUSINESS_DAYS_IN_WEEK, DAYS_IN_WEEK, WeekDay } from "../constants.ts";
import { ComPlainDate } from "../PlainDate.ts";

/**
 * Get a function curried with a date, from which to get the number of
 * crossings into non-weekend days between it and other dates.
 *
 * @param from A plain-date to calculate the difference from
 * @returns A curried function that operates on plain-dates
 */
export function differenceInBusinessDays(from: ComPlainDate) {
  return (to: ComPlainDate): number => {
    const totalDays = differenceInDays(from)(to);
    const fullWeeks = Math.trunc(Math.abs(totalDays) / DAYS_IN_WEEK);
    const fullDays = Math.abs(totalDays) % DAYS_IN_WEEK;

    const dayBase = weekDayNumber(from < to ? from : to);
    const dayRelative = dayBase + fullDays;
    const weekendDays =
      dayRelative < WeekDay.SATURDAY || dayBase === WeekDay.SUNDAY
        ? 0
        : dayRelative === WeekDay.SATURDAY || dayBase === WeekDay.SATURDAY
        ? 1
        : 2;

    return Math.sign(totalDays) * (fullWeeks * BUSINESS_DAYS_IN_WEEK +
      Math.max(0, Math.min(BUSINESS_DAYS_IN_WEEK, fullDays - weekendDays)));
  };
}

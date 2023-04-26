import { differenceInDays } from "./differenceInDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";
import { PlainDateContract } from "../PlainDate.ts";
import { BUSINESS_DAYS_IN_WEEK, DAYS_IN_WEEK, WeekDay } from "../constants.ts";

/**
 * Get the number of crossings into non-weekend days between two dates.
 */
export const differenceInBusinessDays =
  (from: PlainDateContract) => (to: PlainDateContract) => {
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
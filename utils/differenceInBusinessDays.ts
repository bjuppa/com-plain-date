import { differenceInDays } from "./differenceInDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";
import { PlainDateContract } from "../PlainDate.ts";
import { DAYS_IN_WEEK, WeekDay } from "../constants.ts";

/**
 * Get the number of crossings into non-weekend days between two dates.
 */
export const differenceInBusinessDays =
  (from: PlainDateContract) => (to: PlainDateContract) => {
    const totalDays = differenceInDays(from)(to);
    const fullWeeks = Math.trunc(Math.abs(totalDays) / DAYS_IN_WEEK);
    const fullDays = Math.abs(totalDays) % DAYS_IN_WEEK;

    const weekDayBase = weekDayNumber(from < to ? from : to);
    const weekDayRelative = weekDayBase + fullDays;

    const businessDays = weekDayRelative > WeekDay.SUNDAY
      ? Math.max(1, fullDays - 2)
      : weekDayBase >= WeekDay.FRIDAY
      ? 0
      : fullDays - Math.max(0, weekDayRelative - WeekDay.FRIDAY);

    return Math.sign(totalDays) *
      (fullWeeks * (DAYS_IN_WEEK - 2) + businessDays);
  };

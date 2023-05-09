import { ComPlainDate } from "../PlainDate.ts";
import { WeekDay } from "../constants.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/**
 * Jump to the Saturday of a plain-date's week.
 *
 * @param date A plain-date
 * @returns A new plain-date that is the Saturday of the input's week
 */
export function startOfWeekend<T extends ComPlainDate>(date: T): T {
  return addDays(WeekDay.SATURDAY - weekDayNumber(date))(date);
}

import { DAYS_IN_WEEK, type WeekDayNumber } from "../constants.ts";
import type { ComPlainDate } from "../PlainDate.ts";

/**
 * Get the ISO weekday number (1-7) starting with Monday from a plain-date.
 */
export function weekDayNumber(date: ComPlainDate): WeekDayNumber {
  return (
    (date.toUtcInstant().getUTCDay() + 6) % DAYS_IN_WEEK + 1
  ) as WeekDayNumber;
}

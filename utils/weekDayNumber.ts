import { DAYS_IN_WEEK, WeekDayNumber } from "../constants.ts";
import { ComPlainDate } from "../PlainDate.ts";

/**
 * ISO weekday number (1-7) starting with Monday
 */
export const weekDayNumber = (
  plainDate: ComPlainDate,
) =>
  (
    (plainDate.toUtcInstant().getUTCDay() + 6) % DAYS_IN_WEEK + 1
  ) as WeekDayNumber;

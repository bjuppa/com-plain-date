import { DAYS_IN_WEEK, WeekDayNumber } from "../constants.ts";
import { PlainDateContract } from "../PlainDate.ts";

/**
 * ISO weekday number (1-7) starting with Monday
 */
export const weekDayNumber = (
  plainDate: PlainDateContract,
) =>
  (
    (plainDate.toUtcInstant().getUTCDay() + 6) % DAYS_IN_WEEK + 1
  ) as WeekDayNumber;

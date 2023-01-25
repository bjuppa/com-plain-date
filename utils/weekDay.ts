import { DAYS_IN_WEEK, WeekDayNumber } from "../constants.ts";
import { PlainDateContract } from "../PlainDate.ts";

export const weekDay = (
  plainDate: PlainDateContract,
) =>
  (
    (plainDate.toUtcInstant().getUTCDay() + 6) % DAYS_IN_WEEK + 1
  ) as WeekDayNumber;

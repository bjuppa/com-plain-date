import { DAYS_IN_WEEK, WeekDayNumber } from "../constants.ts";
import { PlainDateContract } from "../PlainDate.ts";
import { addDays } from "./addDays.ts";
import { weekDay } from "./weekDay.ts";

export const firstWeekDay = (targetWeekDay: WeekDayNumber) => {
  return (plainDate: PlainDateContract) =>
    addDays(
      (
        ((targetWeekDay - weekDay(plainDate)) % DAYS_IN_WEEK) + DAYS_IN_WEEK
      ) % DAYS_IN_WEEK,
    )(plainDate);
};

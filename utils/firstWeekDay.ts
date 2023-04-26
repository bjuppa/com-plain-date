import { DAYS_IN_WEEK, WeekDayNumber } from "../constants.ts";
import { PlainDateContract } from "../PlainDate.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

export const firstWeekDay = (targetWeekDay: WeekDayNumber) => {
  return <T extends PlainDateContract>(plainDate: T) =>
    addDays(
      (
        ((targetWeekDay - weekDayNumber(plainDate)) % DAYS_IN_WEEK) +
        DAYS_IN_WEEK
      ) % DAYS_IN_WEEK,
    )(plainDate);
};

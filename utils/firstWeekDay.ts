import { DAYS_IN_WEEK, WeekDayNumber } from "../constants.ts";
import { PlainDateMapFn } from "../support/function-signatures.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/**
 * Get a function curried with a weekday to jump to from its plain-date arguments.
 */
export const firstWeekDay =
  (targetWeekDay: WeekDayNumber): PlainDateMapFn => (date) =>
    addDays(
      (
        ((targetWeekDay - weekDayNumber(date)) % DAYS_IN_WEEK) +
        DAYS_IN_WEEK
      ) % DAYS_IN_WEEK,
    )(date);

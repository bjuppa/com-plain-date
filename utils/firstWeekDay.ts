import { DAYS_IN_WEEK, WeekDay } from "../constants.ts";
import { PlainDateMapFn } from "../support/function-signatures.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/**
 * Get a function curried with a weekday to jump to from its plain-date arguments.
 */
export const firstWeekDay =
  (targetWeekDay: WeekDay): PlainDateMapFn => (date) =>
    addDays(
      (
        ((targetWeekDay - weekDayNumber(date)) % DAYS_IN_WEEK) +
        DAYS_IN_WEEK
      ) % DAYS_IN_WEEK,
    )(date);

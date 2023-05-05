import { WeekDay } from "../constants.ts";
import { PlainDateMapFn } from "../support/function-signatures.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/**
 * Jump to the Monday of a plain-date's week.
 */
export const startOfBusinessWeek: PlainDateMapFn = (date) =>
  addDays(WeekDay.MONDAY - weekDayNumber(date))(date);

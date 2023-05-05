import { WeekDay } from "../constants.ts";
import { PlainDateMapFn } from "../support/function-signatures.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/**
 * Jump to the Saturday of a plain-date's week.
 */
export const startOfWeekend: PlainDateMapFn = (date) =>
  addDays(WeekDay.SATURDAY - weekDayNumber(date))(date);

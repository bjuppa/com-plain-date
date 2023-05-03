import { WeekDay } from "../constants.ts";
import { PlainDateMapFn } from "../support/function-signatures.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/** Monday of the current week */
export const startOfBusinessWeek: PlainDateMapFn = (plainDate) =>
  addDays(WeekDay.MONDAY - weekDayNumber(plainDate))(plainDate);

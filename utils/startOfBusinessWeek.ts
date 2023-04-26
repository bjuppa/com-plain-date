import { WeekDay } from "../constants.ts";
import { PlainDateContract } from "../PlainDate.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/** Monday of the current week */
export const startOfBusinessWeek: <T extends PlainDateContract>(
  plainDate: T,
) => T = (plainDate) =>
  addDays(WeekDay.MONDAY - weekDayNumber(plainDate))(plainDate);

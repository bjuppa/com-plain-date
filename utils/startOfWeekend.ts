import { WeekDay } from "../constants.ts";
import { PlainDateContract } from "../PlainDate.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/** Saturday of the current week */
export const startOfWeekend: <T extends PlainDateContract>(
  plainDate: T,
) => T = (plainDate) =>
  addDays(WeekDay.SATURDAY - weekDayNumber(plainDate))(plainDate);

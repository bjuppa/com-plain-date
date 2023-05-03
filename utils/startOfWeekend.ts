import { WeekDay } from "../constants.ts";
import { PlainDateMapFn } from "../support/function-signatures.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/** Saturday of the current week */
export const startOfWeekend: PlainDateMapFn = (plainDate) =>
  addDays(WeekDay.SATURDAY - weekDayNumber(plainDate))(plainDate);

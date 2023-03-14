import { WeekDay } from "../constants.ts";
import { PlainDateContract } from "../PlainDate.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/** Saturday of the current week */
export const startOfWeekend: (
  plainDate: PlainDateContract,
) => PlainDateContract = (plainDate: PlainDateContract) =>
  addDays(WeekDay.SATURDAY - weekDayNumber(plainDate))(plainDate);

import { WeekDay } from "../constants.ts";
import { PlainDateContract } from "../PlainDate.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/** Monday of the current week */
export const startOfBusinessWeek: (
  plainDate: PlainDateContract,
) => PlainDateContract = (plainDate: PlainDateContract) =>
  addDays(WeekDay.MONDAY - weekDayNumber(plainDate))(plainDate);

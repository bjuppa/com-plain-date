import { WeekDay } from "../constants.ts";
import { PlainDateContract } from "../PlainDate.ts";
import { addDays } from "./addDays.ts";
import { weekDay } from "./weekDay.ts";

/** Monday of the current week */
export const startOfBusinessWeek: (
  plainDate: PlainDateContract,
) => PlainDateContract = (plainDate: PlainDateContract) =>
  addDays(WeekDay.MONDAY - weekDay(plainDate))(plainDate);

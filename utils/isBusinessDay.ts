import { WeekDay } from "../constants.ts";
import { PlainDateContract } from "../PlainDate.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

export const isBusinessDay = (plainDate: PlainDateContract) =>
  weekDayNumber(plainDate) < WeekDay.SATURDAY;

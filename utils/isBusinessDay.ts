import { ComPlainDate } from "../PlainDate.ts";
import { WeekDay } from "../constants.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/**
 * Check if a plain-date is within Monday to Friday.
 */
export const isBusinessDay = (date: ComPlainDate) =>
  weekDayNumber(date) < WeekDay.SATURDAY;

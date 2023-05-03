import { WeekDay } from "../constants.ts";
import { PlainDatePredicateFn } from "../support/function-signatures.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/** Check if a plain-date is within Monday to Friday */
export const isBusinessDay: PlainDatePredicateFn = (plainDate) =>
  weekDayNumber(plainDate) < WeekDay.SATURDAY;

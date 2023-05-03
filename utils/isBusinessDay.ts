import { WeekDay } from "../constants.ts";
import { PlainDatePredicateFn } from "../support/function-signatures.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

export const isBusinessDay: PlainDatePredicateFn = (plainDate) =>
  weekDayNumber(plainDate) < WeekDay.SATURDAY;

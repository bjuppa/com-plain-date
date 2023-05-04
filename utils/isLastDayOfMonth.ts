import { PlainDatePredicateFn } from "../support/function-signatures.ts";
import { daysInMonth } from "./daysInMonth.ts";

export const isLastDayOfMonth: PlainDatePredicateFn = (date) =>
  date.day === daysInMonth(date);

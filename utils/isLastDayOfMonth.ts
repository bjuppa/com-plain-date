import { PlainDateContract } from "../PlainDate.ts";
import { daysInMonth } from "./daysInMonth.ts";

export const isLastDayOfMonth = (plainDate: PlainDateContract) =>
  plainDate.day === daysInMonth(plainDate);

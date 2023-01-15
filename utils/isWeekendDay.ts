import { PlainDateContract } from "../PlainDate.ts";
import { isBusinessDay } from "./isBusinessDay.ts";

export const isWeekendDay = (plainDate: PlainDateContract) =>
  !isBusinessDay(plainDate);

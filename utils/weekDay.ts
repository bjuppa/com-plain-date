import { WeekDay } from "../constants.ts";
import { PlainDateContract } from "../PlainDate.ts";

export const weekDay = (plainDate: PlainDateContract): WeekDay =>
  (plainDate.toUtcInstant().getUTCDay() + 6) % 7 + 1;

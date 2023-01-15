import { PlainDateContract } from "../PlainDate.ts";
import { weekDay } from "./weekDay.ts";

export const isBusinessDay = (plainDate: PlainDateContract) =>
  weekDay(plainDate) < 6;

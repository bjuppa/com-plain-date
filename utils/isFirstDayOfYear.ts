import { PlainDateContract } from "../PlainDate.ts";

export const isFirstDayOfYear = (plainDate: PlainDateContract) =>
  plainDate.month === 1 && plainDate.day === 1;

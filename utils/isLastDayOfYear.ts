import { PlainDateContract } from "../PlainDate.ts";

export const isLastDayOfYear = (plainDate: PlainDateContract) =>
  plainDate.month === 12 && plainDate.day === 31;

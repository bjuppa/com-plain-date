import { PlainDateContract } from "../PlainDate.ts";
import { addDays } from "./addDays.ts";
import { startOfMonth } from "./startOfMonth.ts";

export const addMonths: (
  months: number,
) => <T extends PlainDateContract>(plainDate: T) => T =
  (months = 0) => (plainDate) =>
    plainDate
      .map((x) => ({ ...x, month: x.month + months }))
      .map((d) => d.day < plainDate.day ? addDays(-1)(startOfMonth(d)) : d);

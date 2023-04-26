import { PlainDateContract } from "../PlainDate.ts";

export const addMonths: (
  months: number,
) => <T extends PlainDateContract>(plainDate: T) => T =
  (months = 0) => (plainDate) =>
    plainDate
      .map((x) => ({ ...x, month: x.month + months }))
      .map((d) => d.day < plainDate.day ? d.startOfMonth().addDays(-1) : d);

import { PlainDateContract } from "../PlainDate.ts";

export const addMonths: (
  months: number,
) => (plainDate: PlainDateContract) => PlainDateContract =
  (months = 0) => (plainDate: PlainDateContract) =>
    plainDate
      .map((x) => ({ ...x, month: x.month + months }))
      .map((d) => d.day < plainDate.day ? d.startOfMonth().addDays(-1) : d);

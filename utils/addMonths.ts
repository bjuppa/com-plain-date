import { HOTimeUnitPlainDateMapFn } from "../support/function-signatures.ts";
import { addDays } from "./addDays.ts";
import { startOfMonth } from "./startOfMonth.ts";

export const addMonths: HOTimeUnitPlainDateMapFn =
  (months = 0) => (plainDate) =>
    plainDate
      .map((x) => ({ ...x, month: x.month + months }))
      .map((d) => d.day < plainDate.day ? addDays(-1)(startOfMonth(d)) : d);

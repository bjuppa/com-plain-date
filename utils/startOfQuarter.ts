import { PlainDateMapFn } from "../support/function-signatures.ts";
import { quarter } from "./quarter.ts";

export const startOfQuarter: PlainDateMapFn = (date) =>
  date.map((x) => ({
    year: x.year,
    month: quarter(x) * 3 - 2,
    day: 1,
  }));

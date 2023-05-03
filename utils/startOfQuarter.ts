import { PlainDateMapFn } from "../support/function-signatures.ts";
import { quarter } from "./quarter.ts";

export const startOfQuarter: PlainDateMapFn = (plainDate) =>
  plainDate.map((x) => ({
    year: x.year,
    month: quarter(x) * 3 - 2,
    day: 1,
  }));

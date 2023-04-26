import { PlainDateContract } from "../PlainDate.ts";
import { quarter } from "./quarter.ts";

export const startOfQuarter: <T extends PlainDateContract>(
  plainDate: T,
) => T = (plainDate) =>
  plainDate.map((x) => ({
    year: x.year,
    month: quarter(x) * 3 - 2,
    day: 1,
  }));

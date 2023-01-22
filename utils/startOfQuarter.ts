import { PlainDateContract } from "../PlainDate.ts";
import { quarter } from "./quarter.ts";

export const startOfQuarter: (
  plainDate: PlainDateContract,
) => PlainDateContract = (plainDate: PlainDateContract) =>
  plainDate.map((x) => ({
    year: x.year,
    month: quarter(x) * 3 - 2,
    day: 1,
  }));

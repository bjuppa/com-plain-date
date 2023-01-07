import { PlainDateContract } from "../PlainDate.ts";
import { differenceInYears } from "./differenceInYears.ts";

export const differenceInMonths =
  (from: PlainDateContract) => (to: PlainDateContract) => {
    return differenceInYears(from)(to) * 12 + to.month - from.month;
  };

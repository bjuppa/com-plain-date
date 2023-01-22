import { PlainDateContract } from "../PlainDate.ts";
import { differenceInYears } from "./differenceInYears.ts";
import { quarter } from "./quarter.ts";

export const differenceInQuarters =
  (from: PlainDateContract) => (to: PlainDateContract) => {
    return differenceInYears(from)(to) * 4 + quarter(to) - quarter(from);
  };

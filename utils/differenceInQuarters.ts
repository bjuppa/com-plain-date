import { HOPlainDatesDifferenceFn } from "../support/function-signatures.ts";
import { differenceInYears } from "./differenceInYears.ts";
import { quarter } from "./quarter.ts";

export const differenceInQuarters: HOPlainDatesDifferenceFn = (from) => (to) =>
  differenceInYears(from)(to) * 4 + quarter(to) - quarter(from);

import { HOPlainDatesDifferenceFn } from "../support/function-signatures.ts";
import { differenceInYears } from "./differenceInYears.ts";

export const differenceInMonths: HOPlainDatesDifferenceFn = (from) => (to) =>
  differenceInYears(from)(to) * 12 + to.month - from.month;

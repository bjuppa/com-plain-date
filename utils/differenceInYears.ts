import { HOPlainDatesDifferenceFn } from "../support/function-signatures.ts";

export const differenceInYears: HOPlainDatesDifferenceFn = (from) => (to) =>
  to.year - from.year;

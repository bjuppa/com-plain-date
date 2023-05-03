import { HOURS_IN_DAY, MS_IN_HOUR } from "../constants.ts";
import { HOPlainDatesDifferenceFn } from "../support/function-signatures.ts";
import { differenceInMilliseconds } from "./differenceInMilliseconds.ts";

export const differenceInDays: HOPlainDatesDifferenceFn = (from) => (to) =>
  Math.round(
    differenceInMilliseconds(from.toUtcInstant())(to.toUtcInstant()) /
      (MS_IN_HOUR * HOURS_IN_DAY),
  );

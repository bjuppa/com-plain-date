import { HOURS_IN_DAY, MS_IN_HOUR } from "../constants.ts";
import { PlainDateContract } from "../PlainDate.ts";
import { differenceInMilliseconds } from "./differenceInMilliseconds.ts";

export const differenceInDays =
  (from: PlainDateContract) => (to: PlainDateContract) => {
    return Math.round(
      differenceInMilliseconds(from.toUtcInstant())(to.toUtcInstant()) /
        (MS_IN_HOUR * HOURS_IN_DAY),
    );
  };

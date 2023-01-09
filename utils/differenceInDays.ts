import { HOURS_IN_DAY, MS_IN_HOUR } from "../constants.ts";
import { PlainDateContract } from "../PlainDate.ts";

export const differenceInDays =
  (from: PlainDateContract) => (to: PlainDateContract) => {
    return Math.round(
      (to.toUtcInstant().valueOf() - from.toUtcInstant().valueOf()) /
        (MS_IN_HOUR * HOURS_IN_DAY),
    );
  };

import { DAYS_IN_WEEK } from "../constants.ts";
import { PlainDateContract } from "../PlainDate.ts";
import { addDays } from "./addDays.ts";
import { weekDay } from "./weekDay.ts";

export const firstWeekDay =
  (targetWeekDay: number) => (plainDate: PlainDateContract) => {
    if (targetWeekDay < 1 || targetWeekDay > 7) {
      throw new TypeError(
        `Target week day must be between 1 and 7: ${targetWeekDay}`,
      );
    }
    return addDays(
      (targetWeekDay - weekDay(plainDate) + DAYS_IN_WEEK) % DAYS_IN_WEEK,
    )(
      plainDate,
    );
  };

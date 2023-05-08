import { BUSINESS_DAYS_IN_WEEK, DAYS_IN_WEEK, WeekDay } from "../constants.ts";
import { PlainDateMapFn } from "../support/function-signatures.ts";
import { addDays } from "./addDays.ts";
import { weekDayNumber } from "./weekDayNumber.ts";

/**
 * Get a function curried with a number of business days to add to its plain-date arguments.
 *
 * @remarks
 *
 * Monday-Friday are business days.
 */
export const addBusinessDays = (businessDays = 0): PlainDateMapFn => (date) => {
  const fullWeeks = Math.trunc(
    Math.abs(businessDays) / BUSINESS_DAYS_IN_WEEK,
  );
  const fullDays = Math.abs(businessDays) % BUSINESS_DAYS_IN_WEEK;

  const dayBase = weekDayNumber(date);
  const dayRelative = dayBase + Math.sign(businessDays) * fullDays;
  const weekendDays =
    (dayBase < WeekDay.SATURDAY && dayRelative > WeekDay.FRIDAY) ||
      dayRelative < WeekDay.MONDAY
      ? 2
      : (dayBase === WeekDay.SATURDAY && dayRelative > WeekDay.FRIDAY) ||
          (dayBase === WeekDay.SUNDAY && dayRelative < WeekDay.SUNDAY)
      ? 1
      : 0;

  return addDays(
    Math.sign(businessDays) *
      (fullWeeks * DAYS_IN_WEEK +
        Math.max(0, Math.min(DAYS_IN_WEEK, fullDays + weekendDays))),
  )(date);
};

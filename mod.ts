/**
 * # ComPlainDate
 *
 * Date-time utilities that keeps timezones on the surface.
 *
 * ## Plain-date objects
 *
 * The {@link ComPlainDate} interface describes plain-date objects, that can be
 * created with the {@link PlainDate} factory, described by the
 * {@link PlainDateFactory} interface.
 *
 * The {@link ComPlainTime} interface describes wall-time objects, that can be
 * created with the {@link PlainTime} factory, described by the
 * {@link PlainTimeFactory} interface.
 *
 * There is also an extended type of plain-date objects, described by the
 * {@link ExtendedPlainDate} interface. Those objects are created with the
 * {@link ExPlainDate} factory.
 *
 * @module()
 */
export { PlainDate } from "./PlainDate.ts";
export type { ComPlainDate, PlainDateFactory } from "./PlainDate.ts";

export { PlainTime } from "./PlainTime.ts";
export type { ComPlainTime, PlainTimeFactory } from "./PlainTime.ts";

export { ExPlainDate } from "./ExPlainDate.ts";
export type { ExtendedPlainDate } from "./ExPlainDate.ts";

export {
  BUSINESS_DAYS_IN_WEEK,
  DAYS_IN_COMMON_YEAR,
  DAYS_IN_LEAP_YEAR,
  DAYS_IN_WEEK,
  HOURS_IN_DAY,
  Month,
  MS_IN_HOUR,
  MS_IN_MINUTE,
  MS_IN_SECOND,
  Quarter,
  WeekDay,
} from "./constants.ts";
export type { MonthNumber, QuarterNumber, WeekDayNumber } from "./constants.ts";

export type {
  SloppyDate,
  SloppyDateTime,
  SloppyTime,
  SplitDateTime,
} from "./support/date-time-types.ts";

export type { PlainDateMapFn } from "./support/function-signatures.ts";

// Utils for parsing strings
export { parsePlainDate } from "./utils/parsePlainDate.ts";
export { parsePlainTime } from "./utils/parsePlainTime.ts";

// Utils for splitting native JS `Date` objects into separate date & time objects
export { splitDateTime } from "./utils/splitDateTime.ts";
export { splitLocalDateTime } from "./utils/splitLocalDateTime.ts";
export { splitUtcDateTime } from "./utils/splitUtcDateTime.ts";

// Utils for generating a new plain-date from an existing one
export { datePipe } from "./utils/datePipe.ts";
export { addBusinessDays } from "./utils/addBusinessDays.ts";
export { addDays } from "./utils/addDays.ts";
export { addMonths } from "./utils/addMonths.ts";
export { addQuarters } from "./utils/addQuarters.ts";
export { addYears } from "./utils/addYears.ts";
export { firstWeekDay } from "./utils/firstWeekDay.ts";
export { startOfBusinessWeek } from "./utils/startOfBusinessWeek.ts";
export { startOfMonth } from "./utils/startOfMonth.ts";
export { startOfQuarter } from "./utils/startOfQuarter.ts";
export { startOfWeekend } from "./utils/startOfWeekend.ts";
export { startOfYear } from "./utils/startOfYear.ts";

// Utils for making strings
export { datetimeLocal } from "./utils/datetimeLocal.ts";
export { formatPlainDate } from "./utils/formatPlainDate.ts";
export { formatPlainTime } from "./utils/formatPlainTime.ts";

// Utils for getting information about a date object
export { daysInMonth } from "./utils/daysInMonth.ts";
export { daysInYear } from "./utils/daysInYear.ts";
export { isBusinessDay } from "./utils/isBusinessDay.ts";
export { isFirstDayOfMonth } from "./utils/isFirstDayOfMonth.ts";
export { isFirstDayOfYear } from "./utils/isFirstDayOfYear.ts";
export { isLastDayOfMonth } from "./utils/isLastDayOfMonth.ts";
export { isLastDayOfYear } from "./utils/isLastDayOfYear.ts";
export { isLeapYear } from "./utils/isLeapYear.ts";
export { isWeekendDay } from "./utils/isWeekendDay.ts";
export { ordinal } from "./utils/ordinal.ts";
export { quarter } from "./utils/quarter.ts";
export { weekDayNumber } from "./utils/weekDayNumber.ts";

// Utils for comparing date objects
export { differenceInBusinessDays } from "./utils/differenceInBusinessDays.ts";
export { differenceInDays } from "./utils/differenceInDays.ts";
export { differenceInMonths } from "./utils/differenceInMonths.ts";
export { differenceInQuarters } from "./utils/differenceInQuarters.ts";
export { differenceInYears } from "./utils/differenceInYears.ts";

// Utils for creating native JS `Date` objects from date & time objects
export { createInstant } from "./utils/createInstant.ts";
export { createLocalInstant } from "./utils/createLocalInstant.ts";
export { createUtcInstant } from "./utils/createUtcInstant.ts";

// Utils for generating a new native JS `Date` object from an existing one
export { addTime } from "./utils/addTime.ts";
export { subtractTime } from "./utils/subtractTime.ts";

// Utils for comparing native JS `Date` objects
export { differenceInMilliseconds } from "./utils/differenceInMilliseconds.ts";

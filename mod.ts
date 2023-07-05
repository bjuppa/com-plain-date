/**
 * # ComPlainDate
 *
 * Date-time utilities that keeps timezones on the surface.
 *
 * ## Main objects
 *
 * The {@link ComPlainDate} interface describes plain-date objects, that can be
 * created with the {@link PlainDate} factory, described by the
 * {@link PlainDateFactory} interface.
 *
 * The {@link ComPlainTime} interface describes wall-time objects, that can be
 * created with the {@link PlainTime} factory, described by the
 * {@link PlainTimeFactory} interface.
 *
 * ### Extended objects
 *
 * _Note:_ These objects are not tree-shakable, so using them will increase your
 * bundle size... a lot. Extended objects are meant for use in backend code only,
 * always use the main objects with utility functions in frontend code!
 *
 * An extended type of plain-date object is described by the
 * {@link ExtendedPlainDate} interface. Those objects are created with the
 * {@link ExPlainDate} factory.
 *
 * ## Utility functions
 *
 * ### Parsing strings into objects
 *
 * - {@link parsePlainDate} (extract plain-date from string)
 * - {@link parsePlainTime} (extract plain-time from string)
 *
 * ### Splitting native JS `Date` objects into separate plain-date & plain-time objects
 *
 * - {@link splitDateTime} - requires a named timezone
 * - {@link splitLocalDateTime}
 * - {@link splitUtcDateTime}
 *
 * ### Generating a new plain-date object from an existing one
 *
 * - {@link addBusinessDays}
 * - {@link addDays}
 * - {@link addMonths}
 * - {@link addQuarters}
 * - {@link addYears}
 * - {@link firstWeekDay}
 * - {@link startOfBusinessWeek}
 * - {@link startOfMonth}
 * - {@link startOfQuarter}
 * - {@link startOfWeekend}
 * - {@link startOfYear}
 *
 * Also see {@link pipePlainDate} and related type {@link PlainDateMapFn} that
 * are useful when implementing your own plain-date mapper functions.
 *
 * ### Making user interface strings
 *
 * - {@link formatPlainDate}
 * - {@link formatPlainTime}
 * - {@link formatInstant}
 * - {@link formatTimezone}
 * - {@link formatDatetimeLocal} (for HTML datetime-local inputs)
 *
 * ### Getting information about a plain-date object
 *
 * - {@link daysInMonth}
 * - {@link daysInYear}
 * - {@link isBusinessDay} and inverse {@link isWeekendDay}
 * - {@link isFirstDayOfMonth} and {@link isLastDayOfMonth}
 * - {@link isFirstDayOfYear} and {@link isLastDayOfYear}
 * - {@link isLeapYear}
 * - {@link ordinal} (day of the year)
 * - {@link quarter}
 * - {@link weekDayNumber}
 *
 * ### Comparing plain-date objects
 *
 * - {@link differenceInBusinessDays}
 * - {@link differenceInDays}
 * - {@link differenceInMonths}
 * - {@link differenceInQuarters}
 * - {@link differenceInYears}
 *
 * ### Creating native JS `Date` objects from plain-date & plain-time objects
 *
 * - {@link createInstant} - requires a named timezone
 * - {@link createLocalInstant}
 * - {@link createUtcInstant}
 *
 * ### Generating a new native JS `Date` object from an existing one
 *
 * - {@link addTime}
 * - {@link subtractTime}
 *
 * ### Comparing native JS `Date` objects
 *
 * - {@link differenceInMilliseconds}
 *
 * ### Working with timezone names
 *
 * - {@link safeTimezone} - falls back to system timezone
 * - {@link localTimezone} (operating system timezone)
 * - {@link supportedCanonicalTimezones}
 * - {@link isTimezone}
 * - {@link sanitizeTimezone} (clean up timezone name)
 * - {@link parseTimezone} (extract timezone name from string) - throws error on failure
 *
 * @module()
 */

// Main objects
export { PlainDate } from "./PlainDate.ts";
export type { ComPlainDate, PlainDateFactory } from "./PlainDate.ts";

export { PlainTime } from "./PlainTime.ts";
export type { ComPlainTime, PlainTimeFactory } from "./PlainTime.ts";

// Extended objects
export { ExPlainDate } from "./ExPlainDate.ts";
export type { ExtendedPlainDate } from "./ExPlainDate.ts";

// Constants
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

// Types
export type { SloppyDate, SplitDateTime } from "./support/date-time-types.ts";
export type { PlainDateMapFn } from "./support/function-signatures.ts";

// Utils for parsing strings into objects
export { parsePlainDate } from "./utils/parsePlainDate.ts";
export { parsePlainTime } from "./utils/parsePlainTime.ts";

// Utils for splitting native JS `Date` objects into separate plain-date & plain-time objects
export { splitDateTime } from "./utils/splitDateTime.ts";
export { splitLocalDateTime } from "./utils/splitLocalDateTime.ts";
export { splitUtcDateTime } from "./utils/splitUtcDateTime.ts";

// Utils for generating a new plain-date object from an existing one
export { pipePlainDate } from "./utils/pipePlainDate.ts";
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

// Utils for making user interface strings
export { formatDatetimeLocal } from "./utils/formatDatetimeLocal.ts";
export { formatPlainDate } from "./utils/formatPlainDate.ts";
export { formatPlainTime } from "./utils/formatPlainTime.ts";
export { formatInstant } from "./utils/formatInstant.ts";
export { formatTimezone } from "./utils/formatTimezone.ts";

// Utils for getting information about a plain-date object
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

// Utils for comparing plain-date objects
export { differenceInBusinessDays } from "./utils/differenceInBusinessDays.ts";
export { differenceInDays } from "./utils/differenceInDays.ts";
export { differenceInMonths } from "./utils/differenceInMonths.ts";
export { differenceInQuarters } from "./utils/differenceInQuarters.ts";
export { differenceInYears } from "./utils/differenceInYears.ts";

// Utils for creating native JS `Date` objects from plain-date & plain-time objects
export { createInstant } from "./utils/createInstant.ts";
export { createLocalInstant } from "./utils/createLocalInstant.ts";
export { createUtcInstant } from "./utils/createUtcInstant.ts";

// Utils for generating a new native JS `Date` object from an existing one
export { addTime } from "./utils/addTime.ts";
export { subtractTime } from "./utils/subtractTime.ts";

// Utils for comparing native JS `Date` objects
export { differenceInMilliseconds } from "./utils/differenceInMilliseconds.ts";

// Utils for working with timezone names
export { safeTimezone } from "./utils/safeTimezone.ts";
export { localTimezone } from "./utils/localTimezone.ts";
export { supportedCanonicalTimezones } from "./utils/supportedCanonicalTimezones.ts";
export { isTimezone } from "./utils/isTimezone.ts";
export { sanitizeTimezone } from "./utils/sanitizeTimezone.ts";
export { parseTimezone } from "./utils/parseTimezone.ts";

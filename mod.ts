/**
 * # ComPlainDate
 *
 * Date-time utilities that keeps timezones on the surface.
 *
 * Date-time handling in JavaScript has always been hard.
 * While we're all waiting for `Temporal` to arrive, this is a collection of
 * tools for manipulation of dates and times on top of the JavaScript features
 * already available in today's browsers and runtime systems.
 *
 * ## Explicit named timezones
 *
 * These utilities are designed to always require a named timezone as the first
 * parameter for every operation that would be ambiguous without one.
 *
 * This avoids confusion caused by working with native `Date` or other
 * DateTime-like objects where the timezone information is hidden away.
 * Something that becomes especially problematic when passing such objects over
 * context boundaries.
 *
 * ## Separate plain-date and plain-time objects
 *
 * By keeping the calendar date and the time-of-day information in separate
 * objects we are free to do any operations on them both in an expressive way,
 * with no need to worry about such things as crossings into daylight savings
 * time (DST) or what start-of-hour means in a timezone with a 30-minute offset.
 *
 * The only operations where we need an explicit timezone are when we split a
 * universal representation of an instant (e.g. `Date` object) into separate
 * plain-date and plain-time objects, and when we merge them back together.
 *
 * ## Composable functions
 *
 * Inspired by concepts from functional programming, all functions are pure and
 * composable and all operations requiring multiple arguments are implemented as
 * higher-order functions for currying.
 *
 * Also, there are no classes here, only objects adhering to interfaces and
 * factory functions to create them.
 *
 * Don't let this scare you, the utilities are just as easy to use in a
 * non-functional paradigm too!
 *
 * ## Limitations
 *
 * Current JavaScript `Date` objects support the Gregorian calendar only,
 * and therefore these tools have the same limitations.
 *
 * @module()
 */
export { PlainDate } from "./PlainDate.ts";
export type { ComPlainDate, PlainDateFactory } from "./PlainDate.ts";

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

export type { SloppyDate, SloppyTime } from "./support/sloppy-types.ts";

export type {
  HODifferenceFn,
  HOPlainDatesDifferenceFn,
  HOTimeUnitPlainDateMapFn,
  NativeDateFactory,
  NativeDateMapFn,
  NativeDateSplitterFn,
  PlainDateMapFn,
  PlainDateNumberFn,
  SloppyDateNumberFn,
  SloppyDatePredicateFn,
  SloppyTimeNumberFn,
} from "./support/function-signatures.ts";

// Utils for generating a new plain-date from an existing one
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

// Utils for generating a new native JS Date from an existing one
export { addTime } from "./utils/addTime.ts";
export { subtractTime } from "./utils/subtractTime.ts";

// Utils for creating native JS Date objects
export { createInstant } from "./utils/createInstant.ts";
export { createLocalInstant } from "./utils/createLocalInstant.ts";
export { createUtcInstant } from "./utils/createUtcInstant.ts";

// Utils for splitting things into parts
export { splitDateTime } from "./utils/splitDateTime.ts";
export { splitLocalDateTime } from "./utils/splitLocalDateTime.ts";
export { splitUtcDateTime } from "./utils/splitUtcDateTime.ts";

// Utils for making strings
export { datetimeLocal } from "./utils/datetimeLocal.ts";
export { formatPlainDate } from "./utils/formatPlainDate.ts";

// Utils for getting information about an object
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

// Utils for comparing native JS Date objects
export { differenceInMilliseconds } from "./utils/differenceInMilliseconds.ts";

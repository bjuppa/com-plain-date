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
 * ## Explicit timezones
 *
 * These utilities are designed to always require a named timezone as the first
 * parameter for every operation that would be ambiguous without one.
 *
 * This avoids confusion caused by working with native `Date` or other
 * DateTime-like objects where the timezone information is hidden away.
 * Something that becomes especially problematic when passing such objects over
 * context boundaries.
 *
 * ## Separate plain date and plain time objects
 *
 * By keeping the calendar date and the time-of-day information in separate
 * objects we are free to do any operations on them both in an expressive way,
 * with no need to worry about such things as crossings into daylight savings
 * time (DST) or what start-of-hour means in a timezone with a 30-minute offset.
 *
 * The only operations where we need an explicit timezone are when we split a
 * universal representation of an instant (e.g. `Date` object) into separate
 * plain date and plain time objects, and when we merge them back together.
 *
 * ## Composable functions
 *
 * Inspired by concepts from functional programming, all functions are pure and
 * composable and all operations requiring multiple arguments are implemented as
 * higher-order functions for currying.
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

export * from "./PlainDate.ts";
export * from "./ExPlainDate.ts";
export * from "./constants.ts";

// Utils for generating a new plain date from an existing one
export * from "./utils/addBusinessDays.ts";
export * from "./utils/addDays.ts";
export * from "./utils/addMonths.ts";
export * from "./utils/addQuarters.ts";
export * from "./utils/addYears.ts";
export * from "./utils/firstWeekDay.ts";
export * from "./utils/startOfBusinessWeek.ts";
export * from "./utils/startOfMonth.ts";
export * from "./utils/startOfQuarter.ts";
export * from "./utils/startOfWeekend.ts";
export * from "./utils/startOfYear.ts";

// Utils for generating a new native JS Date from an existing one
export * from "./utils/addTime.ts";
export * from "./utils/subtractTime.ts";

// Utils for creating native JS Date objects
export * from "./utils/createInstant.ts";
export * from "./utils/createLocalInstant.ts";
export * from "./utils/createUtcInstant.ts";

// Utils for splitting things into parts
export * from "./utils/dateParts.ts";
export * from "./utils/intlParts.ts";
export * from "./utils/splitDateTime.ts";
export * from "./utils/splitLocalDateTime.ts";
export * from "./utils/splitUtcDateTime.ts";
export * from "./utils/timezoneOffsetParts.ts";

// Utils for making strings
export * from "./utils/datetimeLocal.ts";
export * from "./utils/formatPlainDate.ts";

// Utils for getting information about an object
export * from "./utils/daysInMonth.ts";
export * from "./utils/daysInYear.ts";
export * from "./utils/isBusinessDay.ts";
export * from "./utils/isFirstDayOfMonth.ts";
export * from "./utils/isFirstDayOfYear.ts";
export * from "./utils/isLastDayOfMonth.ts";
export * from "./utils/isLastDayOfYear.ts";
export * from "./utils/isLeapYear.ts";
export * from "./utils/isWeekendDay.ts";
export * from "./utils/milliseconds.ts";
export * from "./utils/ordinal.ts";
export * from "./utils/quarter.ts";
export * from "./utils/weekDayNumber.ts";

// Utils for comparing plain date objects
export * from "./utils/differenceInBusinessDays.ts";
export * from "./utils/differenceInDays.ts";
export * from "./utils/differenceInMonths.ts";
export * from "./utils/differenceInQuarters.ts";
export * from "./utils/differenceInYears.ts";

// Utils for comparing native JS Date objects
export * from "./utils/differenceInMilliseconds.ts";

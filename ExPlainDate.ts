import { ComPlainDate, PlainDate, PlainDateFactory } from "./PlainDate.ts";
import { SloppyDate, SloppyTime } from "./support/date-time-types.ts";
import { createLocalInstant } from "./utils/createLocalInstant.ts";
import { createInstant } from "./utils/createInstant.ts";
import { QuarterNumber, WeekDay, WeekDayNumber } from "./constants.ts";
import { addDays } from "./utils/addDays.ts";
import { addBusinessDays } from "./utils/addBusinessDays.ts";
import { addMonths } from "./utils/addMonths.ts";
import { addYears } from "./utils/addYears.ts";
import { startOfBusinessWeek } from "./utils/startOfBusinessWeek.ts";
import { startOfWeekend } from "./utils/startOfWeekend.ts";
import { startOfMonth } from "./utils/startOfMonth.ts";
import { startOfQuarter } from "./utils/startOfQuarter.ts";
import { startOfYear } from "./utils/startOfYear.ts";
import { firstWeekDay } from "./utils/firstWeekDay.ts";
import { differenceInDays } from "./utils/differenceInDays.ts";
import { differenceInBusinessDays } from "./utils/differenceInBusinessDays.ts";
import { differenceInMonths } from "./utils/differenceInMonths.ts";
import { differenceInYears } from "./utils/differenceInYears.ts";
import { ordinal } from "./utils/ordinal.ts";
import { quarter } from "./utils/quarter.ts";
import { weekDayNumber } from "./utils/weekDayNumber.ts";
import { daysInMonth } from "./utils/daysInMonth.ts";
import { daysInYear } from "./utils/daysInYear.ts";
import { isLeapYear } from "./utils/isLeapYear.ts";
import { isBusinessDay } from "./utils/isBusinessDay.ts";
import { isWeekendDay } from "./utils/isWeekendDay.ts";
import { isFirstDayOfMonth } from "./utils/isFirstDayOfMonth.ts";
import { isLastDayOfMonth } from "./utils/isLastDayOfMonth.ts";
import { isFirstDayOfYear } from "./utils/isFirstDayOfYear.ts";
import { isLastDayOfYear } from "./utils/isLastDayOfYear.ts";
import { formatPlainDate } from "./utils/formatPlainDate.ts";
import { parsePlainDate } from "./utils/parsePlainDate.ts";
import { splitUtcDateTime } from "./utils/splitUtcDateTime.ts";
import { splitLocalDateTime } from "./utils/splitLocalDateTime.ts";
import { splitDateTime } from "./utils/splitDateTime.ts";

/**
 * Describes an extended plain-date object with extra properties and
 * convenience methods for common operations, of which many are chainable.
 *
 * @see {@link ExPlainDate} factory for creating objects
 */
export interface ExtendedPlainDate extends ComPlainDate {
  /**
   * Get a native JS `Date` object in the system's local timezone.
   */
  toLocalInstant: (time?: SloppyTime) => Date;
  /**
   * Get a native JS `Date` object in a named timezone.
   *
   * @throws {RangeError} Invalid timezone specified
   */
  toInstant: (timezone: string, time?: SloppyTime) => Date;

  toLocaleStringMedium: (locale?: Intl.LocalesArgument) => string;
  toLocaleStringLong: (locale?: Intl.LocalesArgument) => string;
  toLocaleStringFull: (locale?: Intl.LocalesArgument) => string;
  dayName: (locale?: Intl.LocalesArgument) => string;
  dayNameShort: (locale?: Intl.LocalesArgument) => string;
  dayNameNarrow: (locale?: Intl.LocalesArgument) => string;
  monthName: (locale?: Intl.LocalesArgument) => string;
  monthNameShort: (locale?: Intl.LocalesArgument) => string;
  monthNameNarrow: (locale?: Intl.LocalesArgument) => string;

  /** Day of the year (1-366) */
  ordinal: () => number;
  /** Quarter of the year (1-4) */
  quarter: () => QuarterNumber;
  /** ISO weekday number (1-7) starting with Monday */
  weekDayNumber: () => WeekDayNumber;
  /** Monday to Friday */
  isBusinessDay: () => boolean;
  /** Saturday or Sunday */
  isWeekendDay: () => boolean;
  isFirstDayOfMonth: () => boolean;
  isLastDayOfMonth: () => boolean;
  isFirstDayOfYear: () => boolean;
  isLastDayOfYear: () => boolean;
  isInLeapYear: () => boolean;
  daysInMonth: () => number;
  /** Common years have 365 days, leap years have 366 */
  daysInYear: () => number;

  addDays: (days: number) => this;
  addBusinessDays: (days: number) => this;
  addMonths: (months: number) => this;
  addYears: (years: number) => this;

  /** Monday of the current week */
  startOfBusinessWeek: () => this;
  /** Saturday of the current week */
  startOfWeekend: () => this;
  startOfMonth: () => this;
  startOfQuarter: () => this;
  startOfYear: () => this;

  firstMonday: () => this;
  firstTuesday: () => this;
  firstWednesday: () => this;
  firstThursday: () => this;
  firstFriday: () => this;
  firstSaturday: () => this;
  firstSunday: () => this;

  differenceInDays: (to: ComPlainDate) => number;
  differenceInBusinessDays: (to: ComPlainDate) => number;
  differenceInMonths: (to: ComPlainDate) => number;
  differenceInYears: (to: ComPlainDate) => number;
}

/**
 * Factory function for making extended plain-date objects with extra properties
 * and convenience methods.
 *
 * @param date A date object with properties `year`, `month` & `day`
 * @returns A new immutable extended plain-date object
 */
export function ExPlainDate(
  { year = NaN, month = 1, day = 1 }: SloppyDate,
): ExtendedPlainDate {
  const exPlainDate: ExtendedPlainDate = {
    ...PlainDate({ year, month, day }),
    constructor: ExPlainDate,

    toLocalInstant(
      { hour = 0, minute = 0, second = 0, millisecond = 0 } = {},
    ) {
      return createLocalInstant({ ...this, hour, minute, second, millisecond });
    },
    toInstant(
      timezone,
      { hour = 0, minute = 0, second = 0, millisecond = 0 } = {},
    ) {
      return createInstant(timezone)({
        ...this,
        hour,
        minute,
        second,
        millisecond,
      });
    },

    toLocaleStringMedium(locale) {
      return formatPlainDate(locale)({ dateStyle: "medium" })(this);
    },
    toLocaleStringLong(locale) {
      return formatPlainDate(locale)({ dateStyle: "long" })(this);
    },
    toLocaleStringFull(locale) {
      return formatPlainDate(locale)({ dateStyle: "full" })(this);
    },
    dayName(locale) {
      return formatPlainDate(locale)({ weekday: "long" })(this);
    },
    dayNameShort(locale) {
      return formatPlainDate(locale)({ weekday: "short" })(this);
    },
    dayNameNarrow(locale) {
      return formatPlainDate(locale)({ weekday: "narrow" })(this);
    },
    monthName(locale) {
      return formatPlainDate(locale)({ month: "long" })(this);
    },
    monthNameShort(locale) {
      return formatPlainDate(locale)({ month: "short" })(this);
    },
    monthNameNarrow(locale) {
      return formatPlainDate(locale)({ month: "narrow" })(this);
    },

    ordinal() {
      return ordinal(this);
    },
    quarter() {
      return quarter(this);
    },
    weekDayNumber() {
      return weekDayNumber(this);
    },
    isBusinessDay() {
      return isBusinessDay(this);
    },
    isWeekendDay() {
      return isWeekendDay(this);
    },
    isFirstDayOfMonth() {
      return isFirstDayOfMonth(this);
    },
    isLastDayOfMonth() {
      return isLastDayOfMonth(this);
    },
    isFirstDayOfYear() {
      return isFirstDayOfYear(this);
    },
    isLastDayOfYear() {
      return isLastDayOfYear(this);
    },
    isInLeapYear() {
      return isLeapYear(this);
    },
    daysInYear() {
      return daysInYear(this);
    },
    daysInMonth() {
      return daysInMonth(this);
    },

    addDays(days) {
      return addDays(days)(this);
    },
    addBusinessDays(days) {
      return addBusinessDays(days)(this);
    },
    addMonths(months) {
      return addMonths(months)(this);
    },
    addYears(years) {
      return addYears(years)(this);
    },

    startOfBusinessWeek() {
      return startOfBusinessWeek(this);
    },
    startOfWeekend() {
      return startOfWeekend(this);
    },
    startOfMonth() {
      return startOfMonth(this);
    },
    startOfQuarter() {
      return startOfQuarter(this);
    },
    startOfYear() {
      return startOfYear(this);
    },

    firstMonday() {
      return firstWeekDay(WeekDay.MONDAY)(this);
    },
    firstTuesday() {
      return firstWeekDay(WeekDay.TUESDAY)(this);
    },
    firstWednesday() {
      return firstWeekDay(WeekDay.WEDNESDAY)(this);
    },
    firstThursday() {
      return firstWeekDay(WeekDay.THURSDAY)(this);
    },
    firstFriday() {
      return firstWeekDay(WeekDay.FRIDAY)(this);
    },
    firstSaturday() {
      return firstWeekDay(WeekDay.SATURDAY)(this);
    },
    firstSunday() {
      return firstWeekDay(WeekDay.SUNDAY)(this);
    },

    differenceInDays(to) {
      return differenceInDays(this)(to);
    },
    differenceInBusinessDays(to) {
      return differenceInBusinessDays(this)(to);
    },
    differenceInMonths(to) {
      return differenceInMonths(this)(to);
    },
    differenceInYears(to) {
      return differenceInYears(this)(to);
    },
  };

  Object.freeze(exPlainDate);

  return exPlainDate;
}

/**
 * Create a new plain-date object from an ISO string.
 */
ExPlainDate.fromString = function <T extends ComPlainDate>(
  this: PlainDateFactory<T>,
  isoDateString: string,
): T {
  return this(parsePlainDate(isoDateString));
};

/**
 * Create a new plain-date object from a native JS `Date` object in UTC.
 *
 * @param instant Optional JS `Date`, fallback to current wall-time
 */
ExPlainDate.fromUtcInstant = function <T extends ComPlainDate>(
  this: PlainDateFactory<T>,
  instant?: Date,
): T {
  return this(splitUtcDateTime(instant)[0]);
};

/**
 * Create a new plain-date object from a native JS `Date` object
 * in the system's local timezone.
 *
 * @param instant Optional JS `Date`, fallback to current wall-time
 */
ExPlainDate.fromLocalInstant = function <T extends ComPlainDate>(
  this: PlainDateFactory<T>,
  instant?: Date,
): T {
  return this(splitLocalDateTime(instant)[0]);
};

/**
 * Create a new plain-date object from a native JS `Date` object
 * in a specific timezone.
 *
 * @param timezone A named IANA timezone
 * @param instant Optional JS `Date`, fallback to current wall-time
 *
 * @throws {RangeError} Invalid timezone specified
 */
ExPlainDate.fromInstant = function <T extends ComPlainDate>(
  this: PlainDateFactory<T>,
  timezone: string,
  instant?: Date,
): T {
  return this(splitDateTime(timezone)(instant)[0]);
};

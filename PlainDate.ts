import { SloppyPlainDate, SloppyPlainTime } from "./support/sloppy-types.ts";
import { WeekDay, WeekDayNumber } from "./constants.ts";
import { createUtcInstant } from "./utils/createUtcInstant.ts";
import { createLocalInstant } from "./utils/createLocalInstant.ts";
import { createInstant } from "./utils/createInstant.ts";
import { dateParts } from "./utils/dateParts.ts";
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
import {
  formatPlainDate,
  FormatPlainDateOptions,
} from "./utils/formatPlainDate.ts";

const ENUMERABLE_PROPERTIES = new Set(["year", "month", "day"]);

export interface PlainDateContract {
  /** Year may be negative and up to 6 digits */
  year: number;
  /** Month (1-12) */
  month: number;
  /** Day in month (1-31) */
  day: number;

  /** Day of the year (1-366) */
  ordinal: number;
  /** Quarter of the year (1-4) */
  quarter: number;
  /** ISO weekday number (1-7) starting with Monday */
  weekDayNumber: WeekDayNumber;
  /** Monday to Friday */
  isBusinessDay: boolean;
  /** Saturday or Sunday */
  isWeekendDay: boolean;
  isFirstDayOfMonth: boolean;
  isLastDayOfMonth: boolean;
  isFirstDayOfYear: boolean;
  isLastDayOfYear: boolean;
  isInLeapYear: boolean;
  daysInMonth: number;
  /** Common years have 365 days, leap years have 366 */
  daysInYear: number;

  iso: string;
  valueOf: () => string;
  toString: () => string;
  toJSON: () => string;
  toLocaleString: (
    locale?: Intl.LocalesArgument,
    options?: FormatPlainDateOptions,
  ) => string;
  dayName: (locale?: Intl.LocalesArgument) => string;
  dayNameShort: (locale?: Intl.LocalesArgument) => string;
  dayNameNarrow: (locale?: Intl.LocalesArgument) => string;
  monthName: (locale?: Intl.LocalesArgument) => string;
  monthNameShort: (locale?: Intl.LocalesArgument) => string;
  monthNameNarrow: (locale?: Intl.LocalesArgument) => string;

  toUtcInstant: (time?: SloppyPlainTime) => Date;
  toLocalInstant: (time?: SloppyPlainTime) => Date;
  toInstant: (timezone: string, time?: SloppyPlainTime) => Date;

  map: (f: (x: PlainDateContract) => SloppyPlainDate) => PlainDateContract;

  addDays: (days: number) => PlainDateContract;
  addBusinessDays: (days: number) => PlainDateContract;
  addMonths: (months: number) => PlainDateContract;
  addYears: (years: number) => PlainDateContract;

  startOfBusinessWeek: () => PlainDateContract;
  startOfWeekend: () => PlainDateContract;
  startOfMonth: () => PlainDateContract;
  startOfQuarter: () => PlainDateContract;
  startOfYear: () => PlainDateContract;

  firstMonday: () => PlainDateContract;
  firstTuesday: () => PlainDateContract;
  firstWednesday: () => PlainDateContract;
  firstThursday: () => PlainDateContract;
  firstFriday: () => PlainDateContract;
  firstSaturday: () => PlainDateContract;
  firstSunday: () => PlainDateContract;

  differenceInDays: (to: PlainDateContract) => number;
  differenceInBusinessDays: (to: PlainDateContract) => number;
  differenceInMonths: (to: PlainDateContract) => number;
  differenceInYears: (to: PlainDateContract) => number;
}

export const PlainDate = (
  { year = NaN, month = 1, day = 1 }: SloppyPlainDate,
) => {
  const utcDate = createUtcInstant({ year, month, day });
  if (isNaN(utcDate.valueOf())) {
    throw new TypeError(
      `Input is not a valid date: ${JSON.stringify({ year, month, day })}`,
    );
  }

  const plainDate: PlainDateContract = {
    year: utcDate.getUTCFullYear(),
    month: utcDate.getUTCMonth() + 1,
    day: utcDate.getUTCDate(),

    iso: utcDate.toISOString().split("T")[0],
    valueOf() {
      return this.iso;
    },
    toString() {
      return this.iso;
    },
    toJSON() {
      return this.iso;
    },
    toLocaleString(locale = undefined, options = {}) {
      return formatPlainDate(locale)(options)(this);
    },
    dayName(locale = undefined) {
      return formatPlainDate(locale)({ weekday: "long" })(this);
    },
    dayNameShort(locale = undefined) {
      return formatPlainDate(locale)({ weekday: "short" })(this);
    },
    dayNameNarrow(locale = undefined) {
      return formatPlainDate(locale)({ weekday: "narrow" })(this);
    },
    monthName(locale = undefined) {
      return formatPlainDate(locale)({ month: "long" })(this);
    },
    monthNameShort(locale = undefined) {
      return formatPlainDate(locale)({ month: "short" })(this);
    },
    monthNameNarrow(locale = undefined) {
      return formatPlainDate(locale)({ month: "narrow" })(this);
    },

    toUtcInstant({ hour = 0, minute = 0, second = 0, millisecond = 0 } = {}) {
      return (hour || minute || second || millisecond)
        ? createUtcInstant({ ...this, hour, minute, second, millisecond })
        : utcDate;
    },
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

    map(f) {
      return PlainDate.of(f(this));
    },

    get ordinal() {
      return ordinal(this);
    },
    get quarter() {
      return quarter(this);
    },
    get weekDayNumber() {
      return weekDayNumber(this);
    },
    get isBusinessDay() {
      return isBusinessDay(this);
    },
    get isWeekendDay() {
      return isWeekendDay(this);
    },
    get isFirstDayOfMonth() {
      return isFirstDayOfMonth(this);
    },
    get isLastDayOfMonth() {
      return isLastDayOfMonth(this);
    },
    get isFirstDayOfYear() {
      return isFirstDayOfYear(this);
    },
    get isLastDayOfYear() {
      return isLastDayOfYear(this);
    },
    get isInLeapYear() {
      return isLeapYear(this);
    },
    get daysInYear() {
      return daysInYear(this);
    },
    get daysInMonth() {
      return daysInMonth(this);
    },

    addDays(days = 0) {
      return addDays(days)(this);
    },
    addBusinessDays(days = 0) {
      return addBusinessDays(days)(this);
    },
    addMonths(months = 0) {
      return addMonths(months)(this);
    },
    addYears(years = 0) {
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

  for (const p in plainDate) {
    Object.defineProperty(plainDate, p, {
      enumerable: ENUMERABLE_PROPERTIES.has(p),
    });
  }
  Object.freeze(plainDate);

  return plainDate;
};

// Type lift (unit)
PlainDate.of = PlainDate;

PlainDate.fromString = (s: string) => {
  const parts = dateParts(s);
  if (!parts) {
    throw TypeError(`No date parts found in string: ${s}`);
  }
  return PlainDate.of(parts);
};

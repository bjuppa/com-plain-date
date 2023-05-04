import { ComPlainDate, PlainDate, PlainDateFactory } from "./PlainDate.ts";
import { SloppyTime } from "./support/sloppy-types.ts";
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

/** Describes an extended plain-date object with convenience methods for common operations, of which many are chainable. */
export interface ExtendedPlainDate extends ComPlainDate {
  toLocalInstant: (time?: SloppyTime) => Date;
  toInstant: (timezone: string, time?: SloppyTime) => Date;

  /** Day of the year (1-366) */
  ordinal: number;
  /** Quarter of the year (1-4) */
  quarter: QuarterNumber;
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

  addDays: (days: number) => this;
  addBusinessDays: (days: number) => this;
  addMonths: (months: number) => this;
  addYears: (years: number) => this;

  startOfBusinessWeek: () => this;
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

export const ExPlainDate: PlainDateFactory<ExtendedPlainDate> = (
  { year = NaN, month = 1, day = 1 },
) => {
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

  Object.freeze(exPlainDate);

  return exPlainDate;
};

ExPlainDate.of = ExPlainDate;
ExPlainDate.fromString = PlainDate.fromString;

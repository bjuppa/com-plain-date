import { PlainDate, PlainDateContract, PlainDateFactory } from "./PlainDate.ts";
import { SloppyPlainTime } from "./support/sloppy-types.ts";
import { createLocalInstant } from "./utils/createLocalInstant.ts";
import { createInstant } from "./utils/createInstant.ts";
import { WeekDay, WeekDayNumber } from "./constants.ts";
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

/** An extended plain date object with convenience methods, of which many are chainable. */
export interface ExtendedPlainDateContract extends PlainDateContract {
  toLocalInstant: (time?: SloppyPlainTime) => Date;
  toInstant: (timezone: string, time?: SloppyPlainTime) => Date;

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

  dayName: (locale?: Intl.LocalesArgument) => string;
  dayNameShort: (locale?: Intl.LocalesArgument) => string;
  dayNameNarrow: (locale?: Intl.LocalesArgument) => string;
  monthName: (locale?: Intl.LocalesArgument) => string;
  monthNameShort: (locale?: Intl.LocalesArgument) => string;
  monthNameNarrow: (locale?: Intl.LocalesArgument) => string;

  addDays: (days: number) => ExtendedPlainDateContract;
  addBusinessDays: (days: number) => ExtendedPlainDateContract;
  addMonths: (months: number) => ExtendedPlainDateContract;
  addYears: (years: number) => ExtendedPlainDateContract;

  startOfBusinessWeek: () => ExtendedPlainDateContract;
  startOfWeekend: () => ExtendedPlainDateContract;
  startOfMonth: () => ExtendedPlainDateContract;
  startOfQuarter: () => ExtendedPlainDateContract;
  startOfYear: () => ExtendedPlainDateContract;

  firstMonday: () => ExtendedPlainDateContract;
  firstTuesday: () => ExtendedPlainDateContract;
  firstWednesday: () => ExtendedPlainDateContract;
  firstThursday: () => ExtendedPlainDateContract;
  firstFriday: () => ExtendedPlainDateContract;
  firstSaturday: () => ExtendedPlainDateContract;
  firstSunday: () => ExtendedPlainDateContract;

  differenceInDays: (to: ExtendedPlainDateContract) => number;
  differenceInBusinessDays: (to: ExtendedPlainDateContract) => number;
  differenceInMonths: (to: ExtendedPlainDateContract) => number;
  differenceInYears: (to: ExtendedPlainDateContract) => number;
}

export const ExPlainDate: PlainDateFactory<ExtendedPlainDateContract> = (
  { year = NaN, month = 1, day = 1 },
) => {
  const plainDate = PlainDate({ year, month, day });

  const exPlainDate: ExtendedPlainDateContract = {
    ...plainDate,
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

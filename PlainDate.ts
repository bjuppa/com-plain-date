import { SloppyDate, SloppyTime } from "./support/date-time-types.ts";
import { Month } from "./constants.ts";
import { createUtcInstant } from "./utils/createUtcInstant.ts";
import { dateParts } from "./support/dateParts.ts";
import {
  formatPlainDate,
  FormatPlainDateOptions,
} from "./utils/formatPlainDate.ts";

/** Describes a basic plain-date object with minimal properties */
export interface ComPlainDate {
  /** Year may be negative and up to 6 digits */
  year: number;
  /** Month (1-12) */
  month: Month;
  /** Day in month (1-31) */
  day: number;

  /** `yyyy-mm-dd` (ISO 8601) */
  iso: string;
  /** `yyyy-mm-dd` (ISO 8601) */
  valueOf: () => this["iso"];
  /** `yyyy-mm-dd` (ISO 8601) */
  toString: () => this["iso"];
  /** `yyyy-mm-dd` (ISO 8601) */
  toJSON: () => this["iso"];

  /**
   * Localize the date for display to a user.
   *
   * Defaults to "short" date-style if no options given.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat | Intl.DateTimeFormat options on MDN}
   *
   * @example
   * ```ts
   * // "6/12/2023"
   * PlainDate.fromString('2023-06-12').toLocaleString('en');
   *
   * // "6/12"
   * PlainDate.fromString('2023-06-12').toLocaleString('en', { month: 'numeric', day: 'numeric' });
   *
   * // "June 12"
   * PlainDate.fromString('2023-06-12').toLocaleString('en', { month: 'long', day: 'numeric' });
   * ```
   */
  toLocaleString: (
    locale?: Intl.LocalesArgument,
    options?: FormatPlainDateOptions,
  ) => string;
  toLocaleStringMedium: (locale?: Intl.LocalesArgument) => string;
  toLocaleStringLong: (locale?: Intl.LocalesArgument) => string;
  toLocaleStringFull: (locale?: Intl.LocalesArgument) => string;
  dayName: (locale?: Intl.LocalesArgument) => string;
  dayNameShort: (locale?: Intl.LocalesArgument) => string;
  dayNameNarrow: (locale?: Intl.LocalesArgument) => string;
  monthName: (locale?: Intl.LocalesArgument) => string;
  monthNameShort: (locale?: Intl.LocalesArgument) => string;
  monthNameNarrow: (locale?: Intl.LocalesArgument) => string;

  /**
   * Get a native JS `Date` object in UTC.
   */
  toUtcInstant: (time?: SloppyTime) => Date;

  constructor: PlainDateFactory<this>;

  /**
   * Create a new plain-date object, applying a pipeline of functions.
   */
  pipe: <T extends ComPlainDate>(
    this: T,
    ...fns: Array<(date: T) => T>
  ) => T;

  /**
   * Create a new plain-date object, modified by a callback function.
   */
  map: <T extends ComPlainDate>(
    this: T,
    f: (x: T) => SloppyDate,
  ) => T;
}

/** Describes a factory function that creates plain-date objects */
export interface PlainDateFactory<T extends ComPlainDate> {
  (x: SloppyDate): T;
  /** Create a new plain-date object from an ISO string */
  fromString: <T extends ComPlainDate>(
    this: PlainDateFactory<T>,
    s: string,
  ) => T;
}

/**
 * Factory function for making basic plain-date objects with minimal properties.
 *
 * @param date A date object with properties `year`, `month` & `day`
 * @returns A new immutable plain-date object
 */
export function PlainDate(
  { year = NaN, month = 1, day = 1 }: SloppyDate,
): ComPlainDate {
  const utcDate = createUtcInstant({ year, month, day });
  if (isNaN(utcDate.valueOf())) {
    throw new TypeError(
      `Input is not a valid date: ${JSON.stringify({ year, month, day })}`,
    );
  }

  const plainDate: ComPlainDate = {
    constructor: PlainDate,

    year: utcDate.getUTCFullYear(),
    month: utcDate.getUTCMonth() + 1 as Month,
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

    toLocaleString(locale = undefined, options = { dateStyle: "short" }) {
      return formatPlainDate(locale)(options)(this);
    },
    toLocaleStringMedium(locale = undefined) {
      return formatPlainDate(locale)({ dateStyle: "medium" })(this);
    },
    toLocaleStringLong(locale = undefined) {
      return formatPlainDate(locale)({ dateStyle: "long" })(this);
    },
    toLocaleStringFull(locale = undefined) {
      return formatPlainDate(locale)({ dateStyle: "full" })(this);
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

    pipe(...fns) {
      return fns.reduce((x, f) => f(x), this);
    },
    map(f) {
      return this.constructor(f(this));
    },
  };

  Object.freeze(plainDate);

  return plainDate;
}

PlainDate.fromString = function <T extends ComPlainDate>(
  this: PlainDateFactory<T>,
  isoDateString: string,
): T {
  const parts = dateParts(isoDateString);
  if (!parts) {
    throw TypeError(`No date parts found in string: ${isoDateString}`);
  }
  return this(parts);
};

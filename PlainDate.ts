import { SloppyDate, SloppyTime } from "./support/date-time-types.ts";
import { MonthNumber } from "./constants.ts";
import { createUtcInstant } from "./utils/createUtcInstant.ts";
import {
  formatPlainDate,
  FormatPlainDateOptions,
} from "./utils/formatPlainDate.ts";

/** Describes a basic plain-date object with minimal properties */
export interface ComPlainDate {
  /** Year may be negative and up to 6 digits */
  year: number;
  /** Month (1-12) */
  month: MonthNumber;
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
   * PlainDate({ year: 2023, month: 6, day: 12 }).toLocaleString('en');
   *
   * // "6/12"
   * PlainDate({ year: 2023, month: 6, day: 12 }).toLocaleString('en', { month: 'numeric', day: 'numeric' });
   *
   * // "June 12"
   * PlainDate({ year: 2023, month: 6, day: 12 }).toLocaleString('en', { month: 'long', day: 'numeric' });
   * ```
   */
  toLocaleString: (
    locale?: Intl.LocalesArgument,
    options?: FormatPlainDateOptions,
  ) => string;

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
  /** Callable signature */
  (x: SloppyDate): T;

  /** Create a new plain-date object from an ISO string */
  fromString?: <T extends ComPlainDate>(
    this: PlainDateFactory<T>,
    s: string,
  ) => T;

  /**
   * Create a new plain-date object from a native JS `Date` object in UTC.
   *
   * @param instant Optional JS `Date`, fallback to current wall-time
   */
  fromUtcInstant?: <T extends ComPlainDate>(
    this: PlainDateFactory<T>,
    instant?: Date,
  ) => T;

  /**
   * Create a new plain-date object from a native JS `Date` object
   * in the system's local timezone.
   *
   * @param instant Optional JS `Date`, fallback to current wall-time
   */
  fromLocalInstant?: <T extends ComPlainDate>(
    this: PlainDateFactory<T>,
    instant?: Date,
  ) => T;

  /**
   * Create a new plain-date object from a native JS `Date` object
   * in a specific timezone.
   *
   * @param timezone A named IANA timezone
   * @param instant Optional JS `Date`, fallback to current wall-time
   */
  fromInstant?: <T extends ComPlainDate>(
    this: PlainDateFactory<T>,
    timezone: string,
    instant?: Date,
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
    month: utcDate.getUTCMonth() + 1 as MonthNumber,
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

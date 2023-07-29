import { HOURS_IN_DAY, MS_IN_HOUR } from "./constants.ts";
import { tallyMilliseconds } from "./support/tallyMilliseconds.ts";
import { RequireAtLeastOne } from "./support/utility-types.ts";

export type FormatPlainTimeOptions =
  & Omit<
    Intl.DateTimeFormatOptions,
    | "timeZone"
    | "timeZoneName"
    | "timeStyle"
    | "dateStyle"
    | "weekday"
    | "year"
    | "month"
    | "day"
    | "era"
  >
  & { timeStyle?: "medium" | "short" };

/**
 * Describes a basic time-of-day object with minimal properties.
 *
 * @see {@link PlainTime} factory for creating objects
 */
export interface ComPlainTime {
  /** Hour (1-23) */
  hour: number;
  /** Minute (0-59) */
  minute: number;
  /** Second (0-59) */
  second: number;
  /** Millisecond (0-999) */
  millisecond: number;

  /** `Thh:mm:ss.sss` (ISO 8601) */
  iso: string;
  /** Tallied milliseconds since 00:00 */
  valueOf: () => number;
  /** `hh:mm` / `hh:mm:ss` / `hh:mm:ss.sss` */
  toString: () => string;
  /** `hh:mm` / `hh:mm:ss` / `hh:mm:ss.sss` */
  toJSON: () => ReturnType<this["toString"]>;

  /**
   * Localize the time for display to a user.
   *
   * @param locale `Intl` {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument | locale }, defaults to system's locale if not given
   * @param options `Intl` {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat | format options }, defaults to "short" time-style if not given
   *
   * @example
   * ```ts
   * // "1:37 PM"
   * PlainTime({ hour: 13, minute: 37, second: 59, millisecond: 999 }).toLocaleString("en");
   *
   * // "1:37:59 PM"
   * PlainTime({ hour: 13, minute: 37, second: 59, millisecond: 999 }).toLocaleString("en", { timeStyle: "medium" });
   *
   * // "5"
   * PlainTime({ hour: 9, millisecond: 599 }).toLocaleString("en", { fractionalSecondDigits: 1 });
   * ```
   */
  toLocaleString: (
    locale?: Intl.LocalesArgument,
    options?: FormatPlainTimeOptions,
  ) => string;

  /**
   * Check for partial or complete equality.
   */
  is: (
    x: RequireAtLeastOne<{
      hour?: number | string;
      minute?: number | string;
      second?: number | string;
      millisecond?: number | string;
    }>,
  ) => boolean;

  constructor: PlainTimeFactory<this>;
}

/**
 * Describes a factory function that creates plain-time objects.
 */
export interface PlainTimeFactory<T extends ComPlainTime> {
  (x: {
    hour?: number | string;
    minute?: number | string;
    second?: number | string;
    millisecond?: number | string;
  }): T;
}

/**
 * Factory function for making basic plain-time objects with minimal properties.
 *
 * @param time A time object with optional properties `hour`, `minute`, `second` & 'millisecond'
 * @returns A new immutable plain-time object
 *
 * @throws {RangeError} Input total must be less than 24 hours
 * @throws {RangeError} Input total can't be negative
 */
export function PlainTime(
  { hour = 0, minute = 0, second = 0, millisecond = 0 }: {
    hour?: number | string;
    minute?: number | string;
    second?: number | string;
    millisecond?: number | string;
  },
): ComPlainTime {
  const ms = tallyMilliseconds({
    hours: hour,
    minutes: minute,
    seconds: second,
    milliseconds: millisecond,
  });

  if (ms < 0) {
    throw new RangeError(
      `Input must be positive: ${
        JSON.stringify({ hour, minute, second, millisecond })
      }`,
    );
  }
  if (ms >= HOURS_IN_DAY * MS_IN_HOUR) {
    throw new RangeError(
      `Input must be less than 24 hours: ${
        JSON.stringify({ hour, minute, second, millisecond })
      }`,
    );
  }

  const epochUtcInstant = new Date(ms);

  const plainTime: ComPlainTime = {
    constructor: PlainTime,
    hour: epochUtcInstant.getUTCHours(),
    minute: epochUtcInstant.getUTCMinutes(),
    second: epochUtcInstant.getUTCSeconds(),
    millisecond: epochUtcInstant.getUTCMilliseconds(),

    iso: epochUtcInstant.toISOString().slice(-14, -1),
    valueOf() {
      return ms;
    },
    toString() {
      return this.iso.slice(
        1,
        this.millisecond ? undefined : this.second ? -4 : -7,
      );
    },
    toJSON() {
      return this.toString();
    },

    toLocaleString(locale, options = { timeStyle: "short" }) {
      return epochUtcInstant.toLocaleTimeString(locale, {
        ...options,
        timeZone: "UTC",
      });
    },

    is({ hour, minute, second, millisecond }) {
      return (hour === undefined || this.hour == hour) &&
        (minute === undefined || this.minute == minute) &&
        (second === undefined || this.second == second) &&
        (millisecond === undefined || this.millisecond == millisecond);
    },
  };

  return Object.freeze(plainTime);
}

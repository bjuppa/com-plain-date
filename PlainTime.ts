import { SloppyTime } from "./support/date-time-types.ts";
import { HOURS_IN_DAY, MS_IN_HOUR } from "./constants.ts";
import { tallyMilliseconds } from "./support/tallyMilliseconds.ts";
import { intlParts } from "./support/intlParts.ts";
import { isTruthy } from "./support/isTruthy.ts";

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

const intlUtcFormat = Intl.DateTimeFormat("en", {
  hourCycle: "h23",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
  timeZone: "UTC",
});

/** Describes a basic time-of-day object with minimal properties */
export interface ComPlainTime {
  /** Hour (1-23) */
  hour: number;
  /** Minute (0-59) */
  minute: number;
  /** Second (0-59) */
  second: number;
  /** Millisecond (0-999) */
  millisecond: number;

  /** Tallied milliseconds since 00:00 */
  valueOf: () => number;
  /** `hh:mm` / `hh:mm:ss` / `hh:mm:ss.sss` */
  toString: () => string;
  /** `hh:mm` / `hh:mm:ss` / `hh:mm:ss.sss` */
  toJSON: () => ReturnType<this["toString"]>;

  /**
   * Localize the time for display to a user.
   *
   * Defaults to "short" time-style if no options given.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat | Intl.DateTimeFormat options on MDN}
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

  constructor: PlainTimeFactory<this>;
}

/**
 * Describes a factory function that creates plain-time objects.
 */
export interface PlainTimeFactory<T extends ComPlainTime> {
  (x: SloppyTime): T;
}

/**
 * Factory function for making basic plain-time objects with minimal properties.
 *
 * @param date A time object with optional properties `hour`, `minute`, `second` & 'millisecond'
 * @returns A new immutable plain-time object
 *
 * @throws {TypeError} Input total must be less than 24 hours
 * @throws {TypeError} Input total can't be negative.
 */
export function PlainTime(
  { hour = 0, minute = 0, second = 0, millisecond = 0 }: SloppyTime,
): ComPlainTime {
  const ms = tallyMilliseconds({ hour, minute, second, millisecond });

  if (ms < 0) {
    throw new TypeError(
      `Input must be positive: ${
        JSON.stringify({ hour, minute, second, millisecond })
      }`,
    );
  }
  if (ms >= HOURS_IN_DAY * MS_IN_HOUR) {
    throw new TypeError(
      `Input must be less than 24 hours: ${
        JSON.stringify({ hour, minute, second, millisecond })
      }`,
    );
  }

  const epochUtcDate = new Date(ms);

  const plainTime: ComPlainTime = {
    constructor: PlainTime,
    hour: epochUtcDate.getUTCHours(),
    minute: epochUtcDate.getUTCMinutes(),
    second: epochUtcDate.getUTCSeconds(),
    millisecond: epochUtcDate.getUTCMilliseconds(),

    valueOf() {
      return ms;
    },
    toString() {
      const parts = intlParts(intlUtcFormat)(epochUtcDate);
      return [
        parts["hour"],
        parts["minute"],
        parts["fractionalSecond"] !== "000"
          ? `${parts["second"]}.${parts["fractionalSecond"]}`
          : parts["second"] !== "00"
          ? parts["second"]
          : undefined,
      ].filter(isTruthy).join(":");
    },
    toJSON() {
      return this.toString();
    },

    toLocaleString(locale = undefined, options = { timeStyle: "short" }) {
      return epochUtcDate.toLocaleTimeString(locale, {
        ...options,
        timeZone: "UTC",
      });
    },
  };

  Object.freeze(plainTime);

  return plainTime;
}

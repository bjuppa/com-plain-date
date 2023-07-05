import { ComPlainDate, PlainDate } from "../PlainDate.ts";
import { ComPlainTime, PlainTime } from "../PlainTime.ts";

/**
 * Get a function curried with a timezone, to split native JS `Date` objects
 * into separate plain-date and plain-time parts.
 *
 * @param timezone A named IANA timezone
 * @returns A curried function that operates on JS `Date` objects
 *
 * @throws {RangeError} Invalid timezone specified
 */
export function splitDateTime(
  timezone: string,
): (instant?: Date) => [ComPlainDate, ComPlainTime] {
  return (instant) => {
    instant ??= new Date();
    const locale = "en";
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      hourCycle: "h23",
    };
    return [
      PlainDate({
        year: instant.toLocaleDateString(locale, {
          ...options,
          year: "numeric",
        }),
        month: instant.toLocaleDateString(locale, {
          ...options,
          month: "numeric",
        }),
        day: instant.toLocaleDateString(locale, { ...options, day: "numeric" }),
      }),
      PlainTime({
        hour: Number(
          instant.toLocaleTimeString(locale, { ...options, hour: "numeric" }),
        ),
        minute: Number(
          instant.toLocaleTimeString(locale, { ...options, minute: "numeric" }),
        ),
        second: Number(
          instant.toLocaleTimeString(locale, { ...options, second: "numeric" }),
        ),
        millisecond: Number(
          instant.toLocaleTimeString(locale, {
            ...options,
            fractionalSecondDigits: 3,
          }),
        ),
      }),
    ];
  };
}

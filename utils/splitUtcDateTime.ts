import { type ComPlainDate, PlainDate } from "../PlainDate.ts";
import { type ComPlainTime, PlainTime } from "../PlainTime.ts";

/**
 * Split native JS `Date` objects into separate
 * plain-date and plain-time parts in UTC.
 *
 * If called without `Date` parameter, the current date in UTC will be returned.
 */
export function splitUtcDateTime(instant?: Date): [ComPlainDate, ComPlainTime] {
  instant ??= new Date();
  return [
    PlainDate({
      year: instant.getUTCFullYear(),
      month: instant.getUTCMonth() + 1,
      day: instant.getUTCDate(),
    }),
    PlainTime({
      hour: instant.getUTCHours(),
      minute: instant.getUTCMinutes(),
      second: instant.getUTCSeconds(),
      millisecond: instant.getUTCMilliseconds(),
    }),
  ];
}

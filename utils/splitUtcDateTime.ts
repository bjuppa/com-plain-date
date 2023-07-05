import { ComPlainDate, PlainDate } from "../PlainDate.ts";
import { ComPlainTime, PlainTime } from "../PlainTime.ts";

/**
 * Split native JS `Date` objects into separate
 * plain-date and plain-time parts in UTC.
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

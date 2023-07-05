import { ComPlainDate, PlainDate } from "../PlainDate.ts";
import { ComPlainTime, PlainTime } from "../PlainTime.ts";

/**
 * Split native JS `Date` objects into separate plain-date and plain-time parts
 * in the system's local timezone.
 */
export function splitLocalDateTime(
  instant?: Date,
): [ComPlainDate, ComPlainTime] {
  instant ??= new Date();
  return [
    PlainDate({
      year: instant.getFullYear(),
      month: instant.getMonth() + 1,
      day: instant.getDate(),
    }),
    PlainTime({
      hour: instant.getHours(),
      minute: instant.getMinutes(),
      second: instant.getSeconds(),
      millisecond: instant.getMilliseconds(),
    }),
  ];
}

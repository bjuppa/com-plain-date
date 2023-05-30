import { PlainDate } from "../PlainDate.ts";
import { PlainTime } from "../PlainTime.ts";
import { SplitDateTime } from "../support/date-time-types.ts";

/**
 * Split native JS `Date` objects into separate plain-date and plain-time parts
 * in the system's local timezone.
 */
export function splitLocalDateTime(instant?: Date): SplitDateTime {
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

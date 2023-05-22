import { PlainDate } from "../PlainDate.ts";
import { SplitDateTime } from "../support/date-time-types.ts";

/**
 * Split native JS `Date` objects into separate
 * plain-date and plain-time parts in UTC.
 */
export function splitUtcDateTime(instant?: Date): SplitDateTime {
  instant ??= new Date();
  const plainDate = PlainDate({
    year: instant.getUTCFullYear(),
    month: instant.getUTCMonth() + 1,
    day: instant.getUTCDate(),
  });
  const plainTime = {
    hour: instant.getUTCHours(),
    minute: instant.getUTCMinutes(),
    second: instant.getUTCSeconds(),
    millisecond: instant.getUTCMilliseconds(),
  };
  return [plainDate, plainTime];
}

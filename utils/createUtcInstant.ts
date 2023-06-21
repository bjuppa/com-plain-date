import { SloppyDateTime } from "../support/date-time-types.ts";

/**
 * Create a native JS `Date` object from a date-time interpreted in UTC.
 *
 * @param dateTime Object of year, month, day, hour, minute, second & millisecond
 */
export function createUtcInstant(dateTime: SloppyDateTime): Date {
  const {
    year,
    month = 1,
    day = 1,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
  } = dateTime;
  const utcDate = new Date(0);
  utcDate.setUTCFullYear(Number(year), Number(month) - 1, Number(day));
  utcDate.setUTCHours(
    Number(hour),
    Number(minute),
    Number(second),
    Number(millisecond),
  );

  Object.freeze(utcDate);
  return utcDate;
}

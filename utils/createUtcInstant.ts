import { SloppyDateTime } from "../support/date-time-types.ts";

/**
 * Create a native JS `Date` object from a date-time interpreted in UTC.
 */
export function createUtcInstant({
  year = NaN,
  month = 1,
  day = 1,
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0,
}: SloppyDateTime): Date {
  const utcDate = new Date(0);
  utcDate.setUTCFullYear(Number(year), Number(month) - 1, Number(day));
  utcDate.setUTCHours(
    Number(hour),
    Number(minute),
    Number(second),
    Number(millisecond),
  );

  return utcDate;
}

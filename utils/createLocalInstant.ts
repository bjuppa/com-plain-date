import { SloppyDateTime } from "../support/date-time-types.ts";

/**
 * Create a native JS `Date` object from a date-time
 * interpreted in the system's local timezone.
 *
 * @param dateTime Object of year, month, day, hour, minute, second & millisecond
 */
export function createLocalInstant(dateTime: SloppyDateTime): Date {
  const {
    year,
    month = 1,
    day = 1,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
  } = dateTime;
  const localDate = new Date(0);
  localDate.setFullYear(Number(year), Number(month) - 1, Number(day));
  localDate.setHours(
    Number(hour),
    Number(minute),
    Number(second),
    Number(millisecond),
  );

  Object.freeze(localDate);
  return localDate;
}

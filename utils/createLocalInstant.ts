/**
 * Create a native JS `Date` object from a date-time
 * interpreted in the system's local timezone.
 */
export function createLocalInstant({
  year = NaN,
  month = 1,
  day = 1,
  hour = 0,
  minute = 0,
  second = 0,
  millisecond = 0,
}: {
  year: number | string;
  month?: number | string;
  day?: number | string;
  hour?: number | string;
  minute?: number | string;
  second?: number | string;
  millisecond?: number | string;
}): Date {
  const localDate = new Date(0);
  localDate.setFullYear(Number(year), Number(month) - 1, Number(day));
  localDate.setHours(
    Number(hour),
    Number(minute),
    Number(second),
    Number(millisecond),
  );

  return localDate;
}

import { SloppyDateTime } from "../support/sloppy-types.ts";

export const createUtcInstant = (
  {
    year = NaN,
    month = 1,
    day = 1,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
  }: SloppyDateTime,
): Date => {
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
};

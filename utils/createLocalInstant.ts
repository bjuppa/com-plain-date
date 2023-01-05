import { SloppyPlainDateTime } from "../support/sloppy-types.ts";

export const createLocalInstant = (
  {
    year = NaN,
    month = 1,
    day = 1,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
  }: SloppyPlainDateTime,
): Date => {
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
};

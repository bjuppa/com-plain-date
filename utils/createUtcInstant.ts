import { NativeDateFactory } from "../support/function-signatures.ts";

export const createUtcInstant: NativeDateFactory = (
  {
    year = NaN,
    month = 1,
    day = 1,
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
  },
) => {
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

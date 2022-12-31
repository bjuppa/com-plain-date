import { PlainDate } from "../PlainDate.ts";

export const splitDateTimeInLocalTimezone = (date?: Date) => {
  date ??= new Date();
  const plainDate = PlainDate.of({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
  return [plainDate];
};

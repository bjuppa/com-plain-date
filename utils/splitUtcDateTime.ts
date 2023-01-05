import { PlainDate } from "../PlainDate.ts";

export const splitUtcDateTime = (date?: Date) => {
  date ??= new Date();
  const plainDate = PlainDate.of({
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  });
  return [plainDate];
};

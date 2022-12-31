import { PlainDate } from "../PlainDate.ts";

export const splitDateTime = (timezone: string) => (date?: Date) => {
  date ??= new Date();
  // TODO: use formatToParts() to extract parts in one go
  const options = { timeZone: timezone };
  const plainDate = PlainDate.of({
    year: date.toLocaleDateString([], { ...options, year: "numeric" }),
    month: date.toLocaleDateString([], { ...options, month: "numeric" }),
    day: date.toLocaleDateString([], { ...options, day: "numeric" }),
  });
  return [plainDate];
};

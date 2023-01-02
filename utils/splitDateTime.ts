import { PlainDate } from "../PlainDate.ts";

export const splitDateTime = (timezone: string) => (instant?: Date) => {
  instant ??= new Date();
  const options = { timeZone: timezone };
  const plainDate = PlainDate.of({
    year: instant.toLocaleDateString([], { ...options, year: "numeric" }),
    month: instant.toLocaleDateString([], { ...options, month: "numeric" }),
    day: instant.toLocaleDateString([], { ...options, day: "numeric" }),
  });
  return [plainDate];
};

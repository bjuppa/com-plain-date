import { PlainDate } from "../PlainDate.ts";

export const splitDateTime = (timezone: string) => (instant?: Date) => {
  instant ??= new Date();
  const locale = "en";
  const options = { timeZone: timezone };
  const plainDate = PlainDate.of({
    year: instant.toLocaleDateString(locale, { ...options, year: "numeric" }),
    month: instant.toLocaleDateString(locale, { ...options, month: "numeric" }),
    day: instant.toLocaleDateString(locale, { ...options, day: "numeric" }),
  });
  return [plainDate];
};

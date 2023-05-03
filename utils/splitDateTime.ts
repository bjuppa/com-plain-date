import { PlainDate } from "../PlainDate.ts";
import { NativeDateSplitterFn } from "../support/function-signatures.ts";

export const splitDateTime =
  (timezone: string): NativeDateSplitterFn => (instant) => {
    instant ??= new Date();
    const locale = "en";
    const options = { timeZone: timezone, hour12: false };
    const plainDate = PlainDate.of({
      year: instant.toLocaleDateString(locale, { ...options, year: "numeric" }),
      month: instant.toLocaleDateString(locale, {
        ...options,
        month: "numeric",
      }),
      day: instant.toLocaleDateString(locale, { ...options, day: "numeric" }),
    });
    const plainTime = {
      hour: Number(
        instant.toLocaleTimeString(locale, { ...options, hour: "numeric" }),
      ),
      minute: Number(
        instant.toLocaleTimeString(locale, { ...options, minute: "numeric" }),
      ),
      second: Number(
        instant.toLocaleTimeString(locale, { ...options, second: "numeric" }),
      ),
      millisecond: Number(
        instant.toLocaleTimeString(locale, {
          ...options,
          fractionalSecondDigits: 3,
        }),
      ),
    };
    return [plainDate, plainTime];
  };

import { PlainDate } from "../PlainDate.ts";
import { SplitDateTime } from "../support/function-signatures.ts";

/**
 * Get a function curried with a timezone, to split native JS Date objects
 * into separate plain-date and plain-time parts.
 */
export function splitDateTime(timezone: string) {
  return (instant?: Date): SplitDateTime => {
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
}

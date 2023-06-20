import { ComPlainDate, FormatPlainDateOptions } from "../PlainDate.ts";

/**
 * Curry a function to get localized strings of its plain-date arguments.
 *
 * The function is curried in 2 rounds, each setting a property:
 *
 * 1. `Intl` {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument | locale },
 *    defaults to system's locale if not given.
 * 2. `Intl` {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat | format options },
 *    defaults to "short" date-style if no options given.
 *
 * @param locale `Intl` locale
 * @returns A curried function that takes `Intl` format options and returns the final curried function that operates on plain-dates
 *
 * @example
 * ```ts
 * const formatDate = formatPlainDate()(); // Use system's locale and default formatting options
 * const formatMonthAndDay = formatPlainDate("en")({ month: "long", day: "numeric" });
 *
 * formatDate(PlainDate({ year: 2023 })); // "1/1/2023"
 * formatMonthAndDay(PlainDate({ year: 2023 }));  // "January 1"
 * ```
 */
export function formatPlainDate(
  locale: Intl.LocalesArgument = undefined,
): (options?: FormatPlainDateOptions) => (date: ComPlainDate) => string {
  return (options = {}) => (date) => date.toLocaleString(locale, options);
}

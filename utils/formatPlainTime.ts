import { ComPlainTime, FormatPlainTimeOptions } from "../PlainTime.ts";

/**
 * Curry a function to get localized strings of its plain-time arguments.
 *
 * The function is curried in 2 rounds, each setting a property:
 *
 * 1. `Intl` {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument | locale },
 *    defaults to system's locale if not given.
 * 2. `Intl` {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat | format options },
 *    defaults to "medium" time-style if no options given.
 *
 * @param locale `Intl` locale
 * @returns A curried function that takes `Intl` format options and returns the final curried function that operates on plain-times
 *
 * @example
 * ```ts
 * const formatTime = formatPlainTime()(); // Use system's locale and default formatting options
 * const formatHour = formatPlainTime("en")({ hour: "numeric" });
 *
 * formatTime(PlainTime({ hour: 13, minute: 37 })); // "1:37:00 PM"
 * formatHour(PlainTime({ hour: 13, minute: 37 }));  // "1 PM"
 * ```
 */
export function formatPlainTime(
  locale?: Intl.LocalesArgument,
): (options?: FormatPlainTimeOptions) => (time: ComPlainTime) => string {
  return (options = {}) => (time) => time.toLocaleString(locale, options);
}

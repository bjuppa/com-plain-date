import { ComPlainDate, FormatPlainDateOptions } from "../PlainDate.ts";

/**
 * Get a function curried with a locale,
 * to get another function curried with format options,
 * from which to get localized strings of its plain-date arguments.
 *
 * @param locale An `Intl` locale string, will use system's locale if not given
 * @returns A curried function that takes `Intl` format options and returns another curried function that operates on plain-dates
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat | Intl.DateTimeFormat options on MDN}
 */
export function formatPlainDate(locale: Intl.LocalesArgument = undefined) {
  return (options: FormatPlainDateOptions = {}) =>
  (date: ComPlainDate): string => date.toLocaleString(locale, options);
}

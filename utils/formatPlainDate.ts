import { ComPlainDate } from "../PlainDate.ts";

export type FormatPlainDateOptions = Omit<
  Intl.DateTimeFormatOptions,
  "timeZone"
>;

/**
 * Get a function curried with a locale, to get another function curried with format options,
 * from which to get localized strings of its plain-date arguments.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat | Intl.DateTimeFormat options on MDN}
 */
export const formatPlainDate =
  (locale: Intl.LocalesArgument = undefined) =>
  (options: FormatPlainDateOptions = {}) =>
  (date: ComPlainDate) =>
    date.toUtcInstant().toLocaleDateString(locale, {
      ...options,
      timeZone: "UTC",
    });

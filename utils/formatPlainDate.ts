import { ComPlainDate } from "../PlainDate.ts";

export type FormatPlainDateOptions = Omit<
  Intl.DateTimeFormatOptions,
  "timeZone"
>;

/**
 * Get a function curried with a locale, to get another function curried with format options,
 * from which to get localized strings of its plain-date arguments.
 */
export const formatPlainDate =
  (locale: Intl.LocalesArgument = undefined) =>
  (options: FormatPlainDateOptions = {}) =>
  (date: ComPlainDate) =>
    date.toUtcInstant().toLocaleDateString(locale, {
      ...options,
      timeZone: "UTC",
    });

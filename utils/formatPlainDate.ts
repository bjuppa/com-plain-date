import { ComPlainDate } from "../PlainDate.ts";

export type FormatPlainDateOptions = Omit<
  Intl.DateTimeFormatOptions,
  "timeZone"
>;

export const formatPlainDate =
  (locale: Intl.LocalesArgument = undefined) =>
  (options: FormatPlainDateOptions = {}) =>
  (date: ComPlainDate) =>
    date.toUtcInstant().toLocaleDateString(locale, {
      ...options,
      timeZone: "UTC",
    });

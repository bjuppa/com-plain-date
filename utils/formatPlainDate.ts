import { PlainDateContract } from "../PlainDate.ts";

export type FormatPlainDateOptions = Omit<
  Intl.DateTimeFormatOptions,
  "timeZone"
>;

export const formatPlainDate =
  (locale: Intl.LocalesArgument = undefined) =>
  (options: FormatPlainDateOptions = {}) =>
  (dateTime: PlainDateContract) => {
    return dateTime.toUtcInstant().toLocaleDateString(locale, {
      ...options,
      timeZone: "UTC",
    });
  };

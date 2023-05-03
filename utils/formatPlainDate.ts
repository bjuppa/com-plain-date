import { PlainDateContract } from "../PlainDate.ts";

export type FormatPlainDateOptions = Omit<
  Intl.DateTimeFormatOptions,
  "timeZone"
>;

export const formatPlainDate =
  (locale: Intl.LocalesArgument = undefined) =>
  (options: FormatPlainDateOptions = {}) =>
  (plainDate: PlainDateContract) => {
    return plainDate.toUtcInstant().toLocaleDateString(locale, {
      ...options,
      timeZone: "UTC",
    });
  };

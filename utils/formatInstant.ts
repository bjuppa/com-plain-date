export type FormatInstantOptions = Omit<Intl.DateTimeFormatOptions, "timeZone">;

/**
 * Curry a function to get localized strings of its JS `Date` arguments.
 *
 * The function is curried in 3 rounds, each setting a property:
 *
 * 1. `Intl` {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument | locale },
 *    defaults to system's locale if not given.
 * 2. `Intl` {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat | format options },
 *    defaults to include a "short" timezone-style unless `timeZoneName` is explicitly `undefined`.
 * 3. A named IANA timezone, defaults to system's timezone if not given.
 *
 * @param locale `Intl` locale,
 * @returns A curried function that takes `Intl` format options and returns another curried function that takes a timezone and returns the final curried function that operates on JS `Date` objects
 *
 * @throws {RangeError} Invalid timezone specified
 *
 * @example
 * ```ts
 * const formatDateTime = formatInstant()()("Europe/Stockholm"); // Use system's locale and default formatting options
 * const format24hDateTime = formatInstant("en")({ hourCycle: "h23" })("Europe/Stockholm");
 *
 * formatDateTime(new Date()); // "6/11/2023, 4:54:32 PM GMT+2"
 * format24hDateTime(new Date());  // "6/11/2023, 16:54:32 GMT+2"
 * ```
 */
export function formatInstant(locale?: Intl.LocalesArgument): (
  options?: FormatInstantOptions,
) => (timezone?: string) => (instant: Date) => string {
  return (options = { timeZoneName: "short" }) => (timezone) => (instant) =>
    instant.toLocaleString(locale, {
      timeZoneName: "short",
      ...options,
      timeZone: timezone,
    });
}

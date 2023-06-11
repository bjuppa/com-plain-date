/**
 * Get a function curried with a locale,
 * to get another function curried with format options,
 * to get another function curried with a timezone
 * from which to get localized strings of its JS `Date` arguments.
 *
 * @param locale An `Intl` locale string, will use system's locale if not given
 * @returns A curried function that takes `Intl` format options and returns another curried function that takes a timezone and returns another curried function that operates on JS `Date` objects
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat | Intl.DateTimeFormat options on MDN}
 */
export function formatInstant(locale: Intl.LocalesArgument = undefined) {
  return (options: Omit<
    Intl.DateTimeFormatOptions,
    "timeZone"
  > = { timeZoneName: "short" }) =>
  (timezone: string) =>
  (instant: Date): string =>
    instant.toLocaleString(locale, {
      ...options,
      timeZone: timezone,
    });
}

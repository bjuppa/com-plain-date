/**
 * Curry a function to get localized strings of its JS `Date` arguments.
 *
 * The function is curried in 3 rounds, each setting a property:
 *
 * 1. `Intl` {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument | locale },
 *    defaults to system's locale if not given.
 * 2. `Intl` {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat | format options },
 *    defaults to include a "short" timezone-style if no options given.
 * 3. A named IANA timezone.
 *
 * @param locale `Intl` locale,
 * @returns A curried function that takes `Intl` format options and returns another curried function that takes a timezone and returns the final curried function that operates on JS `Date` objects
 *
 * @example
 * ```ts
 * const formatInstantDefault = formatInstant()()("Europe/Stockholm"); // Use system's locale and default formatting options
 * const formatInstant24h = formatInstant("en")({ hourCycle: "h23" })("Europe/Stockholm");
 *
 * formatInstantDefault(new Date()); // "6/11/2023, 4:54:32 PM GMT+2"
 * formatInstant24h(new Date());  // "6/11/2023, 16:54:32"
 * ```
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

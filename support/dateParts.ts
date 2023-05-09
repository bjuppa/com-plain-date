/**
 * Extract year, month & day from an ISO 8601 string representation of a date.
 *
 * `yyyy-mm-dd` & `yyyy-mm` are the most common formats, but others are handled too.
 *
 * - Handles negative years
 * - Ignores any time or timezone information in the given string
 *
 * @param isoDateString A string containing an ISO 8601 date
 * @returns An object containing year, month & day properties extracted from the string
 * @returns `null` if no date was found in the string
 */
export function dateParts(isoDateString: string) {
  const matches = String(isoDateString).match(
    /(?<year>[+-]?\d+)-(?<month>\d+)(-(?<day>\d+))?/,
  );

  return matches &&
    {
      year: Number(matches.groups?.year),
      month: Number(matches.groups?.month),
      day: matches.groups?.day ? Number(matches.groups?.day) : undefined,
    };
}

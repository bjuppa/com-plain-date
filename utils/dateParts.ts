// TODO: Consider moving dateParts util to support
/**
 * Extract year, month & day from an ISO 8601 string representation of a date.
 *
 * @remarks
 *
 * YYYY-MM-DD & YYYY-MM are the most common formats, but others are handled too.
 *
 * - Handles negative years
 * - Ignores any time or timezone information
 * - Returns null when no match was found
 */
export const dateParts = (s: string) => {
  const matches = String(s).match(
    /(?<year>[+-]?\d+)-(?<month>\d+)(-(?<day>\d+))?/,
  );

  return matches &&
    {
      year: Number(matches.groups?.year),
      month: Number(matches.groups?.month),
      day: matches.groups?.day ? Number(matches.groups?.day) : undefined,
    };
};

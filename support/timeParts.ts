/**
 * Extract hour, minute, second & millisecond from an ISO 8601 string representation of a time.
 *
 * `hh:mm:ss.sss` and `Thhmmss.sss` are the full formats.
 * Shorter strings are handled down to `hh:mm` and `Thh`.
 *
 * - Ignores any date or timezone information in the given string
 *
 * @param isoTimeString A string containing an ISO 8601 time
 * @returns An object containing hour, minute, second & millisecond properties extracted from the string
 * @returns `null` if no time was found in the string
 */
export function timeParts(
  isoTimeString: string,
): {
  hour: number;
  minute: number;
  second?: number;
  millisecond?: number;
} | null {
  const matches = String(isoTimeString).match(
    /(?<hour>\d+):(?<minute>\d+)(:(?<second>\d+)(.(?<millisecond>\d{1,3}))?)?/,
  ) || String(isoTimeString).match(
    /T(?<hour>\d\d)(?<minute>\d\d)?((?<second>\d\d)(.(?<millisecond>\d{1,3}))?)?/,
  );

  return matches &&
    {
      hour: Number(matches.groups?.hour),
      minute: Number(matches.groups?.minute || 0),
      second: matches.groups?.second
        ? Number(matches.groups?.second)
        : undefined,
      millisecond: matches.groups?.millisecond
        ? Number(matches.groups?.millisecond)
        : undefined,
    };
}

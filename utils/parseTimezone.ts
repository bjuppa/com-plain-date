import { sanitizeTimezone } from "./sanitizeTimezone.ts";
import { isTimezone } from "./isTimezone.ts";

/**
 * Extract a valid timezone name from a string.
 *
 * @throws {TypeError} No valid timezone found in string
 *
 * @see {@link https://en.wikipedia.org/wiki/Tz_database#Names_of_time_zones | Timezone name format on Wikipedia}
 */
export function parseTimezone(timezoneString: string): string {
  const matches = timezoneString.matchAll(
    /**
     * Use **lookahead** to find a strict string of letters,
     * followed by one or two sections starting with slash (or backslash) and
     * containing only letters, dashes, underscore or space.
     * Finally consume the initial string of letters to keep going for the next
     * match after the slash.
     */
    /(?=(?<tz>[A-Za-z]+(?:\s*[/\\][-_\sA-Za-z]+){1,2}))[A-Za-z]+/g,
  );
  for (const match of matches) {
    let candidate = "";
    for (const word of match.groups?.tz?.split(" ") || []) {
      candidate += ` ${word}`;
      const sane = sanitizeTimezone(candidate);
      if (isTimezone(sane)) {
        return sane;
      }
    }
  }

  if (
    timezoneString.match(/UTC(?!\s*[+-]\d*[1-9])/) ||
    timezoneString.match(/\dZ$/)
  ) {
    return "UTC";
  }

  throw new TypeError(
    `No valid timezone found in string: ${timezoneString}`,
  );
}

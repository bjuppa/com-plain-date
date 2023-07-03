import { localTimezone } from "./localTimezone.ts";
import { parseTimezone } from "./parseTimezone.ts";

/**
 * Get a valid timezone name, adapted for the current user.
 *
 * Falls back to the timezone of the local system if no valid timezone was found
 * in the given string.
 *
 * This is useful for sanitizing the current user's timezone preference into a
 * guaranteed valid timezone before applying any operations taking that timezone
 * as parameter. This avoids `RangeError` being thrown should the timezone be
 * invalid.
 *
 * @category Timezones
 */
export function safeTimezone(preferredTimezone: string): string {
  try {
    return parseTimezone(preferredTimezone);
  } catch (_e) {
    return localTimezone();
  }
}

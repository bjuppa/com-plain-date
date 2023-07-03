import { localTimezone } from "./localTimezone.ts";
import { parseTimezone } from "./parseTimezone.ts";

/**
 * Get a valid timezone name, adapted for the current user.
 *
 * Falls back to the timezone of the local system if no valid timezone was found
 * in the given string.
 *
 * This is useful for sanitizing the current user's timezone preference before
 * applying operations that takes a timezone parameter, and thus throws
 * exceptions for invalid timezones.
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

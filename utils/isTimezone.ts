/**
 * Check if a string is a valid timezone in the system.
 *
 * @category Timezones
 */
export function isTimezone(timezone: string): boolean {
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timezone });
    return true;
  } catch (_e) {
    return false;
  }
}

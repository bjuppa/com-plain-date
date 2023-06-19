/**
 * Clean up a timezone string, removing some common user typos and converting
 * whitespace to underscore.
 */
export function sanitizeTimezone(timezoneString: string): string {
  const tz = timezoneString
    .trim() // Remove any spaces from both ends
    .replaceAll("\\", "/") // Replace any backslash with forward slash
    .replaceAll(/\s*\/+\s*/g, "/") // Condense multiple slashes and remove any spaces around them
    .replaceAll(/\s+/g, "_"); // Replace any spaces with a single underscore

  try {
    return Intl.DateTimeFormat(undefined, { timeZone: tz }).resolvedOptions()
      .timeZone;
  } catch (_e) {
    return tz;
  }
}

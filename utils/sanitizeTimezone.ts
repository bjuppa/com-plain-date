/**
 * Clean up a timezone string, removing any excess whitespace and converting
 * whitespace to underscore.
 */
export function sanitizeTimezone(timezoneString: string): string {
  return timezoneString
    .trim() // Remove any spaces from both ends
    .replaceAll("\\", "/") // Replace any backslash with forward slash
    .replaceAll(/\s*\/\s*/g, "/") // Remove any spaces around slash
    .replaceAll(/\s+/g, "_"); // Replace any spaces with single underscore
}

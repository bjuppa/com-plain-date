/**
 * Clean up a timezone string, removing some common user typos and converting
 * whitespace to underscore.
 */
export function sanitizeTimezone(timezoneString: string): string {
  return timezoneString
    .trim() // Remove any spaces from both ends
    .replaceAll("-", " ") // Replace any dash with space
    .replaceAll("\\", "/") // Replace any backslash with forward slash
    .replaceAll(/\s*\/+\s*/g, "/") // Condense multiple slashes and remove any spaces around them
    .replaceAll(/\s+/g, "_"); // Replace any spaces with a single underscore
}

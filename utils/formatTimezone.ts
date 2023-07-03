/**
 * Format a timezone for display to a user.
 *
 * @category Timezones
 */
export function formatTimezone(timezone: string): string {
  return timezone.replaceAll("_", " ");
}

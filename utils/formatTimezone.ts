/**
 * Format a timezone for display to a user.
 */
export function formatTimezone(timezone: string): string {
  return timezone.replaceAll("_", " ");
}

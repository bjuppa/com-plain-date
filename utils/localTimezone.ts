/**
 * Get the name of the system timezone, and fallback to `"UTC"` if the system
 * doesn't expose a timezone.
 *
 * This is useful for setting the initial value of an HTML input where the user
 * enters their timezone.
 *
 * @category Timezones
 */
export function localTimezone(): string {
  return Intl.DateTimeFormat()?.resolvedOptions()?.timeZone || "UTC";
}

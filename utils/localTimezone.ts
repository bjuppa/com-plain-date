/**
 * Get the name of the system timezone, and fallback to `"UTC"` if the system
 * doesn't expose a named timezone.
 *
 * This is useful for setting the initial value of an HTML input where the user
 * enters their timezone, or in a UI where the user has no option of selecting a
 * preferred timezone.
 *
 * @category Timezones
 */
export function localTimezone(): string {
  const tz = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
  return tz?.includes("/") ? tz : "UTC";
}

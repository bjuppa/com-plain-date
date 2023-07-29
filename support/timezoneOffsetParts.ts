/**
 * Extract timezone offset as a time-duration of hours & minutes from
 * an ISO 8601 string representation of a date.
 */
export function timezoneOffsetParts(
  s: string,
): { hours: number; minutes: number } | null {
  if (["UTC", "GMT"].includes(s) || String(s).endsWith("Z")) {
    return { hours: 0, minutes: 0 };
  }

  const matches = String(s).match(
    /(?<sign>[-+])?(?<hours>\d{1,2}):?(?<minutes>\d{2})?(?=\D*$)/,
  );

  const multiplier = (matches?.groups?.sign && matches.groups.sign != "+")
    ? -1
    : 1;

  return matches &&
    {
      hours: multiplier * Number(matches.groups?.hours || 0),
      minutes: multiplier * Number(matches.groups?.minutes || 0),
    };
}

export const timezoneOffsetParts = (s: string) => {
  if (["UTC", "GMT"].includes(s) || String(s).endsWith("Z")) {
    return { hour: 0, minute: 0 };
  }

  const matches = String(s).match(
    /(?<sign>[-+])?(?<hour>\d{1,2}):?(?<minute>\d{2})?(?=\D*$)/,
  );

  const multiplier = (matches?.groups?.sign && matches.groups.sign != "+")
    ? -1
    : 1;

  return matches &&
    {
      hour: Number(matches.groups?.hour || 0) * multiplier,
      minute: Number(matches.groups?.minute || 0),
    };
};

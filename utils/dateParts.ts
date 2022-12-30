export const dateParts = (s: string) => {
  const matches = String(s).match(
    /(?<year>[+-]?\d+)-(?<month>\d+)(-(?<day>\d+))?/,
  );

  return matches &&
    {
      year: Number(matches.groups?.year),
      month: Number(matches.groups?.month),
      day: matches.groups?.day ? Number(matches.groups?.day) : undefined,
    };
};

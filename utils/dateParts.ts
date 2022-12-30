export const dateParts = (s: string) => {
  const matches = s.match(/(?<year>[+-]?\d+)-(?<month>\d+)(-(?<day>\d+))?/);

  return matches &&
    {
      year: Number(matches.groups?.year),
      month: matches.groups?.month ? Number(matches.groups?.month) : undefined,
      day: matches.groups?.day ? Number(matches.groups?.day) : undefined,
    };
};

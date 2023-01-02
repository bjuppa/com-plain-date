type PartsRecord = Partial<Record<Intl.DateTimeFormatPartTypes, string>>;

export const intlParts = (idtf: Intl.DateTimeFormat) => (instant: Date) => {
  return idtf.formatToParts(instant).reduce<PartsRecord>((acc, part) => {
    acc[part.type] = part.value;
    return acc;
  }, {});
};

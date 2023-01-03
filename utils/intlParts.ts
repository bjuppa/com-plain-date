type PartsRecord = Partial<Record<Intl.DateTimeFormatPartTypes, string>>;

export const intlParts =
  (intlDateTimeFormat: Intl.DateTimeFormat) => (instant: Date) => {
    return intlDateTimeFormat.formatToParts(instant).reduce<PartsRecord>(
      (acc, part) => {
        acc[part.type] = part.value;
        return acc;
      },
      {},
    );
  };

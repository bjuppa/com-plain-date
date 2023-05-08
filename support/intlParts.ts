type PartsRecord = Partial<Record<Intl.DateTimeFormatPartTypes, string>>;

/**
 * Get a function curried with an Intl DateTimeFormat, to extract an object of
 * parts keyed by type from its native JS Date arguments.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
 */
export const intlParts =
  (intlDateTimeFormat: Intl.DateTimeFormat) => (instant: Date): PartsRecord => {
    return intlDateTimeFormat.formatToParts(instant).reduce<PartsRecord>(
      (acc, part) => {
        acc[part.type] = part.value;
        return acc;
      },
      {},
    );
  };

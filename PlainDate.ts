type SloppyPlainDate = {
  year: number | string;
  month?: number | string;
  day?: number | string;
};

export const PlainDate = (
  { year: initialYear, month: initialMonth = 1, day: initialDay = 1 }:
    SloppyPlainDate,
) => {
  const utcDate = new Date(Date.UTC(
    Number(initialYear),
    Number(initialMonth) - 1,
    Number(initialDay),
  ));

  // TODO: throw if utcDate is invalid

  const year = utcDate.getUTCFullYear();
  const month = utcDate.getUTCMonth() + 1;
  const day = utcDate.getUTCDate();

  const plainDate = {
    get year() {
      return year;
    },
    get month() {
      return month;
    },
    get day() {
      return day;
    },
  };

  for (const property in plainDate) {
    Object.defineProperty(plainDate, property, { enumerable: true });
  }

  return plainDate;
};

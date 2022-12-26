type SloppyPlainDate = {
  year: number | string;
  month?: number | string;
  day?: number | string;
};

export const PlainDate = (
  { year: initialYear = NaN, month: initialMonth = 1, day: initialDay = 1 }:
    SloppyPlainDate,
) => {
  const utcDate = new Date(Date.UTC(
    Number(initialYear),
    Number(initialMonth) - 1,
    Number(initialDay),
  ));

  if (isNaN(utcDate.valueOf())) {
    throw new TypeError(
      `Input is not a valid date ${
        JSON.stringify({
          year: initialYear,
          month: initialMonth,
          day: initialDay,
        })
      }`,
    );
  }

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

  return plainDate;
};

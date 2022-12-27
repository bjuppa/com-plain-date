const ENUMERABLE_PROPERTIES = ["year", "month", "day"];

type SloppyPlainDate = {
  year: number | string;
  month?: number | string;
  day?: number | string;
};

export interface PlainDateContract {
  year: number;
  month: number;
  day: number;

  map: (f: (x: PlainDateContract) => SloppyPlainDate) => PlainDateContract;
}

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

  const plainDate: PlainDateContract = {
    get year() {
      return year;
    },
    get month() {
      return month;
    },
    get day() {
      return day;
    },
    map(f) {
      return PlainDate.of(f(this));
    },
  };

  // TODO: should we let all properties be enumerable, so that spread works to build new object from a PlainDate?
  for (const p in plainDate) {
    Object.defineProperty(plainDate, p, {
      enumerable: ENUMERABLE_PROPERTIES.includes(p),
    });
  }
  Object.freeze(plainDate);

  return plainDate;
};

// Type lift (unit)
PlainDate.of = PlainDate;

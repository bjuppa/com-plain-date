const ENUMERABLE_PROPERTIES = ["year", "month", "day"];

interface SloppyPlainDate {
  year: number | string;
  month?: number | string;
  day?: number | string;
}

export interface PlainDateContract {
  year: number;
  month: number;
  day: number;

  iso: string;
  valueOf: () => string;
  toString: () => string;
  toJSON: () => string;

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

  const plainDate: PlainDateContract = {
    year: utcDate.getUTCFullYear(),
    month: utcDate.getUTCMonth() + 1,
    day: utcDate.getUTCDate(),

    iso: utcDate.toISOString().split("T")[0],
    valueOf() {
      return this.iso;
    },
    toString() {
      return this.iso;
    },
    toJSON() {
      return this.iso;
    },

    map(f) {
      return PlainDate.of(f(this));
    },
  };

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

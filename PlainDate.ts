import { SloppyPlainDate, SloppyPlainTime } from "./support/sloppy-types.ts";
import { addDays } from "./utils/addDays.ts";
import { createUtcInstant } from "./utils/createUtcInstant.ts";
import { createLocalTimezoneInstant } from "./utils/createLocalTimezoneInstant.ts";
import { dateParts } from "./utils/dateParts.ts";

const ENUMERABLE_PROPERTIES = new Set(["year", "month", "day"]);

export interface PlainDateContract {
  /** Year may be negative and up to 6 digits */
  year: number;
  /** Month (1-12) */
  month: number;
  /** Day in month (1-31) */
  day: number;

  iso: string;
  valueOf: () => string;
  toString: () => string;
  toJSON: () => string;

  toUtcInstant: (time?: SloppyPlainTime) => Date;
  toLocalTimezoneInstant: (time?: SloppyPlainTime) => Date;
  //TODO: toInstant: (timezone: string, time?: SloppyPlainTime) => Date;

  map: (f: (x: PlainDateContract) => SloppyPlainDate) => PlainDateContract;

  addDays: (days: number) => PlainDateContract;
}

export const PlainDate = (
  { year = NaN, month = 1, day = 1 }: SloppyPlainDate,
) => {
  const utcDate = createUtcInstant({ year, month, day });
  if (isNaN(utcDate.valueOf())) {
    throw new TypeError(
      `Input is not a valid date: ${JSON.stringify({ year, month, day })}`,
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

    toUtcInstant(time) {
      return createUtcInstant({ ...this, ...time });
    },
    toLocalTimezoneInstant(time) {
      return createLocalTimezoneInstant({ ...this, ...time });
    },

    map(f) {
      return PlainDate.of(f(this));
    },

    addDays(days) {
      return addDays(days)(this);
    },
  };

  for (const p in plainDate) {
    Object.defineProperty(plainDate, p, {
      enumerable: ENUMERABLE_PROPERTIES.has(p),
    });
  }
  Object.freeze(plainDate);

  return plainDate;
};

// Type lift (unit)
PlainDate.of = PlainDate;

PlainDate.fromString = (s: string) => {
  const parts = dateParts(s);
  if (!parts) {
    throw TypeError(`No date parts found in string: ${s}`);
  }
  return PlainDate.of(parts);
};

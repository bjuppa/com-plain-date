import { SloppyPlainDate, SloppyPlainTime } from "./support/sloppy-types.ts";
import { createUtcInstant } from "./utils/createUtcInstant.ts";
import { createLocalInstant } from "./utils/createLocalInstant.ts";
import { createInstant } from "./utils/createInstant.ts";
import { dateParts } from "./utils/dateParts.ts";
import { addDays } from "./utils/addDays.ts";
import { addMonths } from "./utils/addMonths.ts";
import { addYears } from "./utils/addYears.ts";

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
  toLocalInstant: (time?: SloppyPlainTime) => Date;
  toInstant: (timezone: string, time?: SloppyPlainTime) => Date;

  map: (f: (x: PlainDateContract) => SloppyPlainDate) => PlainDateContract;

  addDays: (days: number) => PlainDateContract;
  addMonths: (months: number) => PlainDateContract;
  addYears: (years: number) => PlainDateContract;
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

    toUtcInstant(time = { hour: 0, minute: 0, second: 0, millisecond: 0 }) {
      return createUtcInstant({ ...this, ...time });
    },
    toLocalInstant(
      time = { hour: 0, minute: 0, second: 0, millisecond: 0 },
    ) {
      return createLocalInstant({ ...this, ...time });
    },
    toInstant(
      timezone,
      time = { hour: 0, minute: 0, second: 0, millisecond: 0 },
    ) {
      return createInstant(timezone)({ ...this, ...time });
    },

    map(f) {
      return PlainDate.of(f(this));
    },

    addDays(days = 0) {
      return addDays(days)(this);
    },
    addMonths(months = 0) {
      return addMonths(months)(this);
    },
    addYears(years = 0) {
      return addYears(years)(this);
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

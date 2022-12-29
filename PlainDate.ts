import { addDays } from "./utils/addDays.ts";
import { createUtcDate, SloppyPlainDate } from "./utils/createUtcDate.ts";

const ENUMERABLE_PROPERTIES = ["year", "month", "day"];

export interface PlainDateContract {
  year: number;
  month: number;
  day: number;

  iso: string;
  valueOf: () => string;
  toString: () => string;
  toJSON: () => string;

  map: (f: (x: PlainDateContract) => SloppyPlainDate) => PlainDateContract;

  addDays: (days: number) => PlainDateContract;
}

export const PlainDate = (parts: SloppyPlainDate) => {
  const utcDate = createUtcDate(parts);
  if (isNaN(utcDate.valueOf())) {
    throw new TypeError(`Input is not a valid date ${JSON.stringify(parts)}`);
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

    addDays(days) {
      return addDays(days)(this);
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

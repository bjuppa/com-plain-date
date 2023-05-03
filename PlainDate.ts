import { SloppyPlainDate, SloppyPlainTime } from "./support/sloppy-types.ts";
import { createUtcInstant } from "./utils/createUtcInstant.ts";
import { dateParts } from "./utils/dateParts.ts";
import {
  formatPlainDate,
  FormatPlainDateOptions,
} from "./utils/formatPlainDate.ts";

/** A basic plain-date object with minimal properties */
export interface PlainDateContract {
  /** Year may be negative and up to 6 digits */
  year: number;
  /** Month (1-12) */
  month: number;
  /** Day in month (1-31) */
  day: number;

  /** YYYY-MM-DD (ISO 8601) */
  iso: string;
  /** YYYY-MM-DD (ISO 8601) */
  valueOf: () => PlainDateContract["iso"];
  /** YYYY-MM-DD (ISO 8601) */
  toString: () => PlainDateContract["iso"];
  /** YYYY-MM-DD (ISO 8601) */
  toJSON: () => PlainDateContract["iso"];

  toLocaleString: (
    locale?: Intl.LocalesArgument,
    options?: FormatPlainDateOptions,
  ) => string;

  toUtcInstant: (time?: SloppyPlainTime) => Date;
  constructor: (x: SloppyPlainDate) => this;
  map: <T extends PlainDateContract>(
    this: T,
    f: (x: T) => SloppyPlainDate,
  ) => T;
}

/** Factory that creates plain-date objects */
export interface PlainDateFactory<T extends PlainDateContract> {
  (x: SloppyPlainDate): T;
  /** Type lift (unit) */
  of: PlainDateFactory<T>;
  /** Create a new plain-date object from an ISO string */
  fromString: <T extends PlainDateContract>(
    this: PlainDateFactory<T>,
    s: string,
  ) => T;
}

export const PlainDate: PlainDateFactory<PlainDateContract> = (
  { year = NaN, month = 1, day = 1 },
) => {
  const utcDate = createUtcInstant({ year, month, day });
  if (isNaN(utcDate.valueOf())) {
    throw new TypeError(
      `Input is not a valid date: ${JSON.stringify({ year, month, day })}`,
    );
  }

  const plainDate: PlainDateContract = {
    constructor: PlainDate,

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

    toLocaleString(locale = undefined, options = {}) {
      return formatPlainDate(locale)(options)(this);
    },

    toUtcInstant({ hour = 0, minute = 0, second = 0, millisecond = 0 } = {}) {
      return (hour || minute || second || millisecond)
        ? createUtcInstant({ ...this, hour, minute, second, millisecond })
        : utcDate;
    },
    map(f) {
      return this.constructor(f(this));
    },
  };

  Object.freeze(plainDate);

  return plainDate;
};

PlainDate.of = PlainDate;

PlainDate.fromString = function (s) {
  const parts = dateParts(s);
  if (!parts) {
    throw TypeError(`No date parts found in string: ${s}`);
  }
  return this.of(parts);
};

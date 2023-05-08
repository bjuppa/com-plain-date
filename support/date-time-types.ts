import { ComPlainDate } from "../PlainDate.ts";

/** Describes a date where parts can be numbers or strings. */
export type SloppyDate = {
  year: number | string;
  month?: number | string;
  day?: number | string;
};

/** Describes a time where parts can be numbers or strings. */
export type SloppyTime = {
  hour?: number | string;
  minute?: number | string;
  second?: number | string;
  millisecond?: number | string;
};

/** Describes a date-time where parts can be numbers or strings. */
export type SloppyDateTime = SloppyDate & SloppyTime;

/** Describes a tuple of separate plain-date and plain-time objects. */
export type SplitDateTime = [
  ComPlainDate,
  {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
  },
];

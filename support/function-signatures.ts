import { ComPlainDate } from "../PlainDate.ts";

/** Describes a function taking a plain-date object and returning the same. */
export type PlainDateMapFn = <T extends ComPlainDate>(date: T) => T;

/** Describes a function taking a native JS Date object and returning the same. */
export type NativeDateMapFn = (instant: Date) => Date;

// TODO: move SplitDateTime out of function-signatures
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

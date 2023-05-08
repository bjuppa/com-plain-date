import { ComPlainDate } from "../PlainDate.ts";
import { SloppyDateTime } from "./sloppy-types.ts";

// TODO: remove the types for predicate-, number- and higher order functions, they actually makes the docs less readable!

/** Describes a function taking a plain-date object and returning the same. */
export type PlainDateMapFn = <T extends ComPlainDate>(date: T) => T;

/** Describes a higher order function for calculating a difference between two objects. */
export type HODifferenceFn<T> = (from: T) => (to: T) => number;

/** Describes a higher order function for calculating a difference between two plain-date objects. */
export type HOPlainDatesDifferenceFn = HODifferenceFn<ComPlainDate>;

/** Describes a function taking a native JS Date object and returning the same. */
export type NativeDateMapFn = (instant: Date) => Date;

/** Describes a function taking a sloppy date-time object and returning a JS Date object. */
export type NativeDateFactory = (dateTime: SloppyDateTime) => Date;

/** Describes a function splitting a native JS Date object into a tuple of plain-date and plain-time objects. */
export type NativeDateSplitterFn = (instant?: Date) => [
  ComPlainDate,
  {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
  },
];

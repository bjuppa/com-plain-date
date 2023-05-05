import { ComPlainDate } from "../PlainDate.ts";
import { SloppyDate, SloppyDateTime, SloppyTime } from "./sloppy-types.ts";

// TODO: remove the types for predicate-, number- and higher order functions, they actually makes the docs less readable!

/** Describes a function taking a plain-date and returning a boolean. */
export type PlainDatePredicateFn = (date: ComPlainDate) => boolean;

/** Describes a function taking a sloppy date and returning a boolean. */
export type SloppyDatePredicateFn = (date: SloppyDate) => boolean;

/** Describes a function taking a plain-date and returning a number. */
export type PlainDateNumberFn = (date: ComPlainDate) => number;

/** Describes a function taking a sloppy date and returning a number. */
export type SloppyDateNumberFn = (date: SloppyDate) => number;

/** Describes a function taking a sloppy time and returning a number. */
export type SloppyTimeNumberFn = (time: SloppyTime) => number;

/** Describes a function taking a plain-date object and returning the same. */
export type PlainDateMapFn = <T extends ComPlainDate>(date: T) => T;

/** Describes a higher order function taking a number and returning a plain-date map function. */
export type HOTimeUnitPlainDateMapFn = (count: number) => PlainDateMapFn;

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

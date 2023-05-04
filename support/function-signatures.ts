import { ComPlainDate } from "../PlainDate.ts";
import {
  SloppyPlainDate,
  SloppyPlainDateTime,
  SloppyPlainTime,
} from "./sloppy-types.ts";

/** Describes a function taking a plain-date and returning a boolean */
export type PlainDatePredicateFn = (plainDate: ComPlainDate) => boolean;

/** Describes a function taking a sloppy plain-date and returning a boolean */
export type SloppyPlainDatePredicateFn = (
  plainDate: SloppyPlainDate,
) => boolean;

/** Describes a function taking a plain-date and returning a number */
export type PlainDateNumberFn = (plainDate: ComPlainDate) => number;

/** Describes a function taking a sloppy plain-date and returning a number */
export type SloppyPlainDateNumberFn = (plainDate: SloppyPlainDate) => number;

/** Describes a function taking a sloppy plain-time and returning a number */
export type SloppyPlainTimeNumberFn = (plainTime: SloppyPlainTime) => number;

/** Describes a function taking a plain-date object and returning the same */
export type PlainDateMapFn = <T extends ComPlainDate>(plainDate: T) => T;

/** Describes a higher order function taking a number and returning a plain-date map function */
export type HOTimeUnitPlainDateMapFn = (count: number) => PlainDateMapFn;

/** Describes a higher order function for calculating a difference between two objects */
export type HODifferenceFn<T> = (from: T) => (to: T) => number;

/** Describes a higher order function for calculating a difference between two plain-date objects */
export type HOPlainDatesDifferenceFn = HODifferenceFn<ComPlainDate>;

/** Describes a function taking a JS Date object and returning the same */
export type NativeDateMapFn = (instant: Date) => Date;

/** Describes a function taking a sloppy date-time object and returning a JS Date object */
export type NativeDateFactory = (dateTime: SloppyPlainDateTime) => Date;

/** Describes a function splitting a JS Date object into a tuple of plain-date and plain-time objects */
export type NativeDateSplitterFn = (instant?: Date) => [
  ComPlainDate,
  {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
  },
];

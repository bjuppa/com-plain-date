import { ComPlainDate } from "../PlainDate.ts";
import {
  SloppyPlainDate,
  SloppyPlainDateTime,
  SloppyPlainTime,
} from "./sloppy-types.ts";

/** Function taking a plain-date and returning a boolean */
export type PlainDatePredicateFn = (plainDate: ComPlainDate) => boolean;

/** Function taking a sloppy plain-date and returning a boolean */
export type SloppyPlainDatePredicateFn = (
  plainDate: SloppyPlainDate,
) => boolean;

/** Function taking a plain-date and returning a number */
export type PlainDateNumberFn = (plainDate: ComPlainDate) => number;

/** Function taking a sloppy plain-date and returning a number */
export type SloppyPlainDateNumberFn = (plainDate: SloppyPlainDate) => number;

/** Function taking a sloppy plain time and returning a number */
export type SloppyPlainTimeNumberFn = (plainTime: SloppyPlainTime) => number;

/** Function taking a plain-date object and returning the same */
export type PlainDateMapFn = <T extends ComPlainDate>(plainDate: T) => T;

/** Higher order function taking a number and returning a plain-date map function */
export type HOTimeUnitPlainDateMapFn = (count: number) => PlainDateMapFn;

/** Higher order function for calculating a difference between two objects */
export type HODifferenceFn<T> = (from: T) => (to: T) => number;

/** Higher order function for calculating a difference between two plain-date objects */
export type HOPlainDatesDifferenceFn = HODifferenceFn<ComPlainDate>;

/** Function taking a JS Date object and returning the same */
export type NativeDateMapFn = (instant: Date) => Date;

/** Function taking a sloppy date-time object and returning a JS Date object */
export type NativeDateFactory = (dateTime: SloppyPlainDateTime) => Date;

/** Function splitting a JS Date object into a tuple of plain-date and plain time objects */
export type NativeDateSplitterFn = (instant?: Date) => [
  ComPlainDate,
  {
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
  },
];

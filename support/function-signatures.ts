import { ComPlainDate } from "../PlainDate.ts";

/** Describes a function taking a plain-date object and returning the same. */
export type PlainDateMapFn = <T extends ComPlainDate>(date: T) => T;

import { ComPlainDate } from "../PlainDate.ts";
import { ComPlainTime } from "../PlainTime.ts";

/** Describes a tuple of separate plain-date and plain-time objects. */
export type SplitDateTime = [
  ComPlainDate,
  ComPlainTime,
];

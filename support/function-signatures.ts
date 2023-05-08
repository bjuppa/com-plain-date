import { ComPlainDate } from "../PlainDate.ts";

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

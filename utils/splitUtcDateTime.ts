import { PlainDate } from "../PlainDate.ts";
import { NativeDateSplitterFn } from "../support/function-signatures.ts";

/**
 * Split native JS Date objects into separate plain-date and plain-time parts in UTC.
 */
export const splitUtcDateTime: NativeDateSplitterFn = (date) => {
  date ??= new Date();
  const plainDate = PlainDate.of({
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  });
  const plainTime = {
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
    millisecond: date.getUTCMilliseconds(),
  };
  return [plainDate, plainTime];
};

import { PlainDate } from "../PlainDate.ts";
import { NativeDateSplitterFn } from "../support/function-signatures.ts";

/**
 * Split native JS Date objects into separate plain-date and plain-time parts in the system's local timezone.
 */
export const splitLocalDateTime: NativeDateSplitterFn = (date) => {
  date ??= new Date();
  const plainDate = PlainDate.of({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  });
  const plainTime = {
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds(),
    millisecond: date.getMilliseconds(),
  };
  return [plainDate, plainTime];
};

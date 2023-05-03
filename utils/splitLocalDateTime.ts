import { PlainDate } from "../PlainDate.ts";
import { NativeDateSplitterFn } from "../support/function-signatures.ts";

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

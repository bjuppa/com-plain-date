import { PlainDate, PlainDateContract } from "../PlainDate.ts";

export const splitUtcDateTime = (date?: Date): [
  PlainDateContract,
  { hour: number; minute: number; second: number; millisecond: number },
] => {
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

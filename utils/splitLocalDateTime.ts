import { PlainDate, PlainDateContract } from "../PlainDate.ts";

export const splitLocalDateTime = (date?: Date): [
  PlainDateContract,
  { hour: number; minute: number; second: number; millisecond: number },
] => {
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

import { createUtcInstant } from "./createUtcInstant.ts";

export const isLeapYear = (year: number | string) =>
  createUtcInstant({ year, month: 2, day: 29 }).getUTCDate() === 29;

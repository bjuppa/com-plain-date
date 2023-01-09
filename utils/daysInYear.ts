import { isLeapYear } from "./isLeapYear.ts";

export const daysInYear = (year: number | string) =>
  isLeapYear(year) ? 366 : 365;

import { isLeapYear } from "./isLeapYear.ts";
import { DAYS_IN_COMMON_YEAR, DAYS_IN_LEAP_YEAR } from "../constants.ts";

export const daysInYear = (year: number | string) =>
  isLeapYear(year) ? DAYS_IN_LEAP_YEAR : DAYS_IN_COMMON_YEAR;

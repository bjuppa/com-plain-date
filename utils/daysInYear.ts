import { isLeapYear } from "./isLeapYear.ts";
import { DAYS_IN_COMMON_YEAR, DAYS_IN_LEAP_YEAR } from "../constants.ts";
import { SloppyPlainDate } from "../support/sloppy-types.ts";

export const daysInYear = ({ year }: SloppyPlainDate) =>
  isLeapYear({ year }) ? DAYS_IN_LEAP_YEAR : DAYS_IN_COMMON_YEAR;

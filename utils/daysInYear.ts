import { isLeapYear } from "./isLeapYear.ts";
import { DAYS_IN_COMMON_YEAR, DAYS_IN_LEAP_YEAR } from "../constants.ts";
import { SloppyPlainDateNumberFn } from "../support/function-signatures.ts";

export const daysInYear: SloppyPlainDateNumberFn = ({ year }) =>
  isLeapYear({ year }) ? DAYS_IN_LEAP_YEAR : DAYS_IN_COMMON_YEAR;

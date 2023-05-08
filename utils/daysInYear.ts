import { isLeapYear } from "./isLeapYear.ts";
import { DAYS_IN_COMMON_YEAR, DAYS_IN_LEAP_YEAR } from "../constants.ts";
import { SloppyDate } from "../support/sloppy-types.ts";

/**
 * Get the number of days in a given year.
 *
 * @remarks
 *
 * Leap years have 366 days, otherwise 365.
 */
export const daysInYear = ({ year }: SloppyDate): number =>
  isLeapYear({ year }) ? DAYS_IN_LEAP_YEAR : DAYS_IN_COMMON_YEAR;

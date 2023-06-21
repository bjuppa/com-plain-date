import { isLeapYear } from "./isLeapYear.ts";
import { DAYS_IN_COMMON_YEAR, DAYS_IN_LEAP_YEAR } from "../constants.ts";
import { SloppyDate } from "../support/date-time-types.ts";

/**
 * Get the number of days in a given year.
 *
 * Leap years have 366 days, otherwise 365.
 *
 * @param date Object of year
 */
export function daysInYear(date: SloppyDate): number {
  return isLeapYear(date) ? DAYS_IN_LEAP_YEAR : DAYS_IN_COMMON_YEAR;
}

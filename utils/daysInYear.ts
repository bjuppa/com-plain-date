import { isLeapYear } from "./isLeapYear.ts";
import { DAYS_IN_COMMON_YEAR, DAYS_IN_LEAP_YEAR } from "../constants.ts";

/**
 * Get the number of days in the year of a given date.
 *
 * Leap years have 366 days, otherwise 365.
 */
export function daysInYear({ year }: { year: number | string }): number {
  return isLeapYear({ year }) ? DAYS_IN_LEAP_YEAR : DAYS_IN_COMMON_YEAR;
}

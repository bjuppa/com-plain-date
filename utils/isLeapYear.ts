import { createUtcInstant } from "./createUtcInstant.ts";

/**
 * Check if a date is in a leap year.
 */
export function isLeapYear({ year }: { year: number | string }): boolean {
  return createUtcInstant({ year, month: 2, day: 29 }).getUTCDate() === 29;
}

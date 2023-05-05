import { createUtcInstant } from "./createUtcInstant.ts";
import { SloppyDatePredicateFn } from "../support/function-signatures.ts";

/**
 * Check if a sloppy date is in a leap year.
 */
export const isLeapYear: SloppyDatePredicateFn = ({ year }) =>
  createUtcInstant({ year, month: 2, day: 29 }).getUTCDate() === 29;

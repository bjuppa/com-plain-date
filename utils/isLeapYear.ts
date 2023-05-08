import { SloppyDate } from "../support/sloppy-types.ts";
import { createUtcInstant } from "./createUtcInstant.ts";

/**
 * Check if a sloppy date is in a leap year.
 */
export const isLeapYear = ({ year }: SloppyDate) =>
  createUtcInstant({ year, month: 2, day: 29 }).getUTCDate() === 29;

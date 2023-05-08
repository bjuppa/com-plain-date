import { SloppyDate } from "../support/sloppy-types.ts";

/**
 * Check if a date is the first day of its year.
 */
export function isFirstDayOfYear({ month, day }: Partial<SloppyDate>): boolean {
  return Number(month) === 1 && Number(day) === 1;
}

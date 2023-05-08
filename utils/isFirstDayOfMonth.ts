import { SloppyDate } from "../support/sloppy-types.ts";

/**
 * Check if a date is the first day of its month.
 */
export function isFirstDayOfMonth({ day }: SloppyDate): boolean {
  return Number(day) === 1;
}

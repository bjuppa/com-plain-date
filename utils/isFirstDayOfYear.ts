import { SloppyDate } from "../support/sloppy-types.ts";

/**
 * Check if a date is the first day of its year.
 */
export const isFirstDayOfYear = (
  { month, day }: Partial<SloppyDate>,
): boolean => Number(month) === 1 && Number(day) === 1;

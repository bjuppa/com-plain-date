import { SloppyDate } from "../support/sloppy-types.ts";

/**
 * Check if a date is the first day of its month.
 */
export const isFirstDayOfMonth = ({ day }: SloppyDate): boolean =>
  Number(day) === 1;

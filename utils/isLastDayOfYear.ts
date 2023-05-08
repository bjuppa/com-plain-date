import { SloppyDate } from "../support/sloppy-types.ts";

/**
 * Check if a date is the last day of its year.
 */
export const isLastDayOfYear = ({ month, day }: Partial<SloppyDate>): boolean =>
  Number(month) === 12 && Number(day) === 31;

import { SloppyDate } from "../support/date-time-types.ts";

/**
 * Check if a date is the last day of its year.
 */
export function isLastDayOfYear({ month, day }: Partial<SloppyDate>): boolean {
  return Number(month) === 12 && Number(day) === 31;
}

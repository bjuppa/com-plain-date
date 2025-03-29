import type { ComPlainDate } from "../PlainDate.ts";
import type { QuarterNumber } from "../constants.ts";

/**
 * Get the quarter of the year for a plain-date.
 */
export function quarter(date: ComPlainDate): QuarterNumber {
  return Math.ceil(date.month / 3) as QuarterNumber;
}

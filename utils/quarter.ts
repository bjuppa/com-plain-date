import { ComPlainDate } from "../PlainDate.ts";
import { QuarterNumber } from "../constants.ts";

/**
 * Get the quarter of the year for a plain-date.
 */
export const quarter = (date: ComPlainDate) =>
  Math.ceil(date.month / 3) as QuarterNumber;

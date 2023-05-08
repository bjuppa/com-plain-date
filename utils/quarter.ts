import { ComPlainDate } from "../PlainDate.ts";
import { Quarter } from "../constants.ts";

/**
 * Get the quarter of the year for a plain-date.
 */
export const quarter = (date: ComPlainDate): Quarter =>
  Math.ceil(date.month / 3) as Quarter;

import { ComPlainDate } from "../PlainDate.ts";
import { differenceInDays } from "./differenceInDays.ts";
import { startOfYear } from "./startOfYear.ts";

/**
 * Get the day of the year for a plain-date.
 *
 * @see {@link https://en.wikipedia.org/wiki/Ordinal_date | ordinal date on Wikipedia}
 */
export function ordinal(date: ComPlainDate): number {
  return differenceInDays(startOfYear(date))(date) + 1;
}

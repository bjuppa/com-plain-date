import { ComPlainDate } from "../PlainDate.ts";

/**
 * Get a function curried with a number of years to add to its plain-date arguments.
 */
export function addYears(years = 0) {
  return <T extends ComPlainDate>(date: T): T =>
    date.map((x) => ({ ...x, year: x.year + years }));
}

import { ComPlainDate, PlainDate } from "../PlainDate.ts";
import { dateParts } from "../support/dateParts.ts";

/**
 * Create a new plain-date object from an ISO date string.
 */
export function parsePlainDate(isoDateString: string): ComPlainDate {
  const parts = dateParts(isoDateString);
  if (!parts) {
    throw TypeError(`No date parts found in string: ${isoDateString}`);
  }
  return PlainDate(parts);
}

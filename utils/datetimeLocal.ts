import { SloppyDateTime } from "../support/date-time-types.ts";
import { createUtcInstant } from "./createUtcInstant.ts";

/**
 * Format a string suitable for HTML datetime-local inputs from a date-time object.
 *
 * @param dateTime Object of year, month, day, hour, minute, second & millisecond
 * @returns A string in format `yyyy-mm-ddThh:mm`
 *
 * @throws {RangeError} Year must be after year 0
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local | HTML input datetime-local on MDN}
 */
export function datetimeLocal(dateTime: SloppyDateTime): string {
  if (Number(dateTime.year) < 1) {
    throw new RangeError(
      `Years before 0001 can't be represented by HTML datetime-local: ${dateTime.year}`,
    );
  }
  const utcRepresentation = createUtcInstant(dateTime);
  return utcRepresentation.toISOString().replace("+", "").slice(0, -8);
}

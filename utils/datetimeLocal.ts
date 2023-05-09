import { SloppyDateTime } from "../support/date-time-types.ts";
import { createUtcInstant } from "./createUtcInstant.ts";

/**
 * Format a string suitable for HTML datetime-local inputs from a date-time object.
 *
 * YYYY-MM-DDTHH:MM
 *
 * @throws {TypeError} Year must be after year 0.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local | HTML input datetime-local on MDN}
 */
export function datetimeLocal({
  year = NaN,
  month = 1,
  day = 1,
  hour = 0,
  minute = 0,
}: SloppyDateTime): string {
  if (Number(year) < 1) {
    throw new TypeError(
      `Years before 0001 can't be represented by HTML datetime-local: ${year}`,
    );
  }
  const utcRepresentation = createUtcInstant({
    year,
    month,
    day,
    hour,
    minute,
  });
  return utcRepresentation.toISOString().replace("+", "").slice(0, -8);
}

import { createUtcInstant } from "./createUtcInstant.ts";

/**
 * Format a string suitable for HTML datetime-local inputs from a date-time object.
 *
 * @returns A string in format `yyyy-mm-ddThh:mm`
 *
 * @throws {RangeError} Year must be after year 0
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local | HTML input datetime-local on MDN}
 */
export function formatDatetimeLocal({
  year,
  month = 1,
  day = 1,
  hour = 0,
  minute = 0,
}: {
  year: number | string;
  month?: number | string;
  day?: number | string;
  hour?: number | string;
  minute?: number | string;
}): string {
  if (Number(year) < 1) {
    throw new RangeError(
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

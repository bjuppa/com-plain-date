import { SloppyDateTime } from "../support/sloppy-types.ts";
import { createUtcInstant } from "./createUtcInstant.ts";

/**
 * Format a date-time as a string suitable for HTML datetime-local inputs:
 * YYYY-MM-DDTHH:MM
 *
 * @function
 */
export const datetimeLocal = (
  {
    year = NaN,
    month = 1,
    day = 1,
    hour = 0,
    minute = 0,
  }: SloppyDateTime,
): string => {
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
};

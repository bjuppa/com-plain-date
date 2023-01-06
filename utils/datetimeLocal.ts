import { SloppyPlainDateTime } from "../support/sloppy-types.ts";
import { createUtcInstant } from "./createUtcInstant.ts";

/**
 * Format suitable for HTML datetime-local input:
 * YYYY-MM-DDTHH:MM
 */
export const datetimeLocal = (
  {
    year = NaN,
    month = 1,
    day = 1,
    hour = 0,
    minute = 0,
  }: SloppyPlainDateTime,
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

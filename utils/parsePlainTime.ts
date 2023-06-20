import { ComPlainTime, PlainTime } from "../PlainTime.ts";
import { timeParts } from "../support/timeParts.ts";

/**
 * Create a new plain-time object from an ISO time string.
 *
 * @throws {RangeError} No time parts found in string
 */
export function parsePlainTime(isoTimeString: string): ComPlainTime {
  const parts = timeParts(isoTimeString);
  if (!parts) {
    throw new RangeError(`No time parts found in string: ${isoTimeString}`);
  }
  return PlainTime(parts);
}

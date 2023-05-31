import { ComPlainTime, PlainTime } from "../PlainTime.ts";
import { timeParts } from "../support/timeParts.ts";

/**
 * Create a new plain-time object from an ISO time string.
 */
export function parsePlainTime(isoTimeString: string): ComPlainTime {
  const parts = timeParts(isoTimeString);
  if (!parts) {
    throw TypeError(`No time parts found in string: ${isoTimeString}`);
  }
  return PlainTime(parts);
}

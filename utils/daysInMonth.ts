import { PlainDate } from "../PlainDate.ts";
import { SloppyDateNumberFn } from "../support/function-signatures.ts";

/**
 * Get the number of days in a month for a given year.
 *
 * @remarks
 *
 * February has 29 days in a leap year, otherwise 28.
 */
export const daysInMonth: SloppyDateNumberFn = ({ year, month }) =>
  32 - PlainDate({ year, month, day: 32 }).day;

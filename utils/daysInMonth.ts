import { PlainDate } from "../PlainDate.ts";
import { SloppyDateNumberFn } from "../support/function-signatures.ts";

export const daysInMonth: SloppyDateNumberFn = ({ year, month }) =>
  32 - PlainDate({ year, month, day: 32 }).day;

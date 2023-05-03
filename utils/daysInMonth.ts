import { PlainDate } from "../PlainDate.ts";
import { SloppyPlainDateNumberFn } from "../support/function-signatures.ts";

export const daysInMonth: SloppyPlainDateNumberFn = ({ year, month }) =>
  32 - PlainDate({ year, month, day: 32 }).day;

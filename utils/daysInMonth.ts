import { PlainDate } from "../PlainDate.ts";
import { SloppyPlainDate } from "../support/sloppy-types.ts";

export const daysInMonth = ({ year, month }: SloppyPlainDate) =>
  32 - PlainDate({ year, month, day: 32 }).day;

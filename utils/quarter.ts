import { ComPlainDate } from "../PlainDate.ts";
import { QuarterNumber } from "../constants.ts";

export const quarter = (date: ComPlainDate) =>
  Math.ceil(date.month / 3) as QuarterNumber;

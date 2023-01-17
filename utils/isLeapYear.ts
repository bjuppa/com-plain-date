import { createUtcInstant } from "./createUtcInstant.ts";
import { SloppyPlainDate } from "../support/sloppy-types.ts";

export const isLeapYear = ({ year }: SloppyPlainDate) =>
  createUtcInstant({ year, month: 2, day: 29 }).getUTCDate() === 29;

import { createUtcInstant } from "./createUtcInstant.ts";
import { SloppyPlainDatePredicateFn } from "../support/function-signatures.ts";

export const isLeapYear: SloppyPlainDatePredicateFn = ({ year }) =>
  createUtcInstant({ year, month: 2, day: 29 }).getUTCDate() === 29;

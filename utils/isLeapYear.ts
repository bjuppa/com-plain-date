import { createUtcInstant } from "./createUtcInstant.ts";
import { SloppyDatePredicateFn } from "../support/function-signatures.ts";

export const isLeapYear: SloppyDatePredicateFn = ({ year }) =>
  createUtcInstant({ year, month: 2, day: 29 }).getUTCDate() === 29;

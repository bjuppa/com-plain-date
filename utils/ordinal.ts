import { PlainDateNumberFn } from "../support/function-signatures.ts";
import { differenceInDays } from "./differenceInDays.ts";
import { startOfYear } from "./startOfYear.ts";

export const ordinal: PlainDateNumberFn = (date) =>
  differenceInDays(startOfYear(date))(date) + 1;

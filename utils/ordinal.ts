import { PlainDateNumberFn } from "../support/function-signatures.ts";
import { differenceInDays } from "./differenceInDays.ts";
import { startOfYear } from "./startOfYear.ts";

export const ordinal: PlainDateNumberFn = (plainDate) =>
  differenceInDays(startOfYear(plainDate))(plainDate) + 1;

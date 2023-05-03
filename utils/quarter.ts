import { PlainDateNumberFn } from "../support/function-signatures.ts";

export const quarter: PlainDateNumberFn = (plainDate) =>
  Math.ceil(plainDate.month / 3);

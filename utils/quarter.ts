import { PlainDateNumberFn } from "../support/function-signatures.ts";

export const quarter: PlainDateNumberFn = (date) => Math.ceil(date.month / 3);

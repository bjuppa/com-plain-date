import { HOTimeUnitPlainDateMapFn } from "../support/function-signatures.ts";

export const addYears: HOTimeUnitPlainDateMapFn = (years = 0) => (plainDate) =>
  plainDate.map((x) => ({ ...x, year: x.year + years }));

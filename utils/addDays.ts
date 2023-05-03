import { HOTimeUnitPlainDateMapFn } from "../support/function-signatures.ts";

export const addDays: HOTimeUnitPlainDateMapFn = (days = 0) => (plainDate) =>
  plainDate.map((x) => ({ ...x, day: x.day + days }));

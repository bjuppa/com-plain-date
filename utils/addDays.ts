import { HOTimeUnitPlainDateMapFn } from "../support/function-signatures.ts";

export const addDays: HOTimeUnitPlainDateMapFn = (days = 0) => (date) =>
  date.map((x) => ({ ...x, day: x.day + days }));

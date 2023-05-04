import { PlainDateMapFn } from "../support/function-signatures.ts";

export const startOfYear: PlainDateMapFn = (date) =>
  date.map((x) => ({
    year: x.year,
    month: 1,
    day: 1,
  }));
